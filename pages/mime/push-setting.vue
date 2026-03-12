<template>
	<view class="push-setting-page">
		<up-card :showHead="false" :showFoot="false" :border="false" margin="0">
			<template #body>
				<view class="setting-row">
					<view class="setting-text">
						<text class="setting-title">微信小程序推送</text>
						<text class="setting-desc">默认关闭，开启后按设定时间提醒</text>
					</view>
					<up-switch
						v-model="pushEnabled"
						size="20"
						activeColor="#33c26d"
						@change="onPushEnableChange"
					></up-switch>
				</view>

				<view class="setting-row setting-row-time" :class="{ 'is-disabled': !pushEnabled }" @tap="openTimePicker">
					<view class="setting-text">
						<text class="setting-title">每天推送时间</text>
						<text class="setting-desc">建议设置在固定空闲时段</text>
					</view>
					<view class="time-value-wrap">
						<text class="time-value">{{ pushTime }}</text>
						<up-icon name="arrow-right" size="14" color="#7bc59a"></up-icon>
					</view>
				</view>
			</template>
		</up-card>

		<up-button
			type="primary"
			text="保存设置"
			color="#33c26d"
			shape="circle"
			customStyle="margin-top: 24rpx;"
			@click="savePushSetting"
		></up-button>

		<up-datetime-picker
			:show="showTimePicker"
			:value="timePickerValue"
			mode="time"
			@confirm="onTimeConfirm"
			@cancel="showTimePicker = false"
			@close="showTimePicker = false"
		></up-datetime-picker>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getSubscribeSetting, saveSubscribeSetting } from '@/api'

const pushEnabled = ref(false)
const pushTime = ref('09:00')
const showTimePicker = ref(false)
const timePickerValue = ref('09:00')
const authStatus = ref('UNKNOWN')
const subscribeTemplateId = ref('')
const updatingSwitch = ref(false)
const saving = ref(false)

const openTimePicker = () => {
	if (!pushEnabled.value) return
	showTimePicker.value = true
}

const onTimeConfirm = (payload) => {
	const value = payload?.value || '09:00'
	pushTime.value = value
	timePickerValue.value = value
	showTimePicker.value = false
}

const loadPushSetting = () => {
	getSubscribeSetting()
		.then((data) => {
			updatingSwitch.value = true
			pushEnabled.value = !!data?.enabled
			pushTime.value = `${data?.pushTime || '09:00'}`.trim() || '09:00'
			timePickerValue.value = pushTime.value
			authStatus.value = `${data?.authStatus || 'UNKNOWN'}`.trim().toUpperCase()
			subscribeTemplateId.value = `${data?.templateId || ''}`.trim()
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '加载推送设置失败',
				icon: 'none'
			})
		})
		.finally(() => {
			updatingSwitch.value = false
		})
}

const persistSetting = ({ enabled, auth = authStatus.value, silent = false } = {}) => {
	if (saving.value) return Promise.resolve()
	saving.value = true
	return saveSubscribeSetting({
		enabled: !!enabled,
		pushTime: pushTime.value,
		authStatus: auth
	})
		.then((data) => {
			authStatus.value = `${data?.authStatus || auth || 'UNKNOWN'}`.trim().toUpperCase()
			if (!silent) {
				uni.showToast({
					title: '推送设置已保存',
					icon: 'success'
				})
			}
		})
		.catch((err) => {
			if (!silent) {
				uni.showToast({
					title: err?.message || '保存失败',
					icon: 'none'
				})
			}
			throw err
		})
		.finally(() => {
			saving.value = false
		})
}

const onPushEnableChange = (value) => {
	if (updatingSwitch.value) return
	const nextEnabled = typeof value === 'object'
		? !!(value?.value ?? value?.detail?.value)
		: !!value
	if (!nextEnabled) {
		authStatus.value = 'UNKNOWN'
		persistSetting({ enabled: false, auth: authStatus.value, silent: true }).catch(() => {})
		return
	}

	// #ifdef MP-WEIXIN
	const tmplId = `${subscribeTemplateId.value || ''}`.trim()
	if (!tmplId) {
		updatingSwitch.value = true
		pushEnabled.value = false
		updatingSwitch.value = false
		uni.showToast({
			title: '订阅模板未配置',
			icon: 'none'
		})
		return
	}
	uni.requestSubscribeMessage({
		tmplIds: [tmplId],
		success: (res) => {
			const status = `${res?.[tmplId] || ''}`.trim().toLowerCase()
			if (status === 'accept') {
				authStatus.value = 'ACCEPT'
				persistSetting({ enabled: true, auth: 'ACCEPT', silent: true })
					.then(() => {
						uni.showToast({
							title: '订阅已开启',
							icon: 'success'
						})
					})
					.catch(() => {
						updatingSwitch.value = true
						pushEnabled.value = false
						updatingSwitch.value = false
					})
				return
			}
			authStatus.value = status === 'ban' ? 'BAN' : 'REJECT'
			updatingSwitch.value = true
			pushEnabled.value = false
			updatingSwitch.value = false
			persistSetting({ enabled: false, auth: authStatus.value, silent: true }).catch(() => {})
			uni.showToast({
				title: '未授权订阅，无法开启',
				icon: 'none'
			})
		},
		fail: () => {
			authStatus.value = 'REJECT'
			updatingSwitch.value = true
			pushEnabled.value = false
			updatingSwitch.value = false
			persistSetting({ enabled: false, auth: authStatus.value, silent: true }).catch(() => {})
			uni.showToast({
				title: '订阅授权失败',
				icon: 'none'
			})
		}
	})
	return
	// #endif

	// #ifndef MP-WEIXIN
	authStatus.value = 'ACCEPT'
	persistSetting({ enabled: true, auth: 'ACCEPT', silent: true }).catch(() => {
		updatingSwitch.value = true
		pushEnabled.value = false
		updatingSwitch.value = false
	})
	// #endif
}

const savePushSetting = () => {
	persistSetting({
		enabled: pushEnabled.value,
		auth: authStatus.value
	}).catch(() => {})
}

onShow(() => {
	loadPushSetting()
})
</script>

<style scoped lang="scss">
	.push-setting-page {
		min-height: 100vh;
		padding: 20rpx 24rpx 24rpx;
		background: #f6fcf8;
	}

	.setting-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12rpx;
		padding: 14rpx 0;
	}

	.setting-row-time {
		border-top: 1px solid #eef4f0;
	}

	.setting-text {
		display: flex;
		flex-direction: column;
		gap: 4rpx;
	}

	.setting-title {
		font-size: 28rpx;
		font-weight: 600;
		color: #294f38;
	}

	.setting-desc {
		font-size: 22rpx;
		color: #7a8a82;
	}

	.time-value-wrap {
		display: flex;
		align-items: center;
		gap: 8rpx;
	}

	.time-value {
		font-size: 26rpx;
		color: #33c26d;
		font-weight: 600;
	}

	.is-disabled {
		opacity: 0.45;
	}
</style>
