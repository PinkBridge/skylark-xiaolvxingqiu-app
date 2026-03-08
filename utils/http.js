const BASE_URL = 'http://localhost:8080'

export const http = ({ url, method = 'GET', data, header = {} }) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        ...header
      },
      success: (res) => {
        const payload = res.data || {}
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
  })
}
