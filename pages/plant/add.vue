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

			<up-form-item label="养护计划">
				<view class="plan-wrap">
					<view class="plan-header">
						<view class="plan-mode-switch">
							<text class="plan-title">季节模式</text>
							<up-switch
								v-model="carePlanConfig.seasonalMode"
								:activeValue="true"
								:inactiveValue="false"
								size="20"
								activeColor="#33c26d"
							></up-switch>
						</view>
					</view>
					<view v-if="carePlanConfig.seasonalMode" class="season-tabs-wrap">
						<up-subsection
							:list="seasonTabList"
							:current="activeSeasonIndex"
							mode="button"
							activeColor="#33c26d"
							inactiveColor="#5a6b60"
							bgColor="#eefbf3"
							@change="onSeasonTabChange"
						></up-subsection>
					</view>

					<view class="task-plan-wrap">
						<view
							v-for="task in careTaskOptions"
							:key="task.key"
							class="task-plan-item"
						>
							<view class="task-left">
								<view class="task-icon-box">
									<up-icon :name="task.icon" size="16" color="#33c26d"></up-icon>
								</view>
								<view class="task-info">
									<text class="task-name">{{ task.label }}</text>
									<view class="task-frequency-row" :class="{ 'is-disabled': !currentTaskPlanMap[task.key].enabled }">
										<text class="frequency-prefix">每</text>
										<up-input
											v-model="currentTaskPlanMap[task.key].intervalDays"
											type="number"
											:disabled="!currentTaskPlanMap[task.key].enabled"
											border="surround"
											inputAlign="center"
											customStyle="width: 84rpx; height: 50rpx; padding: 0 6rpx;"
										></up-input>
										<text class="frequency-suffix">天一次</text>
									</view>
								</view>
							</view>
							<up-switch
								v-model="currentTaskPlanMap[task.key].enabled"
								:activeValue="true"
								:inactiveValue="false"
								size="20"
								activeColor="#33c26d"
							></up-switch>
						</view>
					</view>

					<text v-if="carePlanConfig.seasonalMode" class="season-note">
						季节按公历划分：春(3-5月) 夏(6-8月) 秋(9-11月) 冬(12-2月)
					</text>
				</view>
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
import { computed, reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { createPlant, getCarePlanConfig, getPlantById, saveCarePlanConfig, updatePlant as updatePlantApi } from '@/api'

const cultivationOptions = ['土培', '水培']
const cultivationIndex = ref(0)
const editPlantId = ref('')
const selectedGardenId = ref('')

const plantForm = reactive({
	image: '',
	name: '',
	species: '',
	cultivationType: 'soil',
	plantingDate: '',
	note: ''
})

const careTaskOptions = [
	{ key: 'water', label: '浇水', icon: 'heart-fill' },
	{ key: 'fertilize', label: '施肥', icon: 'gift-fill' },
	{ key: 'loosen', label: '松土', icon: 'grid-fill' },
	{ key: 'prune', label: '修剪', icon: 'cut' },
	{ key: 'repot', label: '换盆', icon: 'reload' },
	{ key: 'pest', label: '病虫害', icon: 'warning-fill' },
	{ key: 'measure', label: '测量', icon: 'map-fill' },
	{ key: 'photo', label: '拍照', icon: 'camera-fill' }
]

const defaultIntervalDaysMap = {
	water: 5,
	fertilize: 21,
	loosen: 30,
	prune: 30,
	repot: 365,
	pest: 7,
	measure: 14,
	photo: 7
}

const defaultIntervalDays = (taskKey) => defaultIntervalDaysMap[taskKey] || 3

const normalizeIntervalDays = (taskKey, value) => {
	const interval = Number(value)
	if (Number.isFinite(interval) && interval > 0) return interval
	return defaultIntervalDays(taskKey)
}

const createTaskConfig = () =>
	careTaskOptions.reduce((acc, task) => {
		acc[task.key] = { enabled: false, intervalDays: defaultIntervalDays(task.key) }
		return acc
	}, {})

const carePlanConfig = reactive({
	seasonalMode: false,
	tasks: createTaskConfig(),
	seasonTasks: {
		spring: createTaskConfig(),
		summer: createTaskConfig(),
		autumn: createTaskConfig(),
		winter: createTaskConfig()
	}
})

const seasonPlanOptions = [
	{ key: 'spring', label: '春季' },
	{ key: 'summer', label: '夏季' },
	{ key: 'autumn', label: '秋季' },
	{ key: 'winter', label: '冬季' }
]
const activeSeasonIndex = ref(0)
const seasonTabList = seasonPlanOptions.map((season) => season.label)
const currentSeasonKey = computed(() => seasonPlanOptions[activeSeasonIndex.value]?.key || 'spring')
const currentTaskPlanMap = computed(() => {
	if (!carePlanConfig.seasonalMode) return carePlanConfig.tasks
	return carePlanConfig.seasonTasks[currentSeasonKey.value]
})

const showImageSourceSheet = ref(false)
const imageSourceActions = [
	{ name: '拍照', sourceType: ['camera'] },
	{ name: '从相册选择', sourceType: ['album'] }
]

const showDatePicker = ref(false)
const datePickerValue = ref(Date.now())

const seasonKeyMap = {
	SPRING: 'spring',
	SUMMER: 'summer',
	AUTUMN: 'autumn',
	WINTER: 'winter'
}

const seasonApiMap = {
	spring: 'SPRING',
	summer: 'SUMMER',
	autumn: 'AUTUMN',
	winter: 'WINTER'
}

const resetCarePlanConfig = () => {
	carePlanConfig.seasonalMode = false
	carePlanConfig.tasks = createTaskConfig()
	carePlanConfig.seasonTasks = {
		spring: createTaskConfig(),
		summer: createTaskConfig(),
		autumn: createTaskConfig(),
		winter: createTaskConfig()
	}
	activeSeasonIndex.value = 0
}

const resetPlantForm = () => {
	editPlantId.value = ''
	selectedGardenId.value = ''
	plantForm.image = ''
	plantForm.name = ''
	plantForm.species = ''
	plantForm.cultivationType = 'soil'
	plantForm.plantingDate = ''
	plantForm.note = ''
	cultivationIndex.value = 0
	datePickerValue.value = Date.now()
	resetCarePlanConfig()
}

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

const onSeasonTabChange = (index) => {
	activeSeasonIndex.value = index
}

const buildCarePlanRequest = () => {
	const rules = []
	if (!carePlanConfig.seasonalMode) {
		careTaskOptions.forEach((task) => {
			const cfg = carePlanConfig.tasks[task.key]
			rules.push({
				activityType: task.key,
				season: 'ALL',
				enabled: !!cfg.enabled,
				intervalDays: normalizeIntervalDays(task.key, cfg.intervalDays)
			})
		})
	} else {
		Object.keys(seasonApiMap).forEach((seasonKey) => {
			careTaskOptions.forEach((task) => {
				const cfg = carePlanConfig.seasonTasks[seasonKey][task.key]
				rules.push({
					activityType: task.key,
					season: seasonApiMap[seasonKey],
					enabled: !!cfg.enabled,
					intervalDays: normalizeIntervalDays(task.key, cfg.intervalDays)
				})
			})
		})
	}
	return {
		enabled: true,
		seasonalMode: !!carePlanConfig.seasonalMode,
		rules
	}
}

const loadCarePlan = (plantId) => {
	getCarePlanConfig(plantId)
		.then((data) => {
			resetCarePlanConfig()
			carePlanConfig.seasonalMode = !!data?.seasonalMode
			;(data?.rules || []).forEach((rule) => {
				const key = rule?.activityType
				if (!key || !carePlanConfig.tasks[key]) return
				const enabled = !!rule?.enabled
				const safeInterval = normalizeIntervalDays(key, rule?.intervalDays)
				const season = `${rule?.season || 'ALL'}`.toUpperCase()
				if (season === 'ALL') {
					carePlanConfig.tasks[key].enabled = enabled
					carePlanConfig.tasks[key].intervalDays = safeInterval
					return
				}
				const seasonKey = seasonKeyMap[season]
				if (!seasonKey || !carePlanConfig.seasonTasks[seasonKey]?.[key]) return
				carePlanConfig.seasonTasks[seasonKey][key].enabled = enabled
				carePlanConfig.seasonTasks[seasonKey][key].intervalDays = safeInterval
			})
		})
		.catch(() => {
			resetCarePlanConfig()
		})
}

const onSubmitPlant = () => {
	if (!plantForm.image || !plantForm.name || !plantForm.plantingDate) {
		uni.showToast({
			title: '请完善必填信息',
			icon: 'none'
		})
		return
	}
	const payload = {
		image: plantForm.image,
		name: plantForm.name,
		species: plantForm.species,
		cultivationType: plantForm.cultivationType,
		plantingDate: plantForm.plantingDate,
		note: plantForm.note,
		gardenId: selectedGardenId.value ? Number(selectedGardenId.value) : undefined
	}
	let carePlanReq = null
	try {
		carePlanReq = buildCarePlanRequest()
	} catch (err) {
		uni.showToast({
			title: err?.message || '养护计划参数无效',
			icon: 'none'
		})
		return
	}
	const req = editPlantId.value ? updatePlantApi(editPlantId.value, payload) : createPlant(payload)
	req
		.then((savedPlant) => {
			const plantId = editPlantId.value || `${savedPlant?.id || ''}`.trim()
			if (!plantId || !carePlanReq) return Promise.resolve()
			return saveCarePlanConfig(plantId, carePlanReq)
		})
		.then(() => {
			uni.showToast({
				title: '绿植和计划已保存',
				icon: 'success'
			})
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/plant/plant'
				})
			}, 500)
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '保存失败',
				icon: 'none'
			})
		})
}

const applyAiPrefill = (prefillRaw) => {
	const raw = `${prefillRaw || ''}`.trim()
	if (!raw) return
	let prefill = {}
	try {
		prefill = JSON.parse(decodeURIComponent(raw))
	} catch (e) {
		return
	}
	const fallbackImage = `${prefill?.recognizedImageUrl || prefill?.imageUrl || ''}`.trim()
	if (fallbackImage) {
		plantForm.image = fallbackImage
	}
	const name = `${prefill?.name || ''}`.trim()
	if (name) {
		plantForm.name = name
		plantForm.species = name
	}
	const desc = `${prefill?.description || ''}`.trim()
	if (desc) {
		plantForm.note = desc
	}
	if (!plantForm.plantingDate) {
		plantForm.plantingDate = formatDate(Date.now())
	}
}

onLoad((query) => {
	resetPlantForm()
	selectedGardenId.value = `${query?.gardenId || ''}`.trim()
	applyAiPrefill(query?.prefill)
	const id = query?.id
	if (!id) return
	editPlantId.value = id
	getPlantById(id)
		.then((data) => {
			plantForm.image = data?.image || ''
			plantForm.name = data?.name || ''
			plantForm.species = data?.species || ''
			plantForm.cultivationType = data?.cultivationType || 'soil'
			plantForm.plantingDate = data?.plantingDate || ''
			plantForm.note = data?.note || ''
			cultivationIndex.value = plantForm.cultivationType === 'water' ? 1 : 0
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '加载绿植失败',
				icon: 'none'
			})
		})
	loadCarePlan(id)
})
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

	.plan-wrap {
		width: 100%;
		border: 1px solid #d7efdf;
		border-radius: 14rpx;
		padding: 16rpx;
		background: #f7fcf9;
	}

	.plan-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 20rpx;
	}

	.plan-title {
		font-size: 24rpx;
		color: #2f8f56;
	}

	.plan-mode-switch {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.season-tabs-wrap {
		margin-top: 12rpx;
	}

	.task-plan-wrap {
		margin-top: 12rpx;
		display: flex;
		flex-direction: column;
		gap: 12rpx;
	}

	.task-plan-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8rpx 6rpx;
		border-radius: 14rpx;
		background: #ffffff;
	}

	.task-left {
		display: flex;
		align-items: center;
		gap: 15rpx;
	}

	.task-icon-box {
		width: 54rpx;
		height: 54rpx;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #eefbf3;
		border: 1px solid #d7efdf;
	}

	.task-info {
		display: flex;
		flex-direction: column;
		gap: 4rpx;
	}

	.task-name {
		font-size: 26rpx;
		color: #1f2d2a;
		font-weight: 500;
		line-height: 1;
	}

	.task-frequency-row {
		display: flex;
		align-items: center;
		gap: 6rpx;
	}

	.frequency-prefix,
	.frequency-suffix {
		font-size: 22rpx;
		color: #6f7f76;
	}

	.is-disabled {
		opacity: 0.5;
	}

	.season-note {
		margin-top: 12rpx;
		font-size: 20rpx;
		color: #8a9790;
		line-height: 1.4;
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
