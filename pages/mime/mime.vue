<template>
	<view class="mime-page">
		<view class="profile-card" @tap="goProfile">
			<view class="profile-left">
				<image class="avatar-image" :src="profile.avatar" mode="aspectFill"></image>
				<view class="profile-info">
					<view class="name-row">
						<text class="user-name">{{ profile.name }}</text>
						<up-icon size="14" :name="genderIcon" :color="iconColor"></up-icon>
					</view>
					<text class="user-sign">{{ profile.motto }}</text>
				</view>
			</view>
			<up-icon name="arrow-right" size="14" color="#7bc59a"></up-icon>
		</view>
		<up-gap height="5" :bgColor="bgColor"></up-gap>
		<up-cell-group>
			<up-cell title="推送设置" clickable isLink @click="goPushSetting">
				<template #icon>
					<up-icon size="18" name="bell-fill" :color="iconColor"></up-icon>
				</template>
			</up-cell>
			<up-cell title="我的星币" clickable isLink @click="showStarCoinInfo">
				<template #icon>
					<up-icon size="18" name="red-packet-fill" :color="iconColor"></up-icon>
				</template>
			</up-cell>
		</up-cell-group>
		<up-gap height="3" :bgColor="bgColor"></up-gap>
		<up-cell-group>
			<up-cell title="关于我们" clickable isLink @click="goAbout">
				<template #icon>
					<up-icon size="16" name="info-circle-fill" :color="iconColor"></up-icon>
				</template>
			</up-cell>
			<up-cell title="软件版本" clickable isLink @click="goVersion">
				<template #icon>
					<up-icon size="16" name="setting-fill" :color="iconColor"></up-icon>
				</template>
			</up-cell>
			<up-cell title="反馈和建议" clickable isLink @click="goFeedback">
				<template #icon>
					<up-icon size="16" name="question-circle-fill" :color="iconColor"></up-icon>
				</template>
			</up-cell>
		</up-cell-group>
		<up-gap height="3" :bgColor="bgColor"></up-gap>
	</view>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import { getUserProfile } from '@/api'
	import { readCachedWxProfile } from '@/utils/auth'

	const iconColor = ref("#33c26d")
	const bgColor = ref("#F8F8F8")
	const defaultAvatar = 'https://cdn.uviewui.com/uview/example/button.png'

	const profile = ref({
		name: '姚 棉伟',
		gender: 'male',
		motto: '每一份生命都值得尊重和呵护!',
		avatar: defaultAvatar
	})

	const genderIcon = computed(() => (profile.value.gender === 'female' ? 'woman' : 'man'))

	const loadProfile = () => {
		getUserProfile()
			.then((savedProfile) => {
				profile.value = {
					name: savedProfile?.name || profile.value.name,
					gender: savedProfile?.gender || profile.value.gender,
					motto: savedProfile?.motto || profile.value.motto,
					avatar: savedProfile?.avatar || defaultAvatar
				}
			})
			.catch(() => {
				const cached = readCachedWxProfile()
				if (!cached) return
				profile.value = {
					name: cached?.name || profile.value.name,
					gender: cached?.gender || profile.value.gender,
					motto: profile.value.motto,
					avatar: cached?.avatar || defaultAvatar
				}
			})
	}

	onShow(() => {
		loadProfile()
	})

	const goPushSetting = () => {
		uni.navigateTo({
			url: '/pages/mime/push-setting'
		})
	}

	const showStarCoinInfo = () => {
		uni.navigateTo({
			url: '/pages/mime/coin'
		})
	}

	const goAbout = () => {
		uni.navigateTo({
			url: '/pages/mime/about'
		})
	}

	const goVersion = () => {
		uni.navigateTo({
			url: '/pages/mime/version'
		})
	}

	const goFeedback = () => {
		uni.navigateTo({
			url: '/pages/mime/feedback'
		})
	}

	const goProfile = () => {
		uni.navigateTo({
			url: '/pages/mime/profile'
		})
	}

</script>

<style lang="scss" scoped>
	.mime-page {
		min-height: 100vh;
		background: #f6fcf8;
	}

	.profile-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 20rpx 24rpx 0;
		padding: 22rpx 20rpx;
		background: linear-gradient(135deg, #effaf3 0%, #f8fcf9 100%);
		border-radius: 20rpx;
	}

	.profile-left {
		display: flex;
		align-items: center;
		gap: 16rpx;
	}

	.avatar-image {
		width: 92rpx;
		height: 92rpx;
		border-radius: 50%;
		border: 2px solid #d7f2e1;
	}

	.profile-info {
		display: flex;
		flex-direction: column;
		gap: 6rpx;
	}

	.name-row {
		display: flex;
		align-items: center;
		gap: 8rpx;
	}

	.user-name {
		font-size: 30rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.user-sign {
		font-size: 22rpx;
		color: #6f8376;
	}
</style>