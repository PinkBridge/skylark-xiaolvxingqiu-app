<template>
	<view class="add-plant-page">
		<up-form :model="plantForm" labelPosition="top" labelWidth="220rpx">
			<up-form-item label="植物图片">
				<template #label>
					<view class="required-label">
						<text>植物图片</text>
						<text class="required-mark">*</text>
					</view>
				</template>
				<view class="image-picker" @tap="openImageSourceSheet">
					<image
						v-if="plantForm.image"
						class="plant-image"
						:src="plantForm.image"
						mode="aspectFill"
					></image>
					<view v-else class="image-placeholder">
						<up-icon name="camera-fill" size="24" color="#33c26d"></up-icon>
						<text class="placeholder-text">拍照或从相册选择</text>
					</view>
				</view>
			</up-form-item>

			<up-form-item label="植物名称">
				<template #label>
					<view class="required-label">
						<text>植物名称</text>
						<text class="required-mark">*</text>
					</view>
				</template>
				<up-input
					v-model="plantForm.name"
					placeholder="请输入植物名称"
					border="surround"
					clearable
				></up-input>
			</up-form-item>

			<up-form-item label="植物品种">
				<template #label>
					<view class="required-label">
						<text>植物品种</text>
					</view>
				</template>
				<up-input
					v-model="plantForm.species"
					placeholder="请输入植物品种"
					border="surround"
					clearable
				></up-input>
			</up-form-item>

			<up-form-item label="栽培方式">
				<template #label>
					<view class="required-label">
						<text>栽培方式</text>
						<text class="required-mark">*</text>
					</view>
				</template>
				<up-subsection
					:list="cultivationOptions"
					:current="cultivationIndex"
					mode="button"
					activeColor="#33c26d"
					inactiveColor="#5a6b60"
					bgColor="#eaf9f0"
					@change="onCultivationChange"
				></up-subsection>
			</up-form-item>

			<up-form-item label="种植日期">
				<template #label>
					<view class="required-label">
						<text>种植日期</text>
						<text class="required-mark">*</text>
					</view>
				</template>
				<view class="date-field" @tap="openDatePicker">
					<text :class="plantForm.plantingDate ? 'date-text' : 'date-placeholder'">
						{{ plantForm.plantingDate || '请选择种植日期' }}
					</text>
					<up-icon name="arrow-right" size="14" color="#7bc59a"></up-icon>
				</view>
			</up-form-item>

			<up-form-item label="备注">
				<up-textarea
					v-model="plantForm.note"
					placeholder="记录当前状态、环境、养护习惯等"
					border="surround"
					height="120"
					maxlength="200"
					count
				></up-textarea>
			</up-form-item>
		</up-form>

		<view class="submit-wrap">
			<up-button
				type="primary"
				text="保存绿植"
				color="#33c26d"
				shape="circle"
				@click="onSubmitPlant"
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

const cultivationOptions = ['土培', '水培']
const cultivationIndex = ref(0)

const plantForm = reactive({
	image: '',
	name: '',
	species: '',
	cultivationType: 'soil',
	plantingDate: '',
	note: ''
})

const showImageSourceSheet = ref(false)
const imageSourceActions = [
	{ name: '拍照', sourceType: ['camera'] },
	{ name: '从相册选择', sourceType: ['album'] }
]

const showDatePicker = ref(false)
const datePickerValue = ref(Date.now())

const onCultivationChange = (index) => {
	cultivationIndex.value = index
	plantForm.cultivationType = index === 0 ? 'soil' : 'water'
}

const openImageSourceSheet = () => {
	showImageSourceSheet.value = true
}

const onImageSourceSelect = (action) => {
	showImageSourceSheet.value = false
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: action.sourceType,
		success: (res) => {
			plantForm.image = res.tempFilePaths?.[0] || ''
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
	plantForm.plantingDate = formatDate(ts)
	showDatePicker.value = false
}

const onSubmitPlant = () => {
	if (!plantForm.image || !plantForm.name || !plantForm.plantingDate) {
		uni.showToast({
			title: '请完善必填信息',
			icon: 'none'
		})
		return
	}
	uni.showToast({
		title: '绿植信息已保存',
		icon: 'success'
	})
	setTimeout(() => {
		uni.redirectTo({
			url: '/pages/plant/plant'
		})
	}, 500)
}
</script>

<style scoped lang="scss">
	.add-plant-page {
		min-height: 100vh;
		padding: 8rpx 24rpx 24rpx;
		background: #f6fcf8;
	}

	.image-picker {
		width: 100%;
		height: 280rpx;
		border-radius: 20rpx;
		border: 1px dashed #b9e5cb;
		background: #eefbf3;
		overflow: hidden;
	}

	.plant-image {
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
