export const WX_AUTH_DONE_KEY = 'wxAuthDone'
export const WX_USER_PROFILE_CACHE_KEY = 'wxUserProfileCache'

export const isWechatMiniProgram = () => {
	// #ifdef MP-WEIXIN
	return true
	// #endif
	// #ifndef MP-WEIXIN
	return false
	// #endif
}

export const readCachedWxProfile = () => {
	const data = uni.getStorageSync(WX_USER_PROFILE_CACHE_KEY)
	if (!data || typeof data !== 'object') return null
	return data
}

export const hasPhoneAuth = () => {
	return !!uni.getStorageSync(WX_AUTH_DONE_KEY)
}

export const saveWxAuthProfile = (profile) => {
	const cached = readCachedWxProfile() || {}
	const normalizedPhone = `${profile?.phone ?? cached?.phone ?? ''}`.trim()
	const payload = {
		avatar: profile?.avatar ?? cached?.avatar ?? '',
		name: profile?.name ?? cached?.name ?? '',
		gender: profile?.gender ?? cached?.gender ?? 'unknown',
		phone: normalizedPhone,
		updatedAt: Date.now()
	}
	uni.setStorageSync(WX_USER_PROFILE_CACHE_KEY, payload)
	uni.setStorageSync(WX_AUTH_DONE_KEY, profile?.authDone === true || !!payload.phone)
}
