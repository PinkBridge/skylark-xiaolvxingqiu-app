<template>
	<view class="about-page">
		<up-card :showHead="false" :showFoot="false" :border="false" margin="0">
			<template #body>
				<view class="about-header">
					<up-icon name="/static/image/flower-selected.png" size="28" color="#33c26d"></up-icon>
					<text class="about-title">小绿星球</text>
				</view>
				<text class="about-desc">
					我们致力于帮助你更轻松地记录绿植成长、安排养护计划，并通过温和提醒让每一份生命都被认真对待。
				</text>
				<view class="contact-row">
					<text class="contact-label">联系邮箱</text>
					<view class="contact-main">
						<text class="contact-value">{{ contactEmail }}</text>
						<up-icon name="file-text" size="18" color="#33c26d" @tap="copyEmail"></up-icon>
					</view>
				</view>
				<view class="qrcode-row">
					<text class="contact-label">微信群</text>
					<text class="qrcode-desc">识别二维码加入交流</text>
					<view class="qrcode-wrap" @tap="previewGroupQr">
						<image class="qrcode-image" :src="groupQrUrl" mode="aspectFit"></image>
					</view>
				</view>
			</template>
		</up-card>
	</view>
</template>

<script setup>
	const contactEmail = 'xiaolvxingqiu@163.com'
	const groupQrUrl = 'https://xiaolvxingqiu-1256079722.cos.ap-guangzhou.myqcloud.com/uploads/u10001/20260312/8cd6edc229fb425e938d695fe2c34d0d.png'

	const copyEmail = () => {
		uni.setClipboardData({
			data: contactEmail,
			success: () => {
				uni.showToast({
					title: '邮箱已复制',
					icon: 'success'
				})
			}
		})
	}

	const previewGroupQr = () => {
		uni.previewImage({
			current: groupQrUrl,
			urls: [groupQrUrl]
		})
	}
</script>

<style scoped lang="scss">
	.about-page {
		min-height: 100vh;
		padding: 20rpx 24rpx 24rpx;
		background: #f6fcf8;
	}

	.about-header {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.about-title {
		font-size: 32rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.about-desc {
		display: block;
		margin-top: 16rpx;
		font-size: 24rpx;
		color: #5a6b60;
		line-height: 1.6;
	}

	.contact-row {
		margin-top: 22rpx;
		padding-top: 16rpx;
		border-top: 1px solid #eef4f0;
	}

	.contact-label {
		display: block;
		font-size: 22rpx;
		color: #7a8a82;
	}

	.contact-value {
		display: block;
		font-size: 24rpx;
		color: #294f38;
	}

	.contact-main {
		margin-top: 8rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16rpx;
	}

	.qrcode-row {
		margin-top: 22rpx;
		padding-top: 16rpx;
		border-top: 1px solid #eef4f0;
	}

	.qrcode-desc {
		display: block;
		margin-top: 8rpx;
		font-size: 22rpx;
		color: #7a8a82;
	}

	.qrcode-wrap {
		margin-top: 12rpx;
		width: 260rpx;
		height: 260rpx;
		padding: 10rpx;
		background: #ffffff;
		border-radius: 14rpx;
		border: 1px solid #dff0e6;
		box-sizing: border-box;
	}

	.qrcode-image {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
