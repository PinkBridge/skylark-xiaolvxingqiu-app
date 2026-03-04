<template>
	<view class="plant-page">
		<view class="page-header">
			<view class="title-row">
			<view class="page-title">我的绿植花园</view>
				<view class="add-plant-btn" @tap="onAddPlant">
					<up-icon name="plus" size="16" color="#33c26d"></up-icon>
					<text>添加</text>
				</view>
			</view>
			<view class="page-subtitle">记录每一株生命的成长状态shadbjashdbashd</view>
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

		<up-waterfall :modelValue="filteredPlantList" idKey="id" :addTime="80">
			<template #column="{ colList }">
				<view
					v-for="item in colList"
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
							<up-icon v-if="item.isFavorite" name="star-fill" size="15" color="#f5b301"></up-icon>
						</view>
					</view>
				</view>
			</template>
		</up-waterfall>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue'

const plantFilterTabs = ['全部', '健康', '异常', '今日待呵护', '关注']
const activePlantFilterIndex = ref(0)

const greenPlantList = ref([
	{
		id: 1,
		name: '常春藤',
		healthStatus: 'healthy',
		statusLabel: '健康',
		days: 28,
		coverHeight: 210,
		isFavorite: true,
		todayCareTasks: ['浇水', '拍照'],
		image: '/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg'
	},
	{
		id: 2,
		name: '龟背竹',
		healthStatus: 'sick',
		statusLabel: '生病',
		days: 13,
		coverHeight: 260,
		isFavorite: false,
		todayCareTasks: ['施肥', '除虫害', '测量'],
		image: '/static/flower/b22cd3cf854015e988176e17dab8a554.jpg'
	},
	{
		id: 3,
		name: '多肉白牡丹',
		healthStatus: 'healthy',
		statusLabel: '健康',
		days: 41,
		coverHeight: 190,
		isFavorite: true,
		todayCareTasks: [],
		image: '/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg'
	},
	{
		id: 4,
		name: '发财树',
		healthStatus: 'dormant',
		statusLabel: '休眠',
		days: 6,
		coverHeight: 300,
		isFavorite: false,
		todayCareTasks: ['修剪', '笔记'],
		image: '/static/flower/e0c65131708dbcea21fdb5a99a157ac4.jpg'
	},
	{
		id: 5,
		name: '绿萝',
		healthStatus: 'healthy',
		statusLabel: '健康',
		days: 17,
		coverHeight: 230,
		isFavorite: true,
		todayCareTasks: ['浇水', '施肥', '换盆', '测量'],
		image: '/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg'
	},
	{
		id: 6,
		name: '虎皮兰',
		healthStatus: 'healthy',
		statusLabel: '健康',
		days: 52,
		coverHeight: 270,
		isFavorite: false,
		todayCareTasks: [],
		image: '/static/flower/b22cd3cf854015e988176e17dab8a554.jpg'
	},
	{
		id: 7,
		name: '琴叶榕',
		healthStatus: 'dead',
		statusLabel: '死亡',
		days: 9,
		coverHeight: 220,
		isFavorite: false,
		todayCareTasks: ['笔记'],
		image: '/static/flower/4f068b19d4225040f35079b570587bfe.jpg'
	},
	{
		id: 8,
		name: '吊兰',
		healthStatus: 'healthy',
		statusLabel: '健康',
		days: 35,
		coverHeight: 250,
		isFavorite: true,
		todayCareTasks: ['拍照'],
		image: '/static/flower/b22cd3cf854015e988176e17dab8a554.jpg'
	}
])

const abnormalPlantStatuses = ['sick', 'dormant', 'dead']
const filteredPlantList = computed(() => {
	switch (activePlantFilterIndex.value) {
		case 1:
			return greenPlantList.value.filter((item) => item.healthStatus === 'healthy')
		case 2:
			return greenPlantList.value.filter((item) => abnormalPlantStatuses.includes(item.healthStatus))
		case 3:
			return greenPlantList.value.filter((item) => item.todayCareTasks.length > 0)
		case 4:
			return greenPlantList.value.filter((item) => item.isFavorite)
		default:
			return greenPlantList.value
	}
})

const onPlantFilterChange = (index) => {
	activePlantFilterIndex.value = index
}

const onPlantCardClick = (item) => {
	uni.navigateTo({
		url: `/pages/plant/detail?id=${item.id}`,
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
</script>

<style scoped lang="scss">
	.plant-page {
		min-height: 100vh;
		padding: 24rpx;
		background-color: #f6fcf8;
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
</style>
