<template>
	<view class="favorites-page">
		<view v-if="loading" class="state-tip">加载中...</view>
		<view v-else-if="!favorites.length" class="state-tip">暂无收藏记录</view>
		<view v-else class="favorite-list">
			<view v-for="item in favorites" :key="item.id" class="favorite-card">
				<image class="favorite-image" :src="pickImage(item)" mode="aspectFill"></image>
				<view class="favorite-content">
					<view class="favorite-name">{{ item.name || '未知植物' }}</view>
					<view class="favorite-desc">{{ item.description || '暂无描述' }}</view>
					<view class="favorite-meta">
						<text>收藏于 {{ item.createdAt || '-' }}</text>
					</view>
					<view class="favorite-actions">
						<button class="ghost-btn" @tap="onDelete(item)">删除</button>
						<button class="primary-btn" @tap="onAddToGarden(item)">加入花园</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { addAiCollectionToGarden, deleteAiCollection, listAiCollections } from '@/api'

const favorites = ref([])
const loading = ref(false)
const actionId = ref('')

const pickImage = (item) => `${item?.imageUrl || item?.recognizedImageUrl || '/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg'}`

const loadFavorites = () => {
	loading.value = true
	listAiCollections()
		.then((rows) => {
			favorites.value = rows || []
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '加载收藏失败',
				icon: 'none'
			})
			favorites.value = []
		})
		.finally(() => {
			loading.value = false
		})
}

const onDelete = (item) => {
	const id = `${item?.id || ''}`.trim()
	if (!id) return
	uni.showModal({
		title: '提示',
		content: '确认删除这条收藏吗？',
		success: (res) => {
			if (!res.confirm) return
			actionId.value = id
			deleteAiCollection(id)
				.then(() => {
					uni.showToast({
						title: '已删除',
						icon: 'none'
					})
					favorites.value = favorites.value.filter((row) => `${row?.id || ''}` !== id)
				})
				.catch((err) => {
					uni.showToast({
						title: err?.message || '删除失败',
						icon: 'none'
					})
				})
				.finally(() => {
					actionId.value = ''
				})
		}
	})
}

const onAddToGarden = (item) => {
	const id = `${item?.id || ''}`.trim()
	if (!id || actionId.value === id) return
	actionId.value = id
	addAiCollectionToGarden(id)
		.then(() => {
			uni.showToast({
				title: '已加入花园',
				icon: 'none'
			})
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '加入花园失败',
				icon: 'none'
			})
		})
		.finally(() => {
			actionId.value = ''
		})
}

onShow(() => {
	loadFavorites()
})
</script>

<style scoped lang="scss">
.favorites-page {
	min-height: 100vh;
	padding: 24rpx;
	background: #f6fcf8;
}

.state-tip {
	margin-top: 80rpx;
	text-align: center;
	color: #8ea096;
	font-size: 26rpx;
}

.favorite-list {
	display: flex;
	flex-direction: column;
	gap: 18rpx;
}

.favorite-card {
	display: flex;
	gap: 14rpx;
	padding: 14rpx;
	border-radius: 16rpx;
	background: #ffffff;
	border: 1px solid #e4f3ea;
}

.favorite-image {
	width: 180rpx;
	height: 180rpx;
	border-radius: 12rpx;
	background: #eefbf3;
	flex-shrink: 0;
}

.favorite-content {
	flex: 1;
	min-width: 0;
}

.favorite-name {
	font-size: 30rpx;
	font-weight: 700;
	color: #1f7a44;
}

.favorite-desc {
	margin-top: 8rpx;
	font-size: 24rpx;
	line-height: 1.6;
	color: #5a6b60;
	max-height: 112rpx;
	overflow: hidden;
}

.favorite-meta {
	margin-top: 10rpx;
	font-size: 20rpx;
	color: #8ea096;
}

.favorite-actions {
	margin-top: 12rpx;
	display: flex;
	gap: 12rpx;
}

.favorite-actions button {
	flex: 1;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 999rpx;
	font-size: 24rpx;
}

.ghost-btn {
	background: #f2f4f3;
	color: #596a61;
	border: 0;
}

.primary-btn {
	background: linear-gradient(135deg, #33c26d 0%, #27a95b 100%);
	color: #ffffff;
	border: 0;
}
</style>
