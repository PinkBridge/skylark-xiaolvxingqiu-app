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
								<view class="favorite-btn" @tap="onToggleFavorite">
									<up-icon
										:name="currentPlant.isFavorite ? 'star-fill' : 'star'"
										size="18"
										:color="currentPlant.isFavorite ? '#f5b301' : '#b8c2bd'"
									></up-icon>
								</view>
							</view>
							<view class="action-btn-wrap">
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
								<up-icon :name="infoItem.icon" size="14" color="#33c26d"></up-icon>
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
								<up-icon :name="record.icon" size="16" color="#33c26d"></up-icon>
							</view>
							<view class="record-content">
								<view class="record-head">
									<text class="record-action">{{ record.name }}</text>
									<text class="record-time">第 {{ record.day }} 天</text>
								</view>
								<text class="record-note">{{ record.content }}</text>
							</view>
						</view>
					</view>
				</template>
			</up-card>
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
								<text class="album-date album-date-bottom">{{ photo.date }}</text>
								<view class="album-share-btn" @tap="onShareToMoments(photo)">
									<up-icon name="share-fill" size="16" color="#33c26d"></up-icon>
								</view>
							</view>
						</view>
					</view>
				</template>
			</up-card>
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
									size="20"
									activeColor="#33c26d"
								></up-switch>
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
							<text class="stats-value">{{ statsSummary.lastCareGap }}</text>
							<text class="stats-label">距上次养护(天)</text>
						</view>
						<view class="stats-item">
							<text class="stats-value">{{ statsSummary.healthScore }}</text>
							<text class="stats-label">健康评分</text>
						</view>
					</view>
				</template>
			</up-card>
		</view>
	</view>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const detailTabs = ['生长记录', '植物相册', '养护计划', '统计分析']
const activeTabIndex = ref(0)
const currentPlantId = ref(1)

const plantBaseList = ref([
	{ id: 1, name: '常春藤', statusLabel: '健康', days: 28, cultivationLabel: '土培', image: '/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg', isFavorite: true },
	{ id: 2, name: '龟背竹', statusLabel: '生病', days: 13, cultivationLabel: '水培', image: '/static/flower/b22cd3cf854015e988176e17dab8a554.jpg', isFavorite: false },
	{ id: 3, name: '多肉白牡丹', statusLabel: '健康', days: 41, cultivationLabel: '土培', image: '/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg', isFavorite: true },
	{ id: 4, name: '发财树', statusLabel: '休眠', days: 6, cultivationLabel: '土培', image: '/static/flower/e0c65131708dbcea21fdb5a99a157ac4.jpg', isFavorite: false },
	{ id: 5, name: '绿萝', statusLabel: '健康', days: 17, cultivationLabel: '水培', image: '/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg', isFavorite: true },
	{ id: 6, name: '虎皮兰', statusLabel: '健康', days: 52, cultivationLabel: '土培', image: '/static/flower/b22cd3cf854015e988176e17dab8a554.jpg', isFavorite: false },
	{ id: 7, name: '琴叶榕', statusLabel: '死亡', days: 9, cultivationLabel: '土培', image: '/static/flower/4f068b19d4225040f35079b570587bfe.jpg', isFavorite: false },
	{ id: 8, name: '吊兰', statusLabel: '健康', days: 35, cultivationLabel: '水培', image: '/static/flower/b22cd3cf854015e988176e17dab8a554.jpg', isFavorite: true }
])

const growthRecordMap = {
	1: [
		{
			id: '1-1',
			icon: '/static/icon/water.png',
			name: '浇水',
			day: 28,
			content: '土壤偏干，补水约 180ml。'
		},
		{
			id: '1-2',
			icon: '/static/icon/prune.png',
			name: '修剪',
			day: 25,
			content: '修剪底部老叶，促进新芽生长。'
		},
		{
			id: '1-3',
			icon: '/static/icon/fertilize.png',
			name: '施肥',
			day: 21,
			content: '补充一次稀释营养液。'
		},
		{
			id: '1-4',
			icon: '/static/icon/loosen.png',
			name: '松土',
			day: 18,
			content: '疏松土壤，促进根系呼吸。'
		},
		{
			id: '1-5',
			icon: '/static/icon/repot.png',
			name: '换盆',
			day: 15,
			content: '更换新的盆土，促进生长。'
		},
		{
			id: '1-6',
			icon: '/static/icon/pest.png',
			name: '病虫害',
			day: 12,
			content: '发现蚜虫，喷洒杀虫剂。'
		},
		{
			id: '1-7',
			icon: '/static/icon/measure.png',
			name: '测量',
			day: 9,
			content: '测量植株高度，调整光照。'
		},
		{
			id: '1-8',
			icon: '/static/icon/photo.png',
			name: '拍照',
			day: 6,
			content: '拍摄植株照片，记录生长状态。'
		},
	]
}

const photoRecordMap = {
	1: [
		{
			id: '1-p1',
			date: '2026-02-25',
			desc: '新芽冒出与叶片状态记录',
			images: [
				'/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg',
				'/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg',
				'/static/flower/b22cd3cf854015e988176e17dab8a554.jpg',
				'/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg',
				'/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg',
				'/static/flower/b22cd3cf854015e988176e17dab8a554.jpg',
				'/static/flower/e0c65131708dbcea21fdb5a99a157ac4.jpg',
				'/static/flower/4f068b19d4225040f35079b570587bfe.jpg',
				'/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg',
				'/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg',
				'/static/flower/b22cd3cf854015e988176e17dab8a554.jpg'
			]
		},
		{
			id: '1-p3',
			date: '2026-02-25',
			desc: '新芽冒出与叶片状态记录',
			images: [
				'/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg',
				'/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg',
				'/static/flower/b22cd3cf854015e988176e17dab8a554.jpg',
				'/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg',
				'/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg',
				'/static/flower/b22cd3cf854015e988176e17dab8a554.jpg',
				'/static/flower/e0c65131708dbcea21fdb5a99a157ac4.jpg',
				'/static/flower/4f068b19d4225040f35079b570587bfe.jpg',
				'/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg',
				'/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg',
				'/static/flower/b22cd3cf854015e988176e17dab8a554.jpg'
			]
		},	
		{
			id: '1-p2',
			date: '2026-02-19',
			desc: '叶片展开过程对比',
			images: [
				'/static/flower/e0c65131708dbcea21fdb5a99a157ac4.jpg',
				'/static/flower/4f068b19d4225040f35079b570587bfe.jpg'
			]
		}
	]
}

const statsMap = {
	1: { totalCareCount: 36, photoCount: 12, lastCareGap: 1, healthScore: '92' }
}

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

const createTaskConfig = (defaultDays) => {
	return careTaskOptions.reduce((acc, task) => {
		acc[task.key] = { enabled: true, intervalDays: defaultDays }
		return acc
	}, {})
}

const carePlanConfig = reactive({
	enabled: true,
	intervalDays: '3',
	seasonalMode: false,
	tasks: createTaskConfig('3'),
	seasonTasks: {
		spring: createTaskConfig('3'),
		summer: createTaskConfig('2'),
		autumn: createTaskConfig('3'),
		winter: createTaskConfig('5')
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

const currentPlant = computed(() => {
	return plantBaseList.value.find((item) => item.id === currentPlantId.value) || plantBaseList.value[0]
})

const basicInfoItems = computed(() => {
	return [
		{ key: 'days', icon: 'clock-fill', value: `第 ${currentPlant.value.days} 天` },
		{ key: 'cultivation', icon: 'grid-fill', value: currentPlant.value.cultivationLabel },
		{ key: 'status', icon: 'checkmark-circle-fill', value: currentPlant.value.statusLabel }
	]
})

const growthRecords = computed(() => {
	return growthRecordMap[currentPlantId.value] || growthRecordMap[1]
})

const photoRecords = computed(() => {
	return photoRecordMap[currentPlantId.value] || photoRecordMap[1]
})

const statsSummary = computed(() => {
	return statsMap[currentPlantId.value] || statsMap[1]
})

const currentTaskPlanMap = computed(() => {
	if (!carePlanConfig.seasonalMode) return carePlanConfig.tasks
	return carePlanConfig.seasonTasks[currentSeasonKey.value]
})

const onTabChange = (index) => {
	activeTabIndex.value = index
}

const onSeasonTabChange = (index) => {
	activeSeasonIndex.value = index
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

const onToggleFavorite = () => {
	currentPlant.value.isFavorite = !currentPlant.value.isFavorite
	uni.showToast({
		title: currentPlant.value.isFavorite ? '已关注该绿植' : '已取消关注',
		icon: 'none'
	})
}

const onEditPlant = () => {
	uni.navigateTo({
		url: `/pages/plant/add?id=${currentPlant.value.id}&mode=edit`
	})
}

const onDeletePlant = () => {
	uni.showModal({
		title: '删除绿植',
		content: `确认删除「${currentPlant.value.name}」吗？`,
		confirmColor: '#f56c6c',
		success: (res) => {
			if (!res.confirm) return
			uni.showToast({
				title: '已删除',
				icon: 'success'
			})
			setTimeout(() => {
				uni.navigateBack()
			}, 400)
		}
	})
}

onLoad((query) => {
	const id = Number(query?.id || 1)
	currentPlantId.value = Number.isNaN(id) ? 1 : id
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
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12rpx;
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

	.favorite-btn {
		width: 40rpx;
		height: 40rpx;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f7f9f8;
		flex-shrink: 0;
	}

	.action-btn-wrap {
		display: flex;
		align-items: center;
		gap: 8rpx;
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
	}

	.action-btn--danger {
		background: #fff3f3;
		border-color: #ffd6d6;
		color: #f56c6c;
	}

	.basic-info-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 10rpx;
		margin-top: 16rpx;
	}

	.basic-info-item {
		display: inline-flex;
		align-items: center;
		gap: 6rpx;
		padding: 8rpx 14rpx;
		border-radius: 999rpx;
		background: #eefbf3;
		border: 1px solid #d7efdf;
	}

	.info-value {
		font-size: 24rpx;
		font-weight: 600;
		color: #294f38;
	}

	.basic-info-item--status {
		background: #e7f8ed;
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

	.plan-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6rpx 0 10rpx;
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
		font-size: 24rpx;
		color: #294f38;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12rpx;
	}

	.stats-item {
		padding: 14rpx 10rpx;
		border-radius: 14rpx;
		background: #eefbf3;
		border: 1px solid #d7efdf;
		text-align: center;
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
</style>
