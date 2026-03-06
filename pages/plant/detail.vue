<template>
	<view class="plant-detail-page">
		<up-card :showHead="false" :showFoot="false" :border="false" margin="0">
			<template #body>
				<view class="basic-info-wrap">
					<image class="plant-cover" :src="currentPlant.image" mode="aspectFill"></image>
					<view class="basic-info-content">
						<view class="plant-name-row">
							<view class="plant-title-wrap">
								<text class="plant-name">{{ currentPlant.name }}</text>
							</view>
							<view class="action-btn-wrap">
								<view
									class="action-btn status-btn"
									:style="{
										color: currentStatusOption.color,
										background: currentStatusOption.bgColor,
										borderColor: currentStatusOption.borderColor
									}"
									@tap="onSwitchPlantStatus"
								>
									<up-icon
										:name="currentStatusOption.icon"
										size="14"
										:color="currentStatusOption.color"
									></up-icon>
									<text>{{ currentStatusOption.label }}</text>
								</view>
								<view
									class="action-btn focus-btn"
									:class="{ 'action-btn--focus-active': currentPlant.focused }"
									@tap="onToggleFocus"
								>
									<up-icon
										:name="currentPlant.focused ? 'warning-fill' : 'warning'"
										size="14"
										:color="currentPlant.focused ? '#d48806' : '#2f8f56'"
									></up-icon>
									<text>{{ currentPlant.focused ? '已关注' : '关注' }}</text>
								</view>
								<view class="action-btn" @tap="onEditPlant">
									<up-icon name="edit-pen" size="16" color="#33c26d"></up-icon>
									<text>编辑</text>
								</view>
								<view class="action-btn action-btn--danger" @tap="onDeletePlant">
									<up-icon name="trash" size="16" color="#f56c6c"></up-icon>
									<text>删除</text>
								</view>
							</view>
						</view>
						<view class="basic-info-grid">
							<view
								v-for="infoItem in basicInfoItems"
								:key="infoItem.key"
								class="basic-info-item"
								:class="`basic-info-item--${infoItem.key}`"
							>
								<up-icon :name="infoItem.icon" size="14" :color="infoItem.iconColor || '#7c8b83'"></up-icon>
								<text class="info-value">{{ infoItem.value }}</text>
							</view>
						</view>
					</view>
				</view>
			</template>
		</up-card>

		<view class="tab-wrap">
			<up-subsection
				:list="detailTabs"
				:current="activeTabIndex"
				mode="button"
				activeColor="#33c26d"
				inactiveColor="#5a6b60"
				bgColor="#eaf9f0"
				@change="onTabChange"
			></up-subsection>
		</view>

		<view v-if="activeTabIndex === 0" class="section-list">
			<up-card
				v-for="record in growthRecords"
				:key="record.id"
				:showHead="false"
				:showFoot="false"
				:border="false"
				margin="0"
				class="section-card"
			>
				<template #body>
					<view class="record-item">
						<view class="record-main">
							<view class="record-icon-box">
								<up-icon :name="record.icon || 'checkmark-circle-fill'" size="16" color="#33c26d"></up-icon>
							</view>
							<view class="record-content">
								<view class="record-head">
									<text class="record-action">{{ record.name }}</text>
									<text class="record-time">{{ record.timeText }}</text>
								</view>
								<text class="record-note">{{ record.content || '已完成本次养护记录' }}</text>
							</view>
						</view>
					</view>
				</template>
			</up-card>
			<view v-if="!growthRecords.length && !growthRecordLoading" class="records-empty">
				<text>暂无生长记录</text>
			</view>
			<view v-if="growthRecordLoading" class="records-loading">
				<text>加载中...</text>
			</view>
			<view v-else-if="growthRecords.length && !growthRecordHasMore" class="records-finished">
				<text>没有更多记录了</text>
			</view>
		</view>

		<view v-else-if="activeTabIndex === 1" class="section-list">
			<up-card
				v-for="photo in photoRecords"
				:key="photo.id"
				:showHead="false"
				:showFoot="false"
				:border="false"
				margin="0"
				class="section-card"
			>
				<template #body>
					<view class="album-item">
						<view class="album-meta">
							<text class="album-desc">{{ photo.desc }}</text>
						</view>
						<view class="album-media-wrap">
							<up-album
								:urls="photo.images"
								multipleSize="140rpx"
								rowCount="3"
								space="10rpx"
							></up-album>
							<view class="album-footer">
								<text class="album-date album-date-bottom">{{ toDaysAgoText(photo.date) }}</text>
								<view class="album-share-btn" @tap="onShareToMoments(photo)">
									<up-icon name="share-fill" size="16" color="#33c26d"></up-icon>
								</view>
							</view>
						</view>
					</view>
				</template>
			</up-card>
			<view v-if="!photoRecords.length && !albumRecordLoading" class="records-empty">
				<text>暂无植物相册</text>
			</view>
			<view v-if="albumRecordLoading" class="records-loading">
				<text>加载中...</text>
			</view>
			<view v-else-if="photoRecords.length && !albumRecordHasMore" class="records-finished">
				<text>没有更多照片了</text>
			</view>
		</view>

		<view v-else-if="activeTabIndex === 2" class="section-list">
			<up-card :showHead="false" :showFoot="false" :border="false" margin="0" class="section-card">
				<template #body>
					<view class="care-plan-config">
						<view class="plan-header">
							<view class="plan-mode-switch">
								<text class="plan-mode-text">季节模式</text>
								<up-switch
									v-model="carePlanConfig.seasonalMode"
									:disabled="!carePlanConfig.enabled"
									:activeValue="true"
									:inactiveValue="false"
									size="20"
									activeColor="#33c26d"
								></up-switch>
							</view>
							<view class="plan-save-btn" @tap="onSaveCarePlan">
								<up-icon name="checkmark" size="14" color="#33c26d"></up-icon>
								<text>{{ savingCarePlan ? '保存中' : '保存计划' }}</text>
							</view>
						</view>

						<view v-if="carePlanConfig.enabled && carePlanConfig.seasonalMode" class="season-tabs-wrap">
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

						<view v-if="carePlanConfig.enabled" class="task-plan-wrap">
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

						<text v-if="carePlanConfig.enabled && carePlanConfig.seasonalMode" class="season-note">
							季节按公历划分：春(3-5月) 夏(6-8月) 秋(9-11月) 冬(12-2月)
						</text>
					</view>
				</template>
			</up-card>
		</view>

		<view v-else class="section-list">
			<up-card :showHead="false" :showFoot="false" :border="false" margin="0" class="section-card">
				<template #body>
					<view class="stats-grid">
						<view class="stats-item">
							<text class="stats-value">{{ statsSummary.totalCareCount }}</text>
							<text class="stats-label">累计养护次数</text>
						</view>
						<view class="stats-item">
							<text class="stats-value">{{ statsSummary.photoCount }}</text>
							<text class="stats-label">拍照记录</text>
						</view>
						<view class="stats-item">
							<text class="stats-value">{{ statsSummary.waterCount }}</text>
							<text class="stats-label">浇水次数</text>
						</view>
						<view class="stats-item">
							<text class="stats-value">{{ statsSummary.lastCareGap }}</text>
							<text class="stats-label">距上次养护(天)</text>
						</view>
						<view class="stats-item">
							<text class="stats-value">{{ statsSummary.weekCareCount }}</text>
							<text class="stats-label">本周养护次数</text>
						</view>
					</view>
					<view class="stats-chart-wrap">
						<view class="stats-chart-title">
							<text>近六个月养护次数</text>
						</view>
						<view class="stats-chart">
							<view
								v-for="item in monthlyStats"
								:key="item.month"
								class="stats-chart-item"
							>
								<text class="stats-chart-value">{{ item.count }}</text>
								<view class="stats-chart-bar-bg">
									<view
										class="stats-chart-bar"
										:style="{ height: `${Math.max(8, Math.round((item.count / monthlyBarMax) * 100))}%` }"
									></view>
								</view>
								<text class="stats-chart-label">{{ item.label }}</text>
							</view>
						</view>
					</view>
					<view class="stats-chart-wrap">
						<view class="stats-chart-title">
							<text>每日浇水时间分布</text>
						</view>
						<view class="water-time-list">
							<view
								v-for="item in wateringTimeDistribution"
								:key="item.segment"
								class="water-time-item"
							>
								<view class="water-time-head">
									<text class="water-time-label">{{ item.label }}</text>
									<text class="water-time-count">{{ item.count }}次</text>
								</view>
								<view class="water-time-bar-bg">
									<view
										class="water-time-bar"
										:style="{ width: `${Math.max(8, Math.round((item.count / wateringTimeMax) * 100))}%` }"
									></view>
								</view>
							</view>
						</view>
						<view
							v-if="statsSummary.wateringOutsideRecommendedCount > 0"
							class="water-time-tip water-time-tip--warn"
						>
							<text>
								提示：检测到 {{ statsSummary.wateringOutsideRecommendedCount }} 次浇水不在早晚时段，尽量在早上或晚上浇水。
							</text>
						</view>
						<view v-else class="water-time-tip">
							<text>{{ statsSummary.wateringTimeTip || '浇水时间分布良好。' }}</text>
						</view>
					</view>
					<view class="stats-chart-wrap">
						<view class="stats-chart-title">
							<text>健康状态时长占比（从开始到当前）</text>
						</view>
						<view class="health-status-list">
							<view
								v-for="item in healthStatusDistribution"
								:key="item.status"
								class="health-status-item"
							>
								<view class="health-status-head">
									<text class="health-status-label">{{ item.status }}</text>
									<text class="health-status-count">{{ item.daysText }} · {{ item.ratioText }}</text>
								</view>
								<view class="health-status-bar-bg">
									<view
										class="health-status-bar"
										:class="`health-status-bar--${item.key}`"
										:style="{ width: `${item.ratio}` }"
									></view>
								</view>
							</view>
						</view>
						<view v-if="isAlwaysHealthyTimeline" class="water-time-tip">
							<text>绿植在您的精心呵护下一直健康成长</text>
						</view>
					</view>
				</template>
			</up-card>
		</view>

		<up-popup
			:show="showFocusPopup"
			mode="bottom"
			round="18"
			@close="showFocusPopup = false"
		>
			<view class="focus-popup">
				<view class="focus-head">
					<text class="focus-title">加入需关注</text>
					<up-icon name="close" size="16" color="#8ea096" @tap="showFocusPopup = false"></up-icon>
				</view>
				<up-form :model="focusForm" labelPosition="top">
					<up-form-item label="图片">
						<view class="focus-photo-picker" @tap="onPickFocusPhoto">
							<image
								v-if="focusForm.photo"
								class="focus-photo"
								:src="focusForm.photo"
								mode="aspectFill"
							></image>
							<view v-else class="focus-photo-placeholder">
								<up-icon name="camera-fill" size="20" color="#33c26d"></up-icon>
								<text>拍照或从相册选择</text>
							</view>
						</view>
					</up-form-item>
					<up-form-item label="备注">
						<up-textarea
							v-model="focusForm.reason"
							placeholder="请输入备注"
							border="surround"
							height="90"
							maxlength="120"
							count
						></up-textarea>
					</up-form-item>
				</up-form>
				<view class="focus-submit-wrap">
					<up-button
						type="primary"
						text="确认关注"
						color="#33c26d"
						shape="circle"
						@click="onSubmitFocus"
					></up-button>
				</view>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import {
	clearPlantFocus,
	deletePlant as deletePlantApi,
	getCarePlanConfig,
	getPlantCareStats,
	getPlantMonthlyStats,
	getPlantById,
	listPlantAlbumRecords,
	listPlantGrowthRecords,
	saveCarePlanConfig,
	setPlantFocus,
	updatePlant
} from '@/api'

const detailTabs = ['生长记录', '植物相册', '养护计划', '统计分析']
const activeTabIndex = ref(0)
const currentPlantId = ref(1)
const currentPlantData = ref({
	id: 1,
	name: '绿植',
	statusLabel: '健康',
	days: 1,
	cultivationLabel: '土培',
	image: '/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg',
	focused: false,
	focusReason: '',
	focusPhoto: '',
	focusAt: ''
})
const showFocusPopup = ref(false)
const focusForm = reactive({
	photo: '',
	reason: ''
})
const switchingStatus = ref(false)

const plantStatusOptions = [
	{ value: 'healthy', label: '健康', color: '#33c26d', bgColor: '#eefbf3', borderColor: '#d7efdf', icon: 'checkmark-circle-fill' },
	{ value: 'sick', label: '生病', color: '#f56c6c', bgColor: '#fff3f3', borderColor: '#ffd6d6', icon: 'close-circle-fill' },
	{ value: 'dormant', label: '休眠', color: '#e6a23c', bgColor: '#fff7e6', borderColor: '#ffe7ba', icon: 'clock-fill' },
	{ value: 'dead', label: '已死亡', color: '#909399', bgColor: '#f4f4f5', borderColor: '#e4e7ed', icon: 'minus-circle-fill' },
	{ value: 'gifted', label: '已送人', color: '#409eff', bgColor: '#ecf5ff', borderColor: '#d9ecff', icon: 'account-fill' },
	{ value: 'sold', label: '已售出', color: '#9c6bff', bgColor: '#f5f0ff', borderColor: '#e5d8ff', icon: 'checkmark-circle-fill' }
]

const statusAliasMap = {
	健康: 'healthy',
	生病: 'sick',
	休眠: 'dormant',
	已死亡: 'dead',
	死亡: 'dead',
	已送人: 'gifted',
	已售出: 'sold'
}

const resolveStatusValue = (status) => {
	if (!status) return 'healthy'
	const raw = `${status}`.trim()
	if (!raw) return 'healthy'
	return statusAliasMap[raw] || raw.toLowerCase()
}

const currentStatusOption = computed(() => {
	const value = resolveStatusValue(currentPlant.value.healthStatus)
	return plantStatusOptions.find((item) => item.value === value) || plantStatusOptions[0]
})

const growthRecords = ref([])
const growthRecordLoading = ref(false)
const growthRecordPageNo = ref(1)
const growthRecordPageSize = 10
const growthRecordHasMore = ref(true)
const albumRecords = ref([])
const albumRecordLoading = ref(false)
const albumRecordPageNo = ref(1)
const albumRecordPageSize = 10
const albumRecordHasMore = ref(true)

const statsSummary = ref({
	totalCareCount: 0,
	photoCount: 0,
	waterCount: 0,
	lastCareGap: 0,
	weekCareCount: 0,
	wateringOutsideRecommendedCount: 0,
	wateringTimeTip: '',
	wateringTimeDistribution: [],
	statusTimeDistribution: []
})
const monthlyStats = ref([])

const careTaskOptions = [
	{ key: 'water', label: '浇水', icon: '/static/icon/water.png' },
	{ key: 'fertilize', label: '施肥', icon: '/static/icon/fertilize.png' },
	{ key: 'loosen', label: '松土', icon: '/static/icon/loosen.png' },
	{ key: 'prune', label: '修剪', icon: '/static/icon/prune.png' },
	{ key: 'repot', label: '换盆', icon: '/static/icon/repot.png' },
	{ key: 'pest', label: '病虫害', icon: '/static/icon/pest.png' },
	{ key: 'measure', label: '测量', icon: '/static/icon/measure.png' },
	{ key: 'photo', label: '拍照', icon: '/static/icon/photo.png' }
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

const defaultIntervalDays = (taskKey) => {
	return defaultIntervalDaysMap[taskKey] || 3
}

const normalizeIntervalDays = (taskKey, value) => {
	const interval = Number(value)
	if (Number.isFinite(interval) && interval > 0) return interval
	return defaultIntervalDays(taskKey)
}

const createTaskConfig = () => {
	return careTaskOptions.reduce((acc, task) => {
		acc[task.key] = { enabled: false, intervalDays: defaultIntervalDays(task.key) }
		return acc
	}, {})
}

const carePlanConfig = reactive({
	enabled: true,
	intervalDays: '',
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
const savingCarePlan = ref(false)

const currentPlant = computed(() => {
	return currentPlantData.value
})

const basicInfoItems = computed(() => {
	return [
		{ key: 'days', icon: 'clock-fill', iconColor: '#4b9c72', value: `第 ${currentPlant.value.days} 天` },
		{ key: 'cultivation', icon: 'home-fill', iconColor: '#4b9c72', value: currentPlant.value.cultivationLabel },
		{ key: 'species', icon: 'bookmark-fill', iconColor: '#4b9c72', value: currentPlant.value.species || '未知品种' }
	]
})

const photoRecords = computed(() => albumRecords.value)

const currentTaskPlanMap = computed(() => {
	if (!carePlanConfig.seasonalMode) return carePlanConfig.tasks
	return carePlanConfig.seasonTasks[currentSeasonKey.value]
})

const monthlyBarMax = computed(() => {
	const values = monthlyStats.value.map((item) => Number(item?.count || 0))
	return Math.max(1, ...values)
})

const mapWateringSegmentLabel = (segment) => {
	if (segment === 'morning') return '早上'
	if (segment === 'daytime') return '白天'
	if (segment === 'evening') return '晚上'
	if (segment === 'night') return '夜间'
	return segment || '未知'
}

const wateringTimeDistribution = computed(() => {
	const raw = Array.isArray(statsSummary.value?.wateringTimeDistribution)
		? statsSummary.value.wateringTimeDistribution
		: []
	return raw.map((item) => ({
		segment: item?.segment || '',
		label: mapWateringSegmentLabel(item?.segment || ''),
		count: Number(item?.count || 0)
	}))
})

const wateringTimeMax = computed(() => {
	const values = wateringTimeDistribution.value.map((item) => Number(item?.count || 0))
	return Math.max(1, ...values)
})

const healthStatusOrder = ['健康', '生病', '休眠', '已死亡', '已送人', '已售出']
const healthStatusColorKeyMap = {
	健康: 'healthy',
	生病: 'sick',
	休眠: 'dormant',
	已死亡: 'dead',
	已送人: 'gifted',
	已售出: 'sold'
}

const healthStatusDistribution = computed(() => {
	const raw = Array.isArray(statsSummary.value?.statusTimeDistribution)
		? statsSummary.value.statusTimeDistribution
		: []
	const map = {}
	raw.forEach((item) => {
		const status = `${item?.status || ''}`.trim()
		if (!status) return
		map[status] = Number(item?.durationMinutes || 0)
	})
	const total = healthStatusOrder.reduce((sum, status) => sum + Number(map[status] || 0), 0)
	return healthStatusOrder.map((status) => {
		const minutes = Number(map[status] || 0)
		const ratioNumber = total > 0 ? (minutes / total) * 100 : 0
		const days = minutes / (24 * 60)
		return {
			key: healthStatusColorKeyMap[status] || 'healthy',
			status,
			minutes,
			daysText: `${days >= 1 ? days.toFixed(1) : days.toFixed(2)}天`,
			ratio: `${Math.max(total > 0 ? 4 : 0, Math.round(ratioNumber))}%`,
			ratioText: `${Math.round(ratioNumber)}%`
		}
	})
})

const isAlwaysHealthyTimeline = computed(() => {
	const list = healthStatusDistribution.value || []
	if (!list.length) return false
	const healthy = list.find((item) => item.status === '健康')
	const healthyMinutes = Number(healthy?.minutes || 0)
	if (healthyMinutes <= 0) return false
	return list.every((item) => {
		if (item.status === '健康') return true
		return Number(item.minutes || 0) <= 0
	})
})

const onTabChange = (index) => {
	activeTabIndex.value = index
	if (index === 0 && !growthRecords.value.length) {
		resetGrowthRecords()
		loadGrowthRecords()
	}
	if (index === 1 && !albumRecords.value.length) {
		resetAlbumRecords()
		loadAlbumRecords()
	}
}

const onSeasonTabChange = (index) => {
	activeSeasonIndex.value = index
}

const mapGrowthRecordItem = (item) => {
	return {
		id: item?.id || `${Date.now()}-${Math.random()}`,
		name: item?.name || '养护记录',
		icon: item?.icon || 'checkmark-circle-fill',
		timeText: toDaysAgoText(item?.date),
		date: item?.date || '',
		content: item?.content || '已完成本次养护记录'
	}
}

const toDaysAgoText = (dateText) => {
	if (!dateText) return '今天'
	try {
		const normalized = `${dateText}`.trim().replace(/-/g, '/')
		const targetDate = new Date(normalized)
		if (Number.isNaN(targetDate.getTime())) return '今天'
		const today = new Date()
		const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
		const targetStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate())
		const diff = Math.floor((todayStart.getTime() - targetStart.getTime()) / (24 * 60 * 60 * 1000))
		if (diff <= 0) return '今天'
		return `${diff}天前`
	} catch (e) {
		return '今天'
	}
}

const resetGrowthRecords = () => {
	growthRecords.value = []
	growthRecordPageNo.value = 1
	growthRecordHasMore.value = true
}

const loadGrowthRecords = () => {
	if (growthRecordLoading.value || !growthRecordHasMore.value || !currentPlantId.value) return
	growthRecordLoading.value = true
	listPlantGrowthRecords(currentPlantId.value, growthRecordPageNo.value, growthRecordPageSize)
		.then((data) => {
			const list = Array.isArray(data?.list) ? data.list.map(mapGrowthRecordItem) : []
			if (growthRecordPageNo.value === 1) {
				growthRecords.value = list
			} else {
				growthRecords.value = growthRecords.value.concat(list)
			}
			growthRecordHasMore.value = !!data?.hasMore
			if (data?.hasMore) {
				growthRecordPageNo.value += 1
			}
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '加载记录失败',
				icon: 'none'
			})
		})
		.finally(() => {
			growthRecordLoading.value = false
		})
}

const mapAlbumRecordItem = (item) => {
	return {
		id: item?.id || `${Date.now()}-${Math.random()}`,
		date: item?.date || '',
		desc: item?.desc || '拍照记录',
		images: Array.isArray(item?.images) ? item.images.filter(Boolean) : []
	}
}

const resetAlbumRecords = () => {
	albumRecords.value = []
	albumRecordPageNo.value = 1
	albumRecordHasMore.value = true
}

const loadAlbumRecords = () => {
	if (albumRecordLoading.value || !albumRecordHasMore.value || !currentPlantId.value) return
	albumRecordLoading.value = true
	listPlantAlbumRecords(currentPlantId.value, albumRecordPageNo.value, albumRecordPageSize)
		.then((data) => {
			const list = Array.isArray(data?.list)
				? data.list.map(mapAlbumRecordItem).filter((item) => item.images.length)
				: []
			if (albumRecordPageNo.value === 1) {
				albumRecords.value = list
			} else {
				albumRecords.value = albumRecords.value.concat(list)
			}
			albumRecordHasMore.value = !!data?.hasMore
			if (data?.hasMore) {
				albumRecordPageNo.value += 1
			}
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '加载相册失败',
				icon: 'none'
			})
		})
		.finally(() => {
			albumRecordLoading.value = false
		})
}

const loadPlantStats = () => {
	if (!currentPlantId.value) return
	getPlantCareStats(currentPlantId.value)
		.then((data) => {
			statsSummary.value = {
				totalCareCount: Number(data?.totalCareCount || 0),
				photoCount: Number(data?.photoCount || 0),
				waterCount: Number(data?.waterCount || 0),
				lastCareGap: Number(data?.lastCareGap || 0),
				weekCareCount: Number(data?.weekCareCount || 0),
				wateringOutsideRecommendedCount: Number(data?.wateringOutsideRecommendedCount || 0),
				wateringTimeTip: data?.wateringTimeTip || '',
				wateringTimeDistribution: Array.isArray(data?.wateringTimeDistribution) ? data.wateringTimeDistribution : [],
				statusTimeDistribution: Array.isArray(data?.statusTimeDistribution) ? data.statusTimeDistribution : []
			}
		})
		.catch(() => {
			statsSummary.value = {
				totalCareCount: 0,
				photoCount: 0,
				waterCount: 0,
				lastCareGap: 0,
				weekCareCount: 0,
				wateringOutsideRecommendedCount: 0,
				wateringTimeTip: '',
				wateringTimeDistribution: [],
				statusTimeDistribution: []
			}
		})
}

const loadPlantMonthlyStats = () => {
	if (!currentPlantId.value) return
	getPlantMonthlyStats(currentPlantId.value, 6)
		.then((list) => {
			const rows = Array.isArray(list) ? list : []
			monthlyStats.value = rows.map((item) => {
				const monthText = `${item?.month || ''}`
				const label = /^\d{4}-\d{2}$/.test(monthText) ? `${Number(monthText.slice(5, 7))}月` : monthText
				return {
					month: monthText,
					label,
					count: Number(item?.careCount || 0)
				}
			})
		})
		.catch(() => {
			monthlyStats.value = []
		})
}

const resetCarePlanConfig = () => {
	carePlanConfig.enabled = true
	carePlanConfig.seasonalMode = false
	carePlanConfig.tasks = createTaskConfig()
	carePlanConfig.seasonTasks = {
		spring: createTaskConfig(),
		summer: createTaskConfig(),
		autumn: createTaskConfig(),
		winter: createTaskConfig()
	}
}

const seasonKeyMap = {
	SPRING: 'spring',
	SUMMER: 'summer',
	AUTUMN: 'autumn',
	WINTER: 'winter'
}

const loadCarePlan = (plantId) => {
	getCarePlanConfig(plantId)
		.then((data) => {
			resetCarePlanConfig()
			carePlanConfig.enabled = data?.enabled !== false
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

const buildCarePlanPayload = () => {
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
		const seasonApiMap = {
			spring: 'SPRING',
			summer: 'SUMMER',
			autumn: 'AUTUMN',
			winter: 'WINTER'
		}
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
		enabled: !!carePlanConfig.enabled,
		seasonalMode: !!carePlanConfig.seasonalMode,
		rules
	}
}

const onSaveCarePlan = () => {
	if (!currentPlantId.value || savingCarePlan.value) return
	savingCarePlan.value = true
	saveCarePlanConfig(currentPlantId.value, buildCarePlanPayload())
		.then(() => {
			uni.showToast({
				title: '养护计划已保存',
				icon: 'success'
			})
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '保存失败',
				icon: 'none'
			})
		})
		.finally(() => {
			savingCarePlan.value = false
		})
}

const onSelectPlanTemplate = () => {
	uni.showToast({
		title: '模版功能开发中',
		icon: 'none'
	})
}

const onShareToMoments = () => {
	// #ifdef MP-WEIXIN
	uni.showShareMenu({
		menus: ['shareAppMessage', 'shareTimeline']
	})
	// #endif
	uni.showToast({
		title: '请点击右上角分享到朋友圈',
		icon: 'none'
	})
}

const onToggleFocus = () => {
	if (currentPlant.value.focused) {
		uni.showModal({
			title: '移除需关注',
			content: `确认将「${currentPlant.value.name}」移出需关注列表吗？`,
			confirmColor: '#f56c6c',
			success: (res) => {
				if (!res.confirm) return
				clearPlantFocus(currentPlant.value.id)
					.then((data) => {
						currentPlant.value.focused = !!data?.focused
						currentPlant.value.focusReason = data?.focusReason || ''
						currentPlant.value.focusPhoto = data?.focusPhoto || ''
						currentPlant.value.focusAt = data?.focusAt || ''
						uni.showToast({
							title: '已移除需关注',
							icon: 'success'
						})
					})
					.catch((err) => {
						uni.showToast({
							title: err?.message || '移除失败',
							icon: 'none'
						})
					})
			}
		})
		return
	}
	focusForm.photo = ''
	focusForm.reason = ''
	showFocusPopup.value = true
}

const buildPlantUpdatePayload = () => {
	return {
		name: currentPlant.value.name || '',
		species: currentPlant.value.species || '',
		image: currentPlant.value.image || '',
		cultivationType: currentPlant.value.cultivationType || 'soil',
		plantingDate: currentPlant.value.plantingDate || '',
		note: currentPlant.value.note || '',
		healthStatus: resolveStatusValue(currentPlant.value.healthStatus),
		favorite: !!currentPlant.value.favorite
	}
}

const onSwitchPlantStatus = () => {
	if (switchingStatus.value) return
	uni.showActionSheet({
		itemList: plantStatusOptions.map((item) => item.label),
		success: (res) => {
			const next = plantStatusOptions[res?.tapIndex]
			if (!next) return
			const current = resolveStatusValue(currentPlant.value.healthStatus)
			if (next.value === current) return
			switchingStatus.value = true
			updatePlant(currentPlant.value.id, {
				...buildPlantUpdatePayload(),
				healthStatus: next.value
			})
				.then((data) => {
					currentPlant.value.healthStatus = data?.healthStatus || next.value
					currentPlant.value.statusLabel = data?.statusLabel || next.label
					loadPlantStats()
					uni.showToast({
						title: `已切换为${next.label}`,
						icon: 'success'
					})
				})
				.catch((err) => {
					uni.showToast({
						title: err?.message || '状态切换失败',
						icon: 'none'
					})
				})
				.finally(() => {
					switchingStatus.value = false
				})
		}
	})
}

const onPickFocusPhoto = () => {
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: ['camera', 'album'],
		success: (res) => {
			focusForm.photo = res.tempFilePaths?.[0] || ''
		}
	})
}

const onSubmitFocus = () => {
	if (!focusForm.photo) {
		uni.showToast({
			title: '请先上传图片',
			icon: 'none'
		})
		return
	}
	if (!focusForm.reason.trim()) {
		uni.showToast({
			title: '请填写备注',
			icon: 'none'
		})
		return
	}
	setPlantFocus(currentPlant.value.id, {
		photoUrl: focusForm.photo,
		reason: focusForm.reason.trim()
	})
		.then((data) => {
			currentPlant.value.focused = !!data?.focused
			currentPlant.value.focusReason = data?.focusReason || ''
			currentPlant.value.focusPhoto = data?.focusPhoto || ''
			currentPlant.value.focusAt = data?.focusAt || ''
			showFocusPopup.value = false
			uni.showToast({
				title: '已加入需关注',
				icon: 'success'
			})
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '保存失败',
				icon: 'none'
			})
		})
}

const onEditPlant = () => {
	uni.navigateTo({
		url: `/pages/plant/add?id=${currentPlant.value.id}&mode=edit`
	})
}

const onDeletePlant = () => {
	if (!currentPlant.value?.id) {
		uni.showToast({
			title: '绿植信息异常，请稍后重试',
			icon: 'none'
		})
		return
	}
	uni.showModal({
		title: '删除绿植',
		content: `确认删除「${currentPlant.value.name}」吗？`,
		confirmColor: '#f56c6c',
		success: (res) => {
			if (!res.confirm) return
			deletePlantApi(currentPlant.value.id)
				.then(() => {
					uni.showToast({
						title: '已删除',
						icon: 'success'
					})
					const payload = { id: currentPlant.value.id }
					uni.$emit('plant:deleted', payload)
					try {
						const eventChannel = typeof uni.getOpenerEventChannel === 'function'
							? uni.getOpenerEventChannel()
							: null
						if (eventChannel && typeof eventChannel.emit === 'function') {
							eventChannel.emit('plantDeleted', payload)
						}
					} catch (e) {
						// EventChannel is optional across entry paths, ignore when unavailable.
					}
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/plant/plant',
							fail: () => {
								uni.navigateBack({
									fail: () => {
										uni.reLaunch({
											url: '/pages/plant/plant'
										})
									}
								})
							}
						})
					}, 400)
				})
				.catch((err) => {
					uni.showToast({
						title: err?.message || '删除失败',
						icon: 'none'
					})
				})
		}
	})
}

onReachBottom(() => {
	if (activeTabIndex.value === 0) {
		loadGrowthRecords()
		return
	}
	if (activeTabIndex.value === 1) {
		loadAlbumRecords()
	}
})

onLoad((query) => {
	const id = Number(query?.id || 1)
	currentPlantId.value = Number.isNaN(id) ? 1 : id
	resetGrowthRecords()
	resetAlbumRecords()
	loadGrowthRecords()
	loadPlantStats()
	loadPlantMonthlyStats()
	getPlantById(currentPlantId.value)
		.then((data) => {
			currentPlantData.value = {
				...currentPlantData.value,
				...data,
				focused: !!data?.focused,
				focusReason: data?.focusReason || '',
				focusPhoto: data?.focusPhoto || '',
				focusAt: data?.focusAt || '',
				cultivationLabel: data?.cultivationType === 'water' ? '水培' : '土培'
			}
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '加载绿植失败',
				icon: 'none'
			})
		})
	loadCarePlan(currentPlantId.value)
})
</script>

<style scoped lang="scss">
	.plant-detail-page {
		min-height: 100vh;
		padding: 0 24rpx 24rpx;
		background: #f6fcf8;
	}

	.basic-info-wrap {
		display: flex;
		flex-direction: column;
		gap: 14rpx;
	}

	.plant-cover {
		width: 100%;
		height: 320rpx;
		border-radius: 18rpx;
	}

	.basic-info-content {
		padding: 4rpx 2rpx 0;
	}

	.plant-name-row {
		display: block;
	}

	.plant-title-wrap {
		display: flex;
		align-items: center;
		gap: 8rpx;
		min-width: 0;
	}

	.plant-name {
		font-size: 36rpx;
		font-weight: 700;
		color: #1f7a44;
		max-width: 320rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.focus-btn {
		padding: 6rpx 12rpx;
		font-size: 22rpx;
		flex-shrink: 0;
	}

	.action-btn--focus-active {
		background: #fff7e6;
		border-color: #ffe7ba;
		color: #d48806;
	}

	.focus-popup {
		padding: 20rpx 24rpx 26rpx;
		background: #f9fdfa;
	}

	.focus-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6rpx;
	}

	.focus-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.focus-photo-picker {
		width: 100%;
		height: 180rpx;
		border-radius: 14rpx;
		border: 1px dashed #b9e5cb;
		background: #eefbf3;
		overflow: hidden;
	}

	.focus-photo {
		width: 100%;
		height: 100%;
	}

	.focus-photo-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		font-size: 22rpx;
		color: #2f8f56;
	}

	.focus-submit-wrap {
		margin-top: 20rpx;
	}

	.action-btn-wrap {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: nowrap;
		gap: 8rpx;
		margin-top: 10rpx;
		overflow-x: auto;
		padding-bottom: 2rpx;
	}

	.action-btn {
		display: inline-flex;
		align-items: center;
		gap: 6rpx;
		padding: 8rpx 14rpx;
		border-radius: 999rpx;
		background: #eefbf3;
		border: 1px solid #d7efdf;
		font-size: 22rpx;
		font-weight: 600;
		color: #2f8f56;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.status-btn {
		min-width: 116rpx;
		justify-content: center;
	}

	.action-btn--danger {
		background: #fff3f3;
		border-color: #ffd6d6;
		color: #f56c6c;
	}

	.basic-info-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 12rpx;
		margin-top: 18rpx;
	}

	.basic-info-item {
		display: inline-flex;
		align-items: center;
		gap: 8rpx;
		padding: 10rpx 16rpx;
		border-radius: 14rpx;
		background: #ffffff;
		border: 1px solid #e6ece8;
		box-shadow: 0 2rpx 8rpx rgba(31, 49, 40, 0.04);
	}

	.info-value {
		font-size: 24rpx;
		font-weight: 500;
		color: #3d4a43;
	}

	.basic-info-item--status {
		background: #f7faf8;
	}

	.tab-wrap {
		margin-top: 18rpx;
	}

	.section-list {
		margin-top: 14rpx;
	}

	.section-card {
		margin-bottom: 12rpx;
	}

	.record-main {
		display: flex;
		align-items: flex-start;
		gap: 10rpx;
	}

	.record-icon-box {
		width: 54rpx;
		height: 54rpx;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #eefbf3;
		border: 1px solid #d7efdf;
		flex-shrink: 0;
	}

	.record-content {
		flex: 1;
	}

	.record-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.record-time {
		font-size: 22rpx;
		color: #5a6b60;
	}

	.record-action {
		font-size: 24rpx;
		color: #1f1f1f;
		font-weight: 600;
	}

	.record-note {
		display: block;
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #294f38;
		line-height: 1.5;
	}

	.records-empty,
	.records-loading,
	.records-finished {
		padding: 18rpx 0 10rpx;
		text-align: center;
		font-size: 22rpx;
		color: #8a9790;
	}

	.plan-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6rpx 0 10rpx;
	}

	.plan-save-btn {
		display: inline-flex;
		align-items: center;
		gap: 6rpx;
		padding: 6rpx 10rpx;
		font-size: 22rpx;
		color: #33c26d;
		border-radius: 999rpx;
		background: #eefbf3;
		border: 1px solid #d7efdf;
	}

	.plan-title {
		font-size: 34rpx;
		font-weight: 700;
		color: #294f38;
	}

	.plan-mode-switch {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.plan-mode-text {
		font-size: 24rpx;
		color: #294f38;
	}

	.plan-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6rpx 0;
	}

	.plan-label {
		font-size: 24rpx;
		font-weight: 500;
		color: #294f38;
	}

	.care-plan-config {
		display: flex;
		flex-direction: column;
	}

	.plan-template-row {
		display: flex;
		justify-content: flex-end;
		margin-top: 2rpx;
	}

	.plan-template-btn {
		display: inline-flex;
		align-items: center;
		gap: 6rpx;
		padding: 4rpx 8rpx;
		font-size: 22rpx;
		color: #33c26d;
		border-radius: 10rpx;
		background: #eefbf3;
	}

	.season-tabs-wrap {
		margin-top: 10rpx;
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

	.season-note {
		margin-top: 12rpx;
		font-size: 20rpx;
		color: #8a9790;
		line-height: 1.4;
	}

	.is-disabled {
		opacity: 0.5;
	}

	.album-item {
		display: block;
	}

	.album-meta {
		margin-bottom: 10rpx;
	}

	.album-date {
		font-size: 22rpx;
		color: #5a6b60;
	}

	.album-date-bottom {
		display: block;
		margin-top: 8rpx;
	}

	.album-footer {
		margin-top: 2rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 8rpx;
	}

	.album-share-btn {
		width: 46rpx;
		height: 46rpx;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #eefbf3;
		border: 1px solid #d7efdf;
	}

	.album-media-wrap {
		display: inline-block;
		max-width: 100%;
	}

	.album-desc {
		margin-top: 8rpx;
		font-size: 28rpx;
		line-height: 1.5;
		color: #294f38;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 12rpx;
	}

	.stats-item {
		grid-column: span 2;
		padding: 14rpx 10rpx;
		border-radius: 14rpx;
		background: #eefbf3;
		border: 1px solid #d7efdf;
		text-align: center;
	}

	.stats-item:nth-child(n + 4) {
		grid-column: span 3;
	}

	.stats-value {
		display: block;
		font-size: 32rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.stats-label {
		display: block;
		margin-top: 6rpx;
		font-size: 21rpx;
		color: #5a6b60;
	}

	.stats-chart-wrap {
		margin-top: 16rpx;
		padding-top: 12rpx;
		border-top: 1px solid #edf4ef;
	}

	.stats-chart-title {
		font-size: 24rpx;
		font-weight: 600;
		color: #294f38;
		margin-bottom: 10rpx;
	}

	.stats-chart {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 10rpx;
	}

	.stats-chart-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6rpx;
	}

	.stats-chart-value {
		font-size: 20rpx;
		color: #5a6b60;
	}

	.stats-chart-bar-bg {
		width: 100%;
		height: 120rpx;
		border-radius: 12rpx;
		background: #f1f8f4;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding: 6rpx;
		box-sizing: border-box;
	}

	.stats-chart-bar {
		width: 100%;
		border-radius: 8rpx;
		background: linear-gradient(180deg, #62d08f 0%, #33c26d 100%);
		min-height: 8rpx;
	}

	.stats-chart-label {
		font-size: 20rpx;
		color: #7f8f86;
	}

	.water-time-list {
		display: flex;
		flex-direction: column;
		gap: 12rpx;
	}

	.water-time-item {
		display: flex;
		flex-direction: column;
		gap: 6rpx;
	}

	.water-time-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.water-time-label {
		font-size: 22rpx;
		color: #3d4a43;
	}

	.water-time-count {
		font-size: 20rpx;
		color: #7c8b83;
	}

	.water-time-bar-bg {
		width: 100%;
		height: 16rpx;
		border-radius: 999rpx;
		background: #edf5f0;
		overflow: hidden;
	}

	.water-time-bar {
		height: 100%;
		border-radius: 999rpx;
		background: linear-gradient(90deg, #6ccf95 0%, #3ec577 100%);
		min-width: 8%;
	}

	.water-time-tip {
		margin-top: 12rpx;
		padding: 12rpx 14rpx;
		border-radius: 12rpx;
		font-size: 21rpx;
		line-height: 1.45;
		color: #3e5f4c;
		background: #edf9f1;
		border: 1px solid #d7efdf;
	}

	.water-time-tip--warn {
		color: #8a5a00;
		background: #fff7e8;
		border-color: #f8dfb0;
	}

	.health-status-list {
		display: flex;
		flex-direction: column;
		gap: 12rpx;
	}

	.health-status-item {
		display: flex;
		flex-direction: column;
		gap: 6rpx;
	}

	.health-status-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.health-status-label {
		font-size: 22rpx;
		color: #3d4a43;
	}

	.health-status-count {
		font-size: 20rpx;
		color: #7c8b83;
	}

	.health-status-bar-bg {
		width: 100%;
		height: 16rpx;
		border-radius: 999rpx;
		background: #edf5f0;
		overflow: hidden;
	}

	.health-status-bar {
		height: 100%;
		border-radius: 999rpx;
		min-width: 0;
	}

	.health-status-bar--healthy {
		background: linear-gradient(90deg, #67cc91 0%, #38bf71 100%);
	}

	.health-status-bar--sick {
		background: linear-gradient(90deg, #f08989 0%, #e05757 100%);
	}

	.health-status-bar--dormant {
		background: linear-gradient(90deg, #f3bb75 0%, #e59a3b 100%);
	}

	.health-status-bar--dead {
		background: linear-gradient(90deg, #b4bec3 0%, #8f9ca3 100%);
	}

	.health-status-bar--gifted {
		background: linear-gradient(90deg, #8eb8ff 0%, #5e8ff3 100%);
	}

	.health-status-bar--sold {
		background: linear-gradient(90deg, #b69ce8 0%, #8f72d8 100%);
	}
</style>
