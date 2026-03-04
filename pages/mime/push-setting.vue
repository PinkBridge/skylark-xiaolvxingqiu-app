<template>
	<view class="push-setting-page">
		<up-card :showHead="false" :showFoot="false" :border="false" margin="0">
			<template #body>
				<view class="setting-row">
					<view class="setting-text">
						<text class="setting-title">微信小程序推送</text>
						<text class="setting-desc">默认关闭，开启后按设定时间提醒</text>
					</view>
					<up-switch v-model="pushEnabled" size="20" activeColor="#33c26d"></up-switch>
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

const pushEnabled = ref(false)
const pushTime = ref('09:00')
const showTimePicker = ref(false)
const timePickerValue = ref('09:00')

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

const savePushSetting = () => {
	uni.showToast({
		title: '推送设置已保存',
		icon: 'success'
	})
}
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
