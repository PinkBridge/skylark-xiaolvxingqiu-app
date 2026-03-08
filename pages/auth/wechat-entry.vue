<template>
	<view class="auth-page">
		<view class="auth-card">
			<text class="auth-title">微信授权</text>
			<text class="auth-desc">首次使用请完成微信信息与手机号授权后继续。</text>

			<view class="auth-row">
				<text class="auth-label">头像昵称</text>
				<text class="auth-status">{{ hasProfile ? '已授权' : '未授权' }}</text>
			</view>
			<view class="auth-row">
				<text class="auth-label">手机号</text>
				<text class="auth-status">{{ hasPhone ? '已授权' : '未授权' }}</text>
			</view>

			<button
				class="auth-btn"
				open-type="getPhoneNumber"
				@getphonenumber="onAuthorizePhone"
				:disabled="submitting"
			>
				{{ submitting ? '授权中...' : '授权手机号并进入' }}
			</button>
		</view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { authWechatPhone } from '@/api'
import { saveWxAuthProfile } from '@/utils/auth'

const WX_AUTH_NEXT_ACTION_KEY = 'wxAuthNextAction'
const submitting = ref(false)
const nextAction = ref('')
const profile = ref({
	avatar: '',
	name: '',
	gender: 'unknown',
	phone: ''
})

const hasProfile = computed(() => !!profile.value.name)
const hasPhone = computed(() => !!profile.value.phone)

const normalizeGender = (value) => {
	if (value === 1 || value === '1') return 'male'
	if (value === 2 || value === '2') return 'female'
	return 'unknown'
}

const ensureUserProfile = () => new Promise((resolve, reject) => {
	if (profile.value.name) {
		resolve()
		return
	}
	uni.getUserProfile({
		desc: '用于展示头像和昵称',
		success: (res) => {
			const info = res?.userInfo || {}
			profile.value.avatar = info.avatarUrl || profile.value.avatar
			profile.value.name = info.nickName || profile.value.name
			profile.value.gender = normalizeGender(info.gender)
			resolve()
		},
		fail: () => {
			reject(new Error('请先授权头像昵称'))
		}
	})
})

const onAuthorizePhone = (event) => {
	if (submitting.value) return
	const detail = event?.detail || {}
	if (detail.errMsg && detail.errMsg.indexOf(':ok') === -1) {
		uni.showToast({
			title: '需要手机号授权才能继续',
			icon: 'none'
		})
		return
	}
	submitting.value = true
	ensureUserProfile()
		.then(() => {
			uni.login({
				provider: 'weixin',
				success: (loginRes) => {
					authWechatPhone({
						code: loginRes?.code || '',
						encryptedData: detail.encryptedData || '',
						iv: detail.iv || '',
						avatar: profile.value.avatar || '',
						name: profile.value.name || '',
						gender: profile.value.gender || 'unknown'
					})
						.then((data) => {
							profile.value.phone = data?.phone || ''
							saveWxAuthProfile({
								...profile.value,
								phone: data?.phone || ''
							})
							if (nextAction.value === 'mine') {
								uni.redirectTo({
									url: '/pages/mime/mime',
									fail: () => {
										uni.reLaunch({
											url: '/pages/mime/mime'
										})
									}
								})
								return
							}
							if (nextAction.value === 'recognize') {
								uni.setStorageSync(WX_AUTH_NEXT_ACTION_KEY, 'recognize')
							}
							uni.reLaunch({
								url: '/pages/index/index'
							})
						})
						.catch((err) => {
							uni.showToast({
								title: err?.message || '手机号授权失败',
								icon: 'none'
							})
						})
						.finally(() => {
							submitting.value = false
						})
				},
				fail: () => {
					submitting.value = false
					uni.showToast({
						title: '微信登录失败',
						icon: 'none'
					})
				}
			})
		})
		.catch((err) => {
			submitting.value = false
			uni.showToast({
				title: err?.message || '请先完成头像授权',
				icon: 'none'
			})
		})
}

onLoad((query) => {
	nextAction.value = `${query?.next || ''}`.trim().toLowerCase()
})
</script>

<style scoped lang="scss">
	.auth-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24rpx;
		background: #f6fcf8;
	}

	.auth-card {
		width: 100%;
		background: #ffffff;
		border-radius: 18rpx;
		padding: 28rpx 24rpx;
		border: 1px solid #e7f3eb;
	}

	.auth-title {
		display: block;
		font-size: 34rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.auth-desc {
		display: block;
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #6f8376;
	}

	.auth-row {
		margin-top: 14rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		color: #3d4a43;
	}

	.auth-status {
		color: #33c26d;
	}

	.auth-btn {
		margin-top: 18rpx;
		border-radius: 999rpx;
		background: #33c26d;
		color: #ffffff;
		font-size: 28rpx;
		line-height: 76rpx;
		height: 76rpx;
	}

</style>
