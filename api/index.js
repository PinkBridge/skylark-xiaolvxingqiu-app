import { getCurrentUserId, getHttpBaseUrl, http } from '@/utils/http'

const BIZ_PREFIX = '/api/xiaolvxingqiu'
const bizUrl = (path) => `${BIZ_PREFIX}${path}`

export const getGardenInfo = () => http({ url: bizUrl('/garden') })
export const updateGardenInfo = (data) => http({ url: bizUrl('/garden'), method: 'PUT', data })
export const createGarden = (data) => http({ url: bizUrl('/gardens'), method: 'POST', data })
export const listGardens = () => http({ url: bizUrl('/gardens') })

export const getUserProfile = () => http({ url: bizUrl('/profile') })
export const updateUserProfile = (data) => http({ url: bizUrl('/profile'), method: 'PUT', data })
export const authWechatPhone = (data) => http({ url: bizUrl('/auth/wechat/phone'), method: 'POST', data })
export const wechatSilentLogin = (data) => http({ url: bizUrl('/auth/wechat/silent-login'), method: 'POST', data })

export const listPlants = (filter, gardenId) => {
  const params = []
  if (filter) params.push(`filter=${encodeURIComponent(filter)}`)
  if (gardenId !== undefined && gardenId !== null && `${gardenId}` !== '') {
    params.push(`gardenId=${encodeURIComponent(gardenId)}`)
  }
  const query = params.length ? `?${params.join('&')}` : ''
  return http({
    url: bizUrl(`/plants${query}`)
  })
}

export const getPlantById = (id) => http({ url: bizUrl(`/plants/${id}`) })
export const createPlant = (data) => http({ url: bizUrl('/plants'), method: 'POST', data })
export const updatePlant = (id, data) => http({ url: bizUrl(`/plants/${id}`), method: 'PUT', data })
export const deletePlant = (id) => http({ url: bizUrl(`/plants/${id}`), method: 'DELETE' })
export const setPlantFocus = (id, data) => http({ url: bizUrl(`/plants/${id}/focus`), method: 'PUT', data })
export const clearPlantFocus = (id) => http({ url: bizUrl(`/plants/${id}/focus`), method: 'DELETE' })

export const listCareTasks = (gardenId) => {
  const query = gardenId !== undefined && gardenId !== null && `${gardenId}` !== ''
    ? `?gardenId=${encodeURIComponent(gardenId)}`
    : ''
  return http({ url: bizUrl(`/care/tasks${query}`) })
}
export const completeCareTask = (taskId, data) => http({ url: bizUrl(`/care/tasks/${taskId}/complete`), method: 'POST', data })
export const listCareActivitiesByDate = (date, gardenId) => {
  const params = [`date=${encodeURIComponent(date)}`]
  if (gardenId !== undefined && gardenId !== null && `${gardenId}` !== '') {
    params.push(`gardenId=${encodeURIComponent(gardenId)}`)
  }
  return http({ url: bizUrl(`/care/activities?${params.join('&')}`) })
}
export const listCareActivitiesByMonth = (month, gardenId) => {
  const params = [`month=${encodeURIComponent(month)}`]
  if (gardenId !== undefined && gardenId !== null && `${gardenId}` !== '') {
    params.push(`gardenId=${encodeURIComponent(gardenId)}`)
  }
  return http({ url: bizUrl(`/care/activities?${params.join('&')}`) })
}
export const listPlantGrowthRecords = (plantId, pageNo = 1, pageSize = 10) =>
  http({ url: bizUrl(`/care/records?plantId=${encodeURIComponent(plantId)}&pageNo=${encodeURIComponent(pageNo)}&pageSize=${encodeURIComponent(pageSize)}`) })
export const listPlantAlbumRecords = (plantId, pageNo = 1, pageSize = 10) =>
  http({ url: bizUrl(`/care/albums?plantId=${encodeURIComponent(plantId)}&pageNo=${encodeURIComponent(pageNo)}&pageSize=${encodeURIComponent(pageSize)}`) })
export const getPlantCareStats = (plantId) =>
  http({ url: bizUrl(`/care/stats?plantId=${encodeURIComponent(plantId)}`) })
export const getPlantMonthlyStats = (plantId, months = 6) =>
  http({ url: bizUrl(`/care/stats/monthly?plantId=${encodeURIComponent(plantId)}&months=${encodeURIComponent(months)}`) })
export const getCarePlanConfig = (plantId) => http({ url: bizUrl(`/care/plans/${plantId}`) })
export const saveCarePlanConfig = (plantId, data) => http({ url: bizUrl(`/care/plans/${plantId}`), method: 'PUT', data })
export const getCoinAccount = () => http({ url: bizUrl('/coin/account') })
export const getSubscribeSetting = () => http({ url: bizUrl('/notify/subscribe-setting') })
export const saveSubscribeSetting = (data) => http({ url: bizUrl('/notify/subscribe-setting'), method: 'PUT', data })

export const submitFeedbackApi = (data) => http({ url: bizUrl('/feedback'), method: 'POST', data })
export const listFeedbackApi = () => http({ url: bizUrl('/feedback') })
export const createAiCollection = (data) => http({ url: bizUrl('/ai/collections'), method: 'POST', data })
export const listAiCollections = () => http({ url: bizUrl('/ai/collections') })
export const deleteAiCollection = (id) => http({ url: bizUrl(`/ai/collections/${id}`), method: 'DELETE' })
export const addAiCollectionToGarden = (id) => http({ url: bizUrl(`/ai/collections/${id}/add-to-garden`), method: 'POST' })
export const addRecognizedToGarden = (data) => http({ url: bizUrl('/ai/collections/add-to-garden'), method: 'POST', data })

const parseUploadPayload = (raw) => {
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw || '{}')
    } catch (e) {
      return null
    }
  }
  if (raw && typeof raw === 'object') return raw
  return null
}

const isHttpUrl = (value) => /^https?:\/\//i.test(`${value || ''}`.trim())

const isTmpHttpUrl = (value) => {
  const raw = `${value || ''}`.trim().toLowerCase()
  if (!isHttpUrl(raw)) return false
  return raw.indexOf('http://tmp/') === 0 || raw.indexOf('https://tmp/') === 0
}

const shouldSkipUpload = (value) => {
  const raw = `${value || ''}`.trim()
  if (!isHttpUrl(raw)) return false
  // `http://tmp/...` is a local temporary path in some runtimes, must still upload.
  return !isTmpHttpUrl(raw)
}

const readLocalFileSize = (filePath) => new Promise((resolve) => {
  uni.getFileInfo({
    filePath,
    success: (res) => resolve(Number(res?.size || 0)),
    fail: () => resolve(0)
  })
})

const compressLocalImage = (filePath) => new Promise((resolve) => {
  // #ifdef MP-WEIXIN
  uni.compressImage({
    src: filePath,
    quality: 72,
    success: (res) => resolve(`${res?.tempFilePath || filePath}`),
    fail: () => resolve(filePath)
  })
  // #endif

  // #ifndef MP-WEIXIN
  resolve(filePath)
  // #endif
})

export const uploadImageResource = ({ filePath, fileName = 'image.jpg' }) => new Promise((resolve, reject) => {
  const normalizedPath = `${filePath || ''}`.trim()
  if (!normalizedPath) {
    reject(new Error('请选择要上传的图片'))
    return
  }
  if (shouldSkipUpload(normalizedPath)) {
    resolve(normalizedPath)
    return
  }
  readLocalFileSize(normalizedPath)
    .then((rawSize) => {
      const tenMb = 10 * 1024 * 1024
      if (rawSize > tenMb) {
        throw new Error('图片过大，请选择不超过10MB的图片')
      }
      return compressLocalImage(normalizedPath)
    })
    .then((maybeCompressedPath) => {
  const userId = getCurrentUserId()
  const header = userId ? { 'X-User-Id': userId } : {}
  if (getHttpBaseUrl().indexOf('ngrok-free.dev') >= 0) {
    header['ngrok-skip-browser-warning'] = 'true'
  }
  uni.uploadFile({
    url: `${getHttpBaseUrl()}${bizUrl('/file/upload-image')}`,
    filePath: maybeCompressedPath || normalizedPath,
    name: 'file',
    formData: { fileName },
    header,
    success: (res) => {
      const payload = parseUploadPayload(res?.data)
      if (!payload) {
        reject(new Error('图片上传返回解析失败'))
        return
      }
      const url = `${payload?.data?.url || payload?.data?.signedUrl || ''}`.trim()
      if (res.statusCode >= 200 && res.statusCode < 300 && payload.code === 0 && url) {
        resolve(url)
        return
      }
      reject(new Error(payload.message || `上传失败: ${res.statusCode}`))
    },
    fail: (err) => {
      reject(new Error(err?.errMsg || '上传图片失败'))
    }
  })
    })
    .catch((err) => {
      reject(err instanceof Error ? err : new Error('上传图片失败'))
    })
})

export const recognizePlantByImage = ({ filePath, fileName = 'plant.jpg' }) => new Promise((resolve, reject) => {
  const normalizedPath = `${filePath || ''}`.trim()
  if (!normalizedPath) {
    reject(new Error('请选择要识别的图片'))
    return
  }
  const userId = getCurrentUserId()
  const header = userId ? { 'X-User-Id': userId } : {}
  if (getHttpBaseUrl().indexOf('ngrok-free.dev') >= 0) {
    header['ngrok-skip-browser-warning'] = 'true'
  }
  uni.uploadFile({
    url: `${getHttpBaseUrl()}${bizUrl('/ai/plant/recognize')}`,
    filePath: normalizedPath,
    name: 'file',
    formData: {
      fileName
    },
    header,
    success: (res) => {
      let payload = {}
      if (typeof res?.data === 'string') {
        try {
          payload = JSON.parse(res.data || '{}')
        } catch (e) {
          reject(new Error('识别服务返回解析失败'))
          return
        }
      } else if (res?.data && typeof res.data === 'object') {
        payload = res.data
      }
      if (res.statusCode >= 200 && res.statusCode < 300 && payload.code === 0) {
        resolve(payload.data)
        return
      }
      reject(new Error(payload.message || `识别失败: ${res.statusCode}`))
    },
    fail: (err) => {
      reject(new Error(err?.errMsg || '上传图片失败'))
    }
  })
})
