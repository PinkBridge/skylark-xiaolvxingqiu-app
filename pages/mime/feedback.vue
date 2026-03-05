<template>
	<view class="feedback-page">
		<up-form :model="form" labelPosition="top" labelWidth="220rpx">
			<up-form-item label="反馈内容">
				<template #label>
					<view class="required-label">
						<text>反馈内容</text>
						<text class="required-mark">*</text>
					</view>
				</template>
				<up-textarea
					v-model="form.content"
					placeholder="欢迎告诉我们你的建议或遇到的问题"
					border="surround"
					height="120"
					maxlength="300"
					count
				></up-textarea>
			</up-form-item>

			<up-form-item label="联系方式">
				<template #label>
					<view class="required-label">
						<text>联系方式</text>
					</view>
				</template>
				<up-input
					v-model="form.contact"
					placeholder="选填：手机号或邮箱"
					border="surround"
					clearable
				></up-input>
			</up-form-item>
		</up-form>

		<view class="submit-wrap">
			<up-button
				type="primary"
				text="提交反馈"
				color="#33c26d"
				shape="circle"
				@click="submitFeedback"
			></up-button>
		</view>
	</view>
</template>

<script setup>
import { reactive } from 'vue'
import { submitFeedbackApi } from '@/api'

const form = reactive({
	content: '',
	contact: ''
})

const submitFeedback = () => {
	if (!form.content.trim()) {
		uni.showToast({
			title: '请先填写反馈内容',
			icon: 'none'
		})
		return
	}

	submitFeedbackApi({
		content: form.content.trim(),
		contact: form.contact.trim()
	})
		.then(() => {
			uni.showToast({
				title: '感谢反馈，我们会持续优化',
				icon: 'success'
			})
			form.content = ''
			form.contact = ''
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '提交失败',
				icon: 'none'
			})
		})
}
</script>

<style scoped lang="scss">
	.feedback-page {
		min-height: 100vh;
		padding: 8rpx 24rpx 24rpx;
		background: #f6fcf8;
	}

	.submit-wrap {
		margin-top: 28rpx;
	}

	.required-label {
		display: inline-flex;
		align-items: center;
		white-space: nowrap;
	}

	.required-mark {
		margin-left: 4rpx;
		color: #fa3534;
		font-size: 26rpx;
		line-height: 1;
	}

	:deep(.u-form-item__body__left__content__label) {
		white-space: nowrap;
	}

	:deep(.u-form-item__body__left) {
		width: auto !important;
	}

	:deep(.u-form-item__body__left__content) {
		flex: none;
		width: fit-content;
		padding-right: 0;
	}

	:deep(.u-form-item__body) {
		padding: 8px 0;
	}

	:deep(.u-form-item__body__left__content__label) {
		font-size: 26rpx;
		color: #294f38;
	}
</style>
