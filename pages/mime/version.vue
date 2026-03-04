<template>
	<view class="version-page">
		<up-card :showHead="false" :showFoot="false" :border="false" margin="0">
			<template #body>
				<view class="version-head">
					<up-icon name="/static/image/flower-selected.png" size="28" color="#33c26d"></up-icon>
					<text class="version-name">小绿星球</text>
				</view>
				<view class="version-row">
					<text class="label">当前版本</text>
					<text class="value">v1.0.0</text>
				</view>
				<view class="version-row version-row-divider">
					<text class="label">更新内容</text>
					<text class="value">基础养护、绿植记录与提醒功能已上线</text>
				</view>
			</template>
		</up-card>
	</view>
</template>

<script setup>
</script>

<style scoped lang="scss">
	.version-page {
		min-height: 100vh;
		padding: 20rpx 24rpx 24rpx;
		background: #f6fcf8;
	}

	.version-head {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.version-name {
		font-size: 32rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.version-row {
		padding: 14rpx 0;
	}

	.version-row-divider {
		margin-top: 8rpx;
		padding-top: 16rpx;
		border-top: 1px solid #eef4f0;
	}

	.label {
		display: block;
		font-size: 22rpx;
		color: #7a8a82;
		margin-bottom: 6rpx;
	}

	.value {
		display: block;
		font-size: 24rpx;
		color: #294f38;
		line-height: 1.6;
	}
</style>
