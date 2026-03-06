<template>
	<view class="plant-page" :style="{ paddingTop: `${navMetrics.navBarHeight + 12}px` }">
		<view class="custom-nav">
			<view
				class="custom-nav-inner"
				:style="{
					marginTop: `${navMetrics.statusBarHeight}px`,
					height: `${navMetrics.contentBarHeight}px`
				}"
			>
				<view class="custom-nav-home" @tap="goIndexPage">
					<up-icon name="home" size="14" color="#33c26d"></up-icon>
					<text>首页</text>
				</view>
				<text class="custom-nav-title">绿植</text>
			</view>
		</view>
		<view class="page-header">
			<view class="title-row">
				<view class="page-title">{{ gardenTitle }}</view>
				<view class="add-plant-btn" @tap="onAddPlant">
					<up-icon name="plus" size="16" color="#33c26d"></up-icon>
					<text>添加</text>
				</view>
			</view>
			<view class="page-subtitle">{{ gardenDescription }}</view>
		</view>

		<view class="filter-wrap">
			<up-subsection
				:list="plantFilterTabs"
				:current="activePlantFilterIndex"
				mode="button"
				activeColor="#33c26d"
				inactiveColor="#5a6b60"
				bgColor="#eaf9f0"
				@change="onPlantFilterChange"
			></up-subsection>
		</view>

		<view v-if="filteredPlantList.length" class="waterfall-grid">
			<view class="waterfall-col">
				<view
					v-for="item in leftColumnPlants"
					:key="item.id"
					class="plant-card"
					@tap="onPlantCardClick(item)"
				>
					<view class="plant-cover" :style="{ height: `${item.coverHeight}rpx` }">
						<image class="plant-cover-image" :src="item.image" mode="aspectFill"></image>
						<view class="plant-cover-badge">
							<text class="status-tag" :class="`status-${item.healthStatus}`">{{ item.statusLabel }}</text>
							<text class="days-chip">第 {{ item.days }} 天</text>
						</view>
					</view>
					<view class="plant-content">
						<view v-if="item.todayCareTasks.length" class="care-task-list">
							<text
								v-for="task in item.todayCareTasks.slice(0, 3)"
								:key="`${item.id}-${task}`"
								class="care-task-tag"
							>{{ task }}</text>
							<text v-if="item.todayCareTasks.length > 3" class="care-task-tag">+{{ item.todayCareTasks.length - 3 }}</text>
						</view>
						<view class="plant-name-row">
							<view class="plant-name">{{ item.name }}</view>
							<up-icon v-if="item.focused" name="warning-fill" size="15" color="#f5b301"></up-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="waterfall-col">
				<view
					v-for="item in rightColumnPlants"
					:key="item.id"
					class="plant-card"
					@tap="onPlantCardClick(item)"
				>
					<view class="plant-cover" :style="{ height: `${item.coverHeight}rpx` }">
						<image class="plant-cover-image" :src="item.image" mode="aspectFill"></image>
						<view class="plant-cover-badge">
							<text class="status-tag" :class="`status-${item.healthStatus}`">{{ item.statusLabel }}</text>
							<text class="days-chip">第 {{ item.days }} 天</text>
						</view>
					</view>
					<view class="plant-content">
						<view v-if="item.todayCareTasks.length" class="care-task-list">
							<text
								v-for="task in item.todayCareTasks.slice(0, 3)"
								:key="`${item.id}-${task}`"
								class="care-task-tag"
							>{{ task }}</text>
							<text v-if="item.todayCareTasks.length > 3" class="care-task-tag">+{{ item.todayCareTasks.length - 3 }}</text>
						</view>
						<view class="plant-name-row">
							<view class="plant-name">{{ item.name }}</view>
							<up-icon v-if="item.focused" name="warning-fill" size="15" color="#f5b301"></up-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="empty-plant">暂无绿植</view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app'
import { listCareTasks, listGardens, listPlants } from '@/api'

const SELECTED_GARDEN_KEY = 'selectedGardenId'
const SELECTED_PLANT_FILTER_KEY = 'selectedPlantFilter'
const navMetrics = ref(resolveNavMetrics())

function resolveNavMetrics() {
	const systemInfo = uni.getSystemInfoSync ? uni.getSystemInfoSync() : {}
	const statusBarHeight = Number(systemInfo.statusBarHeight || 20)
	let capsuleHeight = 32
	let gap = 6
	try {
		const menu = uni.getMenuButtonBoundingClientRect ? uni.getMenuButtonBoundingClientRect() : null
		if (menu && menu.top && menu.height && menu.left) {
			capsuleHeight = menu.height
			gap = Math.max(4, menu.top - statusBarHeight)
		}
	} catch (e) {}
	const navBarHeight = Math.max(statusBarHeight + capsuleHeight + gap * 2, statusBarHeight + 44)
	return {
		statusBarHeight,
		navBarHeight,
		contentBarHeight: navBarHeight - statusBarHeight
	}
}

const plantFilterTabs = ['全部', '健康', '异常', '今日待呵护', '关注']
const activePlantFilterIndex = ref(0)
const greenPlantList = ref([])
const latestLoadToken = ref(0)
const scopedGardenId = ref('')
const gardenTitle = ref('我的绿植花园')
const gardenDescription = ref('记录每一株生命的成长状态')

const filterMap = {
	0: 'all',
	1: 'healthy',
	2: 'abnormal',
	3: 'todo',
	4: 'focus'
}
const reverseFilterMap = {
	all: 0,
	healthy: 1,
	abnormal: 2,
	todo: 3,
	focus: 4
}

const readSelectedGardenId = () => `${uni.getStorageSync(SELECTED_GARDEN_KEY) || ''}`.trim()
const readSelectedPlantFilter = () => `${uni.getStorageSync(SELECTED_PLANT_FILTER_KEY) || ''}`.trim().toLowerCase()

const toCard = (item, index) => ({
	...item,
	coverHeight: 190 + (index % 4) * 20,
	focused: !!item.focused,
	focusReason: item.focusReason || '',
	todayCareTasks: item.todayCareTasks || [],
	image: item.image || '/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg',
	statusLabel: item.statusLabel || '健康',
	healthStatus: item.healthStatus || 'healthy',
	days: item.days || 1
})

const filteredPlantList = computed(() => greenPlantList.value)
const leftColumnPlants = computed(() => filteredPlantList.value.filter((_, index) => index % 2 === 0))
const rightColumnPlants = computed(() => filteredPlantList.value.filter((_, index) => index % 2 === 1))

const isHealthyPlant = (plant) => {
	const status = `${plant?.healthStatus || ''}`.toLowerCase()
	if (status) return status === 'healthy' || status === '健康'
	return `${plant?.statusLabel || ''}`.trim() === '健康'
}

const isAbnormalPlant = (plant) => {
	const status = `${plant?.healthStatus || ''}`.toLowerCase()
	if (status) return ['sick', 'dormant', '生病', '休眠'].includes(status)
	const label = `${plant?.statusLabel || ''}`.trim()
	return label === '生病' || label === '休眠'
}

const filterPlantCardsByKey = (cards, filterKey) => {
	if (!Array.isArray(cards)) return []
	if (filterKey === 'healthy') return cards.filter((item) => isHealthyPlant(item))
	if (filterKey === 'abnormal') return cards.filter((item) => isAbnormalPlant(item))
	if (filterKey === 'todo') return cards.filter((item) => (item?.todayCareTasks || []).length > 0)
	if (filterKey === 'focus') return cards.filter((item) => !!item?.focused)
	return cards
}

const buildTodayCareTaskMap = (tasks) => {
	const map = {}
	;(tasks || []).forEach((task) => {
		const plantName = `${task?.plantName || ''}`.trim()
		if (!plantName) return
		const isToday = Number(task?.offset) === 0
		const pending = !task?.completed
		if (!isToday || !pending) return
		if (!map[plantName]) map[plantName] = []
		const label = `${task?.name || ''}`.trim() || '待养护'
		map[plantName].push(label)
	})
	return map
}

const loadPlants = async () => {
	const token = ++latestLoadToken.value
	const filter = filterMap[activePlantFilterIndex.value] || 'all'
	const requestFilter = filter === 'todo' || filter === 'all' ? undefined : filter
	greenPlantList.value = []
	Promise.all([
		listPlants(requestFilter, scopedGardenId.value || undefined),
		listCareTasks(scopedGardenId.value || undefined).catch(() => [])
	])
		.then(([list, tasks]) => {
			if (token !== latestLoadToken.value) return
			const todayTaskMap = buildTodayCareTaskMap(tasks || [])
			const cards = (list || []).map((item, index) => {
				const card = toCard(item, index)
				const taskByName = todayTaskMap[`${card?.name || ''}`.trim()] || []
				card.todayCareTasks = taskByName.length ? taskByName : (card.todayCareTasks || [])
				return card
			})
			greenPlantList.value = filterPlantCardsByKey(cards, filter)
		})
		.catch((err) => {
			if (token !== latestLoadToken.value) return
			uni.showToast({
				title: err?.message || '加载绿植失败',
				icon: 'none'
			})
		})
}

const loadCurrentGardenMeta = () => {
	return listGardens()
		.then((rows) => {
			const gardens = rows || []
			if (!gardens.length) {
				gardenTitle.value = '我的绿植花园'
				gardenDescription.value = '记录每一株生命的成长状态'
				return
			}
			const selectedId = `${scopedGardenId.value || readSelectedGardenId()}`.trim()
			const selectedGarden = gardens.find((item) => `${item?.id ?? ''}` === selectedId)
			const defaultGarden = gardens.find((item) => !!item?.isDefault)
			const targetGarden = selectedGarden || defaultGarden || gardens[0]
			const targetId = `${targetGarden?.id ?? ''}`.trim()
			if (targetId) {
				scopedGardenId.value = targetId
				uni.setStorageSync(SELECTED_GARDEN_KEY, targetId)
			}
			gardenTitle.value = targetGarden?.name || '我的绿植花园'
			gardenDescription.value = targetGarden?.description || '记录每一株生命的成长状态'
		})
		.catch(() => {
			gardenTitle.value = '我的绿植花园'
			gardenDescription.value = '记录每一株生命的成长状态'
		})
}

const onPlantFilterChange = (index) => {
	activePlantFilterIndex.value = index
	loadPlants()
}

const onPlantCardClick = (item) => {
	uni.navigateTo({
		url: `/pages/plant/detail?id=${item.id}`,
		events: {
			plantDeleted: (payload) => {
				handlePlantDeleted(payload)
			}
		},
		fail: (err) => {
			uni.showToast({
				title: err?.errMsg || '页面跳转失败',
				icon: 'none'
			})
		}
	})
}

const onAddPlant = () => {
	uni.navigateTo({
		url: '/pages/plant/add',
		fail: (err) => {
			uni.showToast({
				title: err?.errMsg || '页面跳转失败',
				icon: 'none'
			})
		}
	})
}

const goIndexPage = () => {
	uni.reLaunch({
		url: '/pages/index/index',
		fail: () => {
			uni.redirectTo({
				url: '/pages/index/index'
			})
		}
	})
}

const handlePlantDeleted = (payload) => {
	const deletedId = Number(payload?.id || 0)
	if (deletedId) {
		greenPlantList.value = greenPlantList.value.filter((item) => Number(item.id) !== deletedId)
	}
	loadPlants()
}

onShow(() => {
	uni.$off('plant:deleted', handlePlantDeleted)
	uni.$on('plant:deleted', handlePlantDeleted)
	const selectedGardenId = readSelectedGardenId()
	if (selectedGardenId || !scopedGardenId.value) {
		scopedGardenId.value = selectedGardenId
	}
	const selectedFilter = readSelectedPlantFilter()
	if (reverseFilterMap[selectedFilter] !== undefined) {
		activePlantFilterIndex.value = reverseFilterMap[selectedFilter]
		uni.removeStorageSync(SELECTED_PLANT_FILTER_KEY)
	}
	loadCurrentGardenMeta().finally(() => {
		loadPlants()
	})
})

onLoad((query) => {
	const filterKey = `${query?.filter || ''}`.toLowerCase()
	if (reverseFilterMap[filterKey] !== undefined) {
		activePlantFilterIndex.value = reverseFilterMap[filterKey]
	}
	const gardenId = `${query?.gardenId || ''}`.trim()
	if (gardenId) {
		scopedGardenId.value = gardenId
		uni.setStorageSync(SELECTED_GARDEN_KEY, gardenId)
	} else {
		scopedGardenId.value = readSelectedGardenId()
	}
})

onUnload(() => {
	uni.$off('plant:deleted', handlePlantDeleted)
})
</script>

<style scoped lang="scss">
	.plant-page {
		min-height: 100vh;
		padding: 24rpx;
		background-color: #f6fcf8;
	}

	.custom-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 120;
		background: #f6fcf8;
	}

	.custom-nav-inner {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		box-sizing: border-box;
	}

	.custom-nav-home {
		position: absolute;
		left: 24rpx;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		gap: 6rpx;
		padding: 6rpx 12rpx;
		height: 44rpx;
		border-radius: 999rpx;
		background: #ffffff;
		border: 1px solid #d9d9d9;
		font-size: 20rpx;
		font-weight: 600;
		color: #1f1f1f;
		box-sizing: border-box;
	}

	.custom-nav-title {
		font-size: 32rpx;
		line-height: 44rpx;
		font-weight: 600;
		color: #1f1f1f;
		text-align: center;
	}

	.page-header {
		margin-bottom: 20rpx;
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.page-title {
		font-size: 40rpx;
		font-weight: 600;
		color: #1f7a44;
	}

	.add-plant-btn {
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
		flex-shrink: 0;
	}

	.page-subtitle {
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #5a6b60;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.filter-wrap {
		margin-bottom: 20rpx;
	}

	.plant-card {
		margin-bottom: 14rpx;
		border-radius: 24rpx;
		background-color: #fff;
		overflow: hidden;
		border: 1px solid #e4f3ea;
		box-shadow: 0 10rpx 30rpx rgba(34, 137, 78, 0.1);
	}

	.waterfall-grid {
		display: flex;
		align-items: flex-start;
		gap: 14rpx;
	}

	.waterfall-col {
		flex: 1;
		min-width: 0;
	}

	.plant-cover {
		width: 100%;
		position: relative;
		background: linear-gradient(135deg, #dff5e7 0%, #eaf9f0 100%);
	}

	.plant-cover-image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.plant-content {
		padding: 12rpx 14rpx 14rpx;
		background: #ffffff;
		border-top: 1px solid #eef4f0;
	}

	.plant-cover-badge {
		position: absolute;
		top: 12rpx;
		right: 12rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 6rpx;
	}

	.status-tag {
		padding: 3rpx 9rpx;
		border-radius: 999rpx;
		font-size: 16rpx;
		font-weight: 500;
	}

	.status-healthy {
		color: #1f7a44;
		background-color: #e7f8ed;
	}

	.status-sick {
		color: #cc6e00;
		background-color: #fff3df;
	}

	.status-dormant {
		color: #6b7d73;
		background-color: #edf2ef;
	}

	.status-dead {
		color: #7c4a4a;
		background-color: #f8ecec;
	}

	.days-chip {
		padding: 3rpx 9rpx;
		border-radius: 999rpx;
		font-size: 16rpx;
		color: #294f38;
		background-color: rgba(255, 255, 255, 0.88);
	}

	.plant-name {
		margin-top: 12rpx;
		font-size: 28rpx;
		font-weight: 600;
		color: #294f38;
	}

	.plant-name-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8rpx;
		margin-top: 6rpx;
	}

	.care-task-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8rpx;
		margin-top: 2rpx;
	}

	.care-task-tag {
		padding: 2rpx 10rpx;
		border-radius: 999rpx;
		font-size: 20rpx;
		color: #2f8f56;
		background-color: #f2fbf5;
		border: 1px solid #d7efdf;
	}

	.empty-plant {
		margin-top: 60rpx;
		font-size: 24rpx;
		color: #8ea096;
		text-align: center;
	}
</style>
