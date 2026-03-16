let BASE_URL = 'http://localhost:8080'
// #ifdef MP-WEIXIN
BASE_URL = 'https://tasia-unreputed-veda.ngrok-free.dev'
// #endif

// Optional runtime override for local debugging or CI.
const customBaseUrl = `${uni.getStorageSync('customBaseUrl') || ''}`.trim()
if (customBaseUrl) {
  BASE_URL = customBaseUrl
}
const USER_ID_STORAGE_KEY = 'currentUserId'
let resolvingUserIdPromise = null

const normalizePayload = (raw) => {
  if (raw && typeof raw === 'object') return raw
  if (typeof raw === 'string') {
    if (raw.indexOf('ERR_NGROK_6024') >= 0 || raw.indexOf('<!DOCTYPE html>') >= 0) {
      return { code: -1, message: '当前 ngrok 地址返回了告警页，请稍后重试或更换可直连域名' }
    }
    try {
      return JSON.parse(raw)
    } catch (e) {
      return {}
    }
  }
  return {}
}

const readCachedUserId = () => {
  const raw = `${uni.getStorageSync(USER_ID_STORAGE_KEY) || ''}`.trim()
  return raw || ''
}

const saveUserId = (userId) => {
  const normalized = `${userId || ''}`.trim()
  if (!normalized) return
  uni.setStorageSync(USER_ID_STORAGE_KEY, normalized)
}

const shouldAddNgrokSkipHeader = () => BASE_URL.indexOf('ngrok-free.dev') >= 0

const buildHeaders = ({ header = {}, userId = '' } = {}) => {
  const mergedHeader = {
    'Content-Type': 'application/json',
    ...header
  }
  if (userId) {
    mergedHeader['X-User-Id'] = userId
  }
  if (shouldAddNgrokSkipHeader()) {
    mergedHeader['ngrok-skip-browser-warning'] = 'true'
  }
  return mergedHeader
}

const silentLogin = () => new Promise((resolve, reject) => {
  uni.login({
    provider: 'weixin',
    success: (loginRes) => {
      const code = `${loginRes?.code || ''}`.trim()
      if (!code) {
        reject(new Error('silent login failed: empty code'))
        return
      }
      uni.request({
        url: `${BASE_URL}/api/xiaolvxingqiu/auth/wechat/silent-login`,
        method: 'POST',
        data: { code },
        header: buildHeaders(),
        success: (res) => {
          const payload = normalizePayload(res?.data)
          if (res.statusCode >= 200 && res.statusCode < 300 && payload.code === 0 && payload.data?.userId) {
            const userId = `${payload.data.userId}`.trim()
            saveUserId(userId)
            resolve(userId)
            return
          }
          reject(new Error(payload.message || `silent login failed: ${res.statusCode}`))
        },
        fail: (err) => {
          reject(new Error(err?.errMsg || 'silent login network error'))
        }
      })
    },
    fail: () => {
      reject(new Error('wechat login failed'))
    }
  })
})

const ensureUserId = ({ url } = {}) => {
  const cachedUserId = readCachedUserId()
  if (cachedUserId) return Promise.resolve(cachedUserId)

  // Prevent recursion: silent-login endpoint itself must not trigger ensure again.
  if (url && url.indexOf('/auth/wechat/silent-login') >= 0) return Promise.resolve('')

  // #ifdef MP-WEIXIN
  if (!resolvingUserIdPromise) {
    resolvingUserIdPromise = silentLogin().finally(() => {
      resolvingUserIdPromise = null
    })
  }
  return resolvingUserIdPromise
  // #endif

  // #ifndef MP-WEIXIN
  return Promise.resolve('')
  // #endif
}

export const getHttpBaseUrl = () => BASE_URL

export const getCurrentUserId = () => readCachedUserId()

export const ensureCurrentUserId = () =>
  ensureUserId({ url: '' }).then((userId) => userId || readCachedUserId())

export const http = ({ url, method = 'GET', data, header = {} }) => {
  return ensureUserId({ url }).then((userId) => new Promise((resolve, reject) => {
    const mergedHeader = buildHeaders({ header, userId })
    uni.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: mergedHeader,
      success: (res) => {
        const payload = normalizePayload(res?.data)
        if (res.statusCode >= 200 && res.statusCode < 300 && payload.code === 0) {
          resolve(payload.data)
          return
        }
        reject(new Error(payload.message || `request failed: ${res.statusCode}`))
      },
      fail: (err) => {
        reject(new Error(err?.errMsg || 'network error'))
      }
    })
  }))
}
