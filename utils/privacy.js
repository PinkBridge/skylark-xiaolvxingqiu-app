export const USER_PRIVACY_ACCEPTED_KEY = 'userPrivacyAccepted'

export const hasUserPrivacyAccepted = () => !!uni.getStorageSync(USER_PRIVACY_ACCEPTED_KEY)

export const setUserPrivacyAccepted = (accepted = true) => {
	uni.setStorageSync(USER_PRIVACY_ACCEPTED_KEY, !!accepted)
}

export const openUserAgreement = () => {
	uni.navigateTo({
		url: '/pages/mime/user-agreement',
		fail: () => {
			uni.showToast({
				title: '打开用户协议失败',
				icon: 'none'
			})
		}
	})
}

export const openPrivacyPolicy = () => {
	uni.navigateTo({
		url: '/pages/mime/privacy-policy',
		fail: () => {
			uni.showToast({
				title: '打开隐私政策失败',
				icon: 'none'
			})
		}
	})
}

let prompting = false

export const ensureUserPrivacyConsent = ({ onAgreed, onRejected, required = true } = {}) => {
	if (hasUserPrivacyAccepted()) {
		if (typeof onAgreed === 'function') onAgreed()
		return
	}
	if (prompting) return
	prompting = true
	uni.showModal({
		title: '用户服务协议与隐私政策',
		content: '请你阅读并同意《用户服务协议》和《隐私政策》后继续使用小绿星球。',
		confirmText: '同意',
		cancelText: '不同意',
		success: (res) => {
			prompting = false
			if (res?.confirm) {
				setUserPrivacyAccepted(true)
				if (typeof onAgreed === 'function') onAgreed()
				return
			}
			if (typeof onRejected === 'function') onRejected()
			if (required) {
				setTimeout(() => {
					ensureUserPrivacyConsent({ onAgreed, onRejected, required: true })
				}, 150)
			}
		},
		fail: () => {
			prompting = false
			if (typeof onRejected === 'function') onRejected()
			if (required) {
				setTimeout(() => {
					ensureUserPrivacyConsent({ onAgreed, onRejected, required: true })
				}, 150)
			}
		}
	})
}
