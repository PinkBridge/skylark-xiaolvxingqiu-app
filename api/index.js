import { http } from '@/utils/http'

export const getGardenInfo = () => http({ url: '/api/garden' })
export const updateGardenInfo = (data) => http({ url: '/api/garden', method: 'PUT', data })
export const createGarden = (data) => http({ url: '/api/gardens', method: 'POST', data })
export const listGardens = () => http({ url: '/api/gardens' })

export const getUserProfile = () => http({ url: '/api/profile' })
export const updateUserProfile = (data) => http({ url: '/api/profile', method: 'PUT', data })

export const listPlants = (filter, gardenId) => {
  const params = []
  if (filter) params.push(`filter=${encodeURIComponent(filter)}`)
  if (gardenId !== undefined && gardenId !== null && `${gardenId}` !== '') {
    params.push(`gardenId=${encodeURIComponent(gardenId)}`)
  }
  const query = params.length ? `?${params.join('&')}` : ''
  return http({
    url: `/api/plants${query}`
  })
}

export const getPlantById = (id) => http({ url: `/api/plants/${id}` })
export const createPlant = (data) => http({ url: '/api/plants', method: 'POST', data })
export const updatePlant = (id, data) => http({ url: `/api/plants/${id}`, method: 'PUT', data })
export const deletePlant = (id) => http({ url: `/api/plants/${id}`, method: 'DELETE' })
export const setPlantFocus = (id, data) => http({ url: `/api/plants/${id}/focus`, method: 'PUT', data })
export const clearPlantFocus = (id) => http({ url: `/api/plants/${id}/focus`, method: 'DELETE' })

export const listCareTasks = (gardenId) => {
  const query = gardenId !== undefined && gardenId !== null && `${gardenId}` !== ''
    ? `?gardenId=${encodeURIComponent(gardenId)}`
    : ''
  return http({ url: `/api/care/tasks${query}` })
}
export const completeCareTask = (taskId, data) => http({ url: `/api/care/tasks/${taskId}/complete`, method: 'POST', data })
export const listCareActivitiesByDate = (date, gardenId) => {
  const params = [`date=${encodeURIComponent(date)}`]
  if (gardenId !== undefined && gardenId !== null && `${gardenId}` !== '') {
    params.push(`gardenId=${encodeURIComponent(gardenId)}`)
  }
  return http({ url: `/api/care/activities?${params.join('&')}` })
}
export const listCareActivitiesByMonth = (month, gardenId) => {
  const params = [`month=${encodeURIComponent(month)}`]
  if (gardenId !== undefined && gardenId !== null && `${gardenId}` !== '') {
    params.push(`gardenId=${encodeURIComponent(gardenId)}`)
  }
  return http({ url: `/api/care/activities?${params.join('&')}` })
}
export const listPlantGrowthRecords = (plantId, pageNo = 1, pageSize = 10) =>
  http({ url: `/api/care/records?plantId=${encodeURIComponent(plantId)}&pageNo=${encodeURIComponent(pageNo)}&pageSize=${encodeURIComponent(pageSize)}` })
export const listPlantAlbumRecords = (plantId, pageNo = 1, pageSize = 10) =>
  http({ url: `/api/care/albums?plantId=${encodeURIComponent(plantId)}&pageNo=${encodeURIComponent(pageNo)}&pageSize=${encodeURIComponent(pageSize)}` })
export const getPlantCareStats = (plantId) =>
  http({ url: `/api/care/stats?plantId=${encodeURIComponent(plantId)}` })
export const getPlantMonthlyStats = (plantId, months = 6) =>
  http({ url: `/api/care/stats/monthly?plantId=${encodeURIComponent(plantId)}&months=${encodeURIComponent(months)}` })
export const getCarePlanConfig = (plantId) => http({ url: `/api/care/plans/${plantId}` })
export const saveCarePlanConfig = (plantId, data) => http({ url: `/api/care/plans/${plantId}`, method: 'PUT', data })
export const getCoinAccount = () => http({ url: '/api/coin/account' })

export const submitFeedbackApi = (data) => http({ url: '/api/feedback', method: 'POST', data })
export const listFeedbackApi = () => http({ url: '/api/feedback' })
