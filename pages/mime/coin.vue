<template>
	<view class="coin-page">
		<up-card :showHead="false" :showFoot="false" :border="false" margin="0">
			<template #body>
				<view class="coin-header">
					<view class="coin-title-wrap">
						<image class="coin-title-icon" src="/static/icon/star-coin.png" mode="aspectFit"></image>
						<text class="coin-title">星币</text>
					</view>
				</view>

				<view class="coin-row">
					<text class="label">当前额度</text>
					<text class="coin-amount">{{ starCoinAmount }}</text>
				</view>

				<view class="coin-row coin-row-divider">
					<text class="label">获取方式</text>
					<text class="value">每日分享、绿植记录</text>
				</view>

				<view class="coin-row">
					<text class="label">使用说明</text>
					<text class="value">在部分活动中可用于兑换绿植等商品。</text>
				</view>
			</template>
		</up-card>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const starCoinAmount = ref(1280)
</script>

<style scoped lang="scss">
	.coin-page {
		min-height: 100vh;
		padding: 20rpx 24rpx 24rpx;
		background: #f6fcf8;
	}

	.coin-header {
		display: flex;
		align-items: center;
	}

	.coin-title-wrap {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.coin-title-icon {
		width: 44rpx;
		height: 44rpx;
	}

	.coin-title {
		font-size: 32rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.coin-row {
		padding: 14rpx 0;
	}

	.coin-row-divider {
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

	.coin-amount {
		display: block;
		font-size: 42rpx;
		font-weight: 700;
		color: #33c26d;
		line-height: 1.2;
	}

	.value {
		display: block;
		font-size: 24rpx;
		color: #294f38;
		line-height: 1.6;
	}
</style>
