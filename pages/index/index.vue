<template>
	<view class="index-page">
		<view v-if="gardenCards.length" class="garden-list">
			<up-card
				v-for="garden in gardenCards"
				:key="garden.id"
				:showHead="false"
				:showFoot="false"
				:border="false"
				margin="0"
				@click="onCardClick"
			>
				<template #body>
					<view class="card-head">
						<view class="card-head-left">
							<image class="card-thumb" :src="garden.thumb" mode="aspectFill"></image>
							<text class="card-title">{{ garden.title }}</text>
							<view v-if="garden.isDefault" class="default-badge">
								<text>默认</text>
							</view>
							<view class="action-btn" @tap.stop="onEditGardenInfo">
								<up-icon name="edit-pen" size="16" color="#33c26d"></up-icon>
								<text>编辑</text>
							</view>
						</view>
						<text class="card-sub-title">{{ garden.subTitle }}</text>
					</view>

					<image class="cover" :src="garden.image" mode="aspectFill"></image>
					<view class="card-desc">{{ garden.description }}</view>

					<view class="foot-divider">
						<view class="foot-stats">
							<view
								v-for="item in createFooterStats(garden)"
								:key="item.key"
								class="foot-item"
								@tap.stop="onFooterAction(item)"
							>
								<view class="foot-item-main">
									<up-icon :name="item.icon" size="16" :color="item.color"></up-icon>
									<text>{{ item.label }}</text>
								</view>
								<up-icon name="arrow-right" size="12" color="#7bc59a"></up-icon>
							</view>
						</view>
					</view>
				</template>
			</up-card>
		</view>
		<view v-else class="empty-garden">暂无花园，请点击右下角加号创建</view>

		<view class="floating-add-btn" @tap="onAddGarden">
			<up-icon name="plus" size="20" color="#ffffff"></up-icon>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { listCareTasks, listGardens, listPlants } from '@/api'

const SELECTED_GARDEN_KEY = 'selectedGardenId'
const SELECTED_PLANT_FILTER_KEY = 'selectedPlantFilter'

const defaultGardenInfo = {
	title: '我的莫奈花园',
	subTitle: '2020-05-15',
	thumb: 'https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
	image: 'https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
	description: '釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放'
}

const gardenCards = ref([])

const createFooterStats = (garden) => [
	{
		key: 'plant',
		icon: 'grid-fill',
		color: '#33c26d',
		label: `绿植 ${garden?.plantCount || 0}`,
		path: '/pages/plant/plant',
		mode: 'switchTab',
		gardenId: garden?.id ?? '',
		plantFilter: 'all'
	},
	{
		key: 'care',
		icon: 'heart-fill',
		color: '#33c26d',
		label: `今日养护 ${garden?.todayCareCount || 0}`,
		path: '/pages/plant/plant',
		mode: 'switchTab',
		gardenId: garden?.id ?? '',
		plantFilter: 'todo'
	},
	{
		key: 'focus',
		icon: 'warning-fill',
		color: '#33c26d',
		label: `需关注 ${garden?.focusCount || 0}`,
		path: '/pages/plant/plant',
		mode: 'switchTab',
		gardenId: garden?.id ?? '',
		plantFilter: 'focus'
	}
]

const onCardClick = () => {
	uni.showToast({
		title: '可在这里跳转花园详情页',
		icon: 'none'
	})
}

const onEditGardenInfo = () => {
	uni.navigateTo({
		url: '/pages/index/garden-edit'
	})
}

const onAddGarden = () => {
	uni.navigateTo({
		url: '/pages/index/garden-create'
	})
}

const loadCountsByGarden = () => {
	if (!gardenCards.value.length) return Promise.resolve()
	return Promise.all(
		gardenCards.value.map((garden) =>
			Promise.all([
				listPlants(undefined, garden.id),
				listCareTasks(garden.id),
				listPlants('focus', garden.id)
			]).then(([plants, tasks, focusedPlants]) => ({
				id: garden.id,
				plantCount: (plants || []).length,
				todayCareCount: (tasks || []).filter((task) => task?.offset === 0).length,
				focusCount: (focusedPlants || []).length
			}))
				.catch(() => ({
					id: garden.id,
					plantCount: 0,
					todayCareCount: 0,
					focusCount: 0
				}))
		)
	).then((rows) => {
		const map = new Map(rows.map((item) => [item.id, item]))
		gardenCards.value = gardenCards.value.map((garden) => ({
			...garden,
			plantCount: map.get(garden.id)?.plantCount || 0,
			todayCareCount: map.get(garden.id)?.todayCareCount || 0,
			focusCount: map.get(garden.id)?.focusCount || 0
		}))
	})
}

const loadGardenInfo = () => {
	listGardens()
		.then((rows) => {
			gardenCards.value = (rows || []).map((item, index) => ({
				id: item?.id || `${index}`,
				title: item?.name || defaultGardenInfo.title,
				subTitle: item?.establishedDate || defaultGardenInfo.subTitle,
				thumb: item?.thumbUrl || defaultGardenInfo.thumb,
				image: item?.coverUrl || defaultGardenInfo.image,
				description: item?.description || defaultGardenInfo.description,
				isDefault: !!item?.isDefault,
				plantCount: 0,
				todayCareCount: 0,
				focusCount: 0
			}))
			return loadCountsByGarden()
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '加载花园信息失败',
				icon: 'none'
			})
			gardenCards.value = []
		})
}

onShow(() => {
	loadGardenInfo()
})

const onFooterAction = (item) => {
	const gardenId = `${item?.gardenId ?? ''}`.trim()
	if (gardenId) {
		uni.setStorageSync(SELECTED_GARDEN_KEY, gardenId)
	}
	if (item?.plantFilter) {
		uni.setStorageSync(SELECTED_PLANT_FILTER_KEY, item.plantFilter)
	}
	if (item.mode === 'switchTab') {
		uni.switchTab({
			url: item.path,
			fail: (err) => {
				uni.showToast({
					title: err?.errMsg || 'tab 跳转失败',
					icon: 'none'
				})
			}
		})
		return
	}
	uni.navigateTo({
		url: item.path,
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
	.index-page {
		min-height: 100vh;
		padding: 20rpx 24rpx 24rpx;
		background: #f6fcf8;
	}

	.garden-list {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}

	.card-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card-head-left {
		display: flex;
		align-items: center;
		gap: 8rpx;
		min-width: 0;
	}

	.card-thumb {
		width: 56rpx;
		height: 56rpx;
		border-radius: 10rpx;
		flex-shrink: 0;
	}

	.card-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1f7a44;
		max-width: 210rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.default-badge {
		padding: 4rpx 10rpx;
		border-radius: 999rpx;
		background: #eaf9f0;
		border: 1px solid #d7efdf;
		font-size: 20rpx;
		color: #2f8f56;
		flex-shrink: 0;
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
		flex-shrink: 0;
	}

	.card-sub-title {
		font-size: 22rpx;
		color: #7a8a82;
		flex-shrink: 0;
		margin-left: 8rpx;
	}

	.cover {
		width: 100%;
		height: 320rpx;
		border-radius: 12rpx;
		margin-top: 16rpx;
	}

	.card-desc {
		margin-top: 14rpx;
		font-size: 24rpx;
		color: #5a6b60;
		line-height: 1.6;
	}

	.foot-divider {
		margin-top: 18rpx;
		padding-top: 16rpx;
		border-top: 1px solid #eef4f0;
	}

	.foot-stats {
		display: flex;
		align-items: center;
		flex: 1;
		gap: 12rpx;
		min-width: 0;
	}

	.foot-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		gap: 8rpx;
		padding: 12rpx 12rpx;
		border-radius: 999rpx;
		border: 1px solid #d8f0e1;
		background-color: #f1faf4;
		font-size: 24rpx;
		font-weight: 500;
		color: #2f8f56;
		line-height: 1;
	}

	.foot-item-main {
		display: flex;
		align-items: center;
		gap: 8rpx;
		min-width: 0;
	}

	.foot-item text {
		white-space: nowrap;
	}

	.floating-add-btn {
		position: fixed;
		right: 30rpx;
		bottom: 120rpx;
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #33c26d;
		box-shadow: 0 12rpx 26rpx rgba(51, 194, 109, 0.35);
		z-index: 99;
	}

	.empty-garden {
		margin-top: 40rpx;
		font-size: 24rpx;
		color: #8ea096;
		text-align: center;
	}

</style>