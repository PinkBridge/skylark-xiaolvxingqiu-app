<template>
	<view class="garden-edit-page">
		<up-form :model="form" labelPosition="top" labelWidth="220rpx">
			<up-form-item label="花园缩略图">
				<template #label>
					<view class="required-label">
						<text>花园缩略图</text>
					</view>
				</template>
				<view class="image-picker thumb-picker" @tap="openImageSourceSheet('thumb')">
					<image v-if="form.thumb" class="garden-image" :src="form.thumb" mode="aspectFill"></image>
					<view v-else class="image-placeholder">
						<up-icon name="camera-fill" size="24" color="#33c26d"></up-icon>
						<text class="placeholder-text">拍照或从相册选择</text>
					</view>
				</view>
			</up-form-item>

			<up-form-item label="花园封面">
				<template #label>
					<view class="required-label">
						<text>花园封面</text>
					</view>
				</template>
				<view class="image-picker cover-picker" @tap="openImageSourceSheet('image')">
					<image v-if="form.image" class="garden-image" :src="form.image" mode="aspectFill"></image>
					<view v-else class="image-placeholder">
						<up-icon name="camera-fill" size="24" color="#33c26d"></up-icon>
						<text class="placeholder-text">拍照或从相册选择</text>
					</view>
				</view>
			</up-form-item>

			<up-form-item label="花园名称">
				<template #label>
					<view class="required-label">
						<text>花园名称</text>
						<text class="required-mark">*</text>
					</view>
				</template>
				<up-input
					v-model="form.title"
					placeholder="请输入花园名称"
					border="surround"
					clearable
					maxlength="20"
				></up-input>
			</up-form-item>

			<up-form-item label="花园建立时间">
				<template #label>
					<view class="required-label">
						<text>花园建立时间</text>
						<text class="required-mark">*</text>
					</view>
				</template>
				<view class="date-field" @tap="openDatePicker">
					<text :class="form.subTitle ? 'date-text' : 'date-placeholder'">
						{{ form.subTitle || '请选择建立时间' }}
					</text>
					<up-icon name="arrow-right" size="14" color="#7bc59a"></up-icon>
				</view>
			</up-form-item>

			<up-form-item label="花园描述">
				<template #label>
					<view class="required-label">
						<text>花园描述</text>
					</view>
				</template>
				<up-textarea
					v-model="form.description"
					placeholder="记录花园故事、风格与期待"
					border="surround"
					height="120"
					maxlength="120"
					count
				></up-textarea>
			</up-form-item>
		</up-form>

		<view class="submit-wrap">
			<up-button
				type="primary"
				text="保存花园信息"
				color="#33c26d"
				shape="circle"
				@click="saveGardenInfo"
			></up-button>
		</view>

		<up-action-sheet
			:show="showImageSourceSheet"
			:actions="imageSourceActions"
			cancelText="取消"
			@select="onImageSourceSelect"
			@close="showImageSourceSheet = false"
		></up-action-sheet>

		<up-datetime-picker
			:show="showDatePicker"
			:value="datePickerValue"
			mode="date"
			@confirm="onDateConfirm"
			@cancel="showDatePicker = false"
			@close="showDatePicker = false"
		></up-datetime-picker>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue'

const gardenStorageKey = 'gardenInfo'
const defaultGardenInfo = {
	title: '我的莫奈花园',
	subTitle: '2020-05-15',
	thumb: 'https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
	image: 'https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
	description: '釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放'
}

const form = reactive({
	...defaultGardenInfo
})

const imageTargetField = ref('thumb')
const showImageSourceSheet = ref(false)
const imageSourceActions = [
	{ name: '拍照', sourceType: ['camera'] },
	{ name: '从相册选择', sourceType: ['album'] }
]

const showDatePicker = ref(false)
const datePickerValue = ref(Date.now())

const applyForm = (payload) => {
	form.title = payload.title || ''
	form.subTitle = payload.subTitle || ''
	form.thumb = payload.thumb || ''
	form.image = payload.image || ''
	form.description = payload.description || ''
}

const loadGardenInfo = () => {
	const saved = uni.getStorageSync(gardenStorageKey)
	if (!saved || typeof saved !== 'object') {
		applyForm(defaultGardenInfo)
		return
	}

	applyForm({
		...defaultGardenInfo,
		...saved
	})
}

loadGardenInfo()

const openImageSourceSheet = (field) => {
	imageTargetField.value = field
	showImageSourceSheet.value = true
}

const onImageSourceSelect = (action) => {
	showImageSourceSheet.value = false
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: action.sourceType,
		success: (res) => {
			const imageUrl = res.tempFilePaths?.[0] || ''
			if (!imageUrl) return
			form[imageTargetField.value] = imageUrl
		}
	})
}

const openDatePicker = () => {
	showDatePicker.value = true
}

const formatDate = (timestamp) => {
	const date = new Date(timestamp)
	const year = date.getFullYear()
	const month = `${date.getMonth() + 1}`.padStart(2, '0')
	const day = `${date.getDate()}`.padStart(2, '0')
	return `${year}-${month}-${day}`
}

const onDateConfirm = (payload) => {
	const ts = payload?.value || Date.now()
	datePickerValue.value = ts
	form.subTitle = formatDate(ts)
	showDatePicker.value = false
}

const saveGardenInfo = () => {
	if (!form.title.trim()) {
		uni.showToast({
			title: '请输入花园名称',
			icon: 'none'
		})
		return
	}

	if (!form.subTitle) {
		uni.showToast({
			title: '请选择花园建立时间',
			icon: 'none'
		})
		return
	}

	uni.setStorageSync(gardenStorageKey, {
		title: form.title.trim(),
		subTitle: form.subTitle,
		thumb: form.thumb,
		image: form.image,
		description: form.description.trim()
	})

	uni.showToast({
		title: '保存成功',
		icon: 'success'
	})

	setTimeout(() => {
		uni.navigateBack()
	}, 400)
}
</script>

<style scoped lang="scss">
	.garden-edit-page {
		min-height: 100vh;
		padding: 8rpx 24rpx 24rpx;
		background: #f6fcf8;
	}

	.image-picker {
		width: 100%;
		height: 220rpx;
		border-radius: 20rpx;
		border: 1px dashed #b9e5cb;
		background: #eefbf3;
		overflow: hidden;
	}

	.thumb-picker {
		width: 160rpx;
		height: 160rpx;
	}

	.cover-picker {
		height: 280rpx;
	}

	.garden-image {
		width: 100%;
		height: 100%;
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10rpx;
	}

	.placeholder-text {
		font-size: 24rpx;
		color: #2f8f56;
	}

	.date-field {
		height: 76rpx;
		padding: 0 24rpx;
		border-radius: 12rpx;
		border: 1px solid #d7efdf;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.date-text {
		font-size: 26rpx;
		color: #294f38;
	}

	.date-placeholder {
		font-size: 26rpx;
		color: #9aa9a0;
	}

	.submit-wrap {
		margin-top: 28rpx;
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

	:deep(.u-form-item__body) {
		padding: 8px 0;
	}
</style>
