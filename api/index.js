import { http } from '@/utils/http'

const BIZ_PREFIX = '/api/xiaolvxingqiu'
const bizUrl = (path) => `${BIZ_PREFIX}${path}`

export const getGardenInfo = () => http({ url: bizUrl('/garden') })
export const updateGardenInfo = (data) => http({ url: bizUrl('/garden'), method: 'PUT', data })
export const createGarden = (data) => http({ url: bizUrl('/gardens'), method: 'POST', data })
export const listGardens = () => http({ url: bizUrl('/gardens') })

export const getUserProfile = () => http({ url: bizUrl('/profile') })
export const updateUserProfile = (data) => http({ url: bizUrl('/profile'), method: 'PUT', data })
export const authWechatPhone = (data) => http({ url: bizUrl('/auth/wechat/phone'), method: 'POST', data })

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

export const submitFeedbackApi = (data) => http({ url: bizUrl('/feedback'), method: 'POST', data })
export const listFeedbackApi = () => http({ url: bizUrl('/feedback') })
