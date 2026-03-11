<template>
	<view class="ai-result-page">
		<view class="result-card">
			<view class="section">
				<text class="section-title">品种</text>
				<text class="plant-name">{{ plantName }}</text>
			</view>

			<view class="section">
				<text class="section-title">植物图片</text>
				<swiper class="plant-swiper" indicator-dots circular>
					<swiper-item v-for="(img, idx) in images" :key="idx">
						<image class="plant-image" :src="img" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>

			<view class="section">
				<text class="section-title">植物描述</text>
				<text class="plant-desc">{{ description }}</text>
			</view>
		</view>

		<view class="bottom-actions">
			<button class="action-btn ghost" @tap="onCollect">加入收藏</button>
			<button class="action-btn primary" @tap="onAddGarden">加入花园</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { createAiCollection, listGardens } from '@/api'

const AI_RESULT_STORAGE_KEY = 'aiRecognizeResult'
const plantName = ref('未知植物')
const description = ref('暂无植物描述，建议更换更清晰的植物照片重新识别。')
const score = ref(0)
const imageUrl = ref('')
const recognizedImageUrl = ref('')
const collecting = ref(false)
const addingGarden = ref(false)
const images = ref([
	'https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg'
])

const loadResult = () => {
	const raw = uni.getStorageSync(AI_RESULT_STORAGE_KEY)
	const data = raw && typeof raw === 'object' ? raw : {}
	plantName.value = `${data?.name || '未知植物'}`.trim() || '未知植物'
	description.value = `${data?.description || ''}`.trim() || '暂无植物描述，建议更换更清晰的植物照片重新识别。'
	score.value = Number(data?.score || 0)
	imageUrl.value = `${data?.imageUrl || ''}`.trim()
	recognizedImageUrl.value = `${data?.recognizedImageUrl || ''}`.trim()
	const cacheImages = Array.isArray(data?.images) ? data.images : []
	const imgList = [...cacheImages, imageUrl.value, recognizedImageUrl.value]
		.map((item) => `${item || ''}`.trim())
		.filter((item, index, arr) => item && arr.indexOf(item) === index)
	if (imgList.length) {
		images.value = imgList
	}
}

const buildPayload = () => ({
	name: plantName.value,
	description: description.value,
	score: score.value,
	imageUrl: imageUrl.value,
	recognizedImageUrl: recognizedImageUrl.value,
	source: 'baidu_ai'
})

const gotoAddPlantPage = (gardenId) => {
	const payload = encodeURIComponent(JSON.stringify(buildPayload()))
	const selectedGardenId = `${gardenId || ''}`.trim()
	const query = selectedGardenId
		? `?gardenId=${encodeURIComponent(selectedGardenId)}&prefill=${payload}`
		: `?prefill=${payload}`
	uni.navigateTo({
		url: `/pages/plant/add${query}`,
		fail: (err) => {
			uni.showToast({
				title: err?.errMsg || '打开添加绿植页失败',
				icon: 'none'
			})
		}
	})
}

const gotoCreateGardenPage = () => {
	const payload = encodeURIComponent(JSON.stringify(buildPayload()))
	uni.navigateTo({
		url: `/pages/index/garden-create?fromAi=1&prefill=${payload}`,
		fail: (err) => {
			uni.showToast({
				title: err?.errMsg || '打开创建花园页失败',
				icon: 'none'
			})
		}
	})
}

onLoad(() => {
	loadResult()
})

onShow(() => {
	loadResult()
})

const onCollect = () => {
	if (collecting.value) return
	collecting.value = true
	createAiCollection(buildPayload())
		.then(() => {
			uni.showToast({
				title: '已加入收藏',
				icon: 'none'
			})
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '加入收藏失败',
				icon: 'none'
			})
		})
		.finally(() => {
			collecting.value = false
		})
}

const onAddGarden = () => {
	if (addingGarden.value) return
	addingGarden.value = true
	listGardens()
		.then((rows) => {
			const gardens = rows || []
			if (!gardens.length) {
				uni.showModal({
					title: '暂无花园',
					content: '你还没有花园，是否去创建花园？',
					success: (modalRes) => {
						if (modalRes.confirm) {
							gotoCreateGardenPage()
						}
					}
				})
				return
			}
			const itemList = gardens.map((item) => `${item?.name || '未命名花园'}${item?.isDefault ? '（默认）' : ''}`)
			uni.showActionSheet({
				itemList,
				success: (sheetRes) => {
					const selected = gardens[sheetRes.tapIndex]
					const gardenId = `${selected?.id || ''}`.trim()
					if (!gardenId) {
						uni.showToast({
							title: '花园信息无效',
							icon: 'none'
						})
						return
					}
					gotoAddPlantPage(gardenId)
				}
			})
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '加入花园失败',
				icon: 'none'
			})
		})
		.finally(() => {
			addingGarden.value = false
		})
}
</script>

<style scoped lang="scss">
.ai-result-page {
	min-height: 100vh;
	background: #f6fcf8;
	padding: 24rpx 24rpx 180rpx;
	box-sizing: border-box;
}

.result-card {
	background: #ffffff;
	border-radius: 18rpx;
	padding: 24rpx;
	box-shadow: 0 10rpx 24rpx rgba(31, 122, 68, 0.08);
}

.section + .section {
	margin-top: 24rpx;
}

.section-title {
	display: block;
	font-size: 24rpx;
	font-weight: 600;
	color: #2f8f56;
	margin-bottom: 12rpx;
}

.plant-name {
	display: block;
	font-size: 36rpx;
	font-weight: 700;
	color: #1f7a44;
}

.plant-swiper {
	width: 100%;
	height: 380rpx;
	border-radius: 14rpx;
	overflow: hidden;
}

.plant-image {
	width: 100%;
	height: 100%;
}

.plant-desc {
	display: block;
	font-size: 26rpx;
	line-height: 1.7;
	color: #5a6b60;
}

.bottom-actions {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 16rpx 24rpx calc(16rpx + env(safe-area-inset-bottom));
	background: #ffffff;
	border-top: 1px solid #e7f1eb;
	display: flex;
	gap: 18rpx;
}

.action-btn {
	flex: 1;
	height: 84rpx;
	border-radius: 999rpx;
	font-size: 30rpx;
	font-weight: 600;
	border: 0;
}

.action-btn.ghost {
	background: #eaf9f0;
	color: #2f8f56;
}

.action-btn.primary {
	background: linear-gradient(135deg, #33c26d 0%, #27a95b 100%);
	color: #ffffff;
}
</style>
