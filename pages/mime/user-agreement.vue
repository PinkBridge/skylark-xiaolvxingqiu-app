<template>
	<view class="doc-page">
		<view class="doc-card">
			<view class="doc-title">小绿星球用户服务协议</view>
			<view class="doc-time">更新日期：2026-03-13</view>
			<text class="doc-paragraph">欢迎使用小绿星球。你在使用本服务前，请认真阅读并理解本协议。你点击同意或继续使用，即表示你已阅读并同意本协议全部内容。</text>
			<view class="doc-subtitle">1. 服务内容</view>
			<text class="doc-paragraph">小绿星球为用户提供绿植识别、养护管理、提醒推送、反馈建议等功能。我们将持续优化功能并保障服务可用性。</text>
			<view class="doc-subtitle">2. 账号与身份</view>
			<text class="doc-paragraph">在微信小程序环境下，我们会基于微信登录凭证创建或识别你的账号。为实现特定功能，可能需要你主动授权手机号等信息。</text>
			<view class="doc-subtitle">3. 用户行为规范</view>
			<text class="doc-paragraph">你应当合法合规使用本服务，不得上传违法违规内容，不得干扰系统正常运行，不得侵犯他人合法权益。</text>
			<view class="doc-subtitle">4. 责任限制</view>
			<text class="doc-paragraph">我们会尽力保障服务稳定，但因不可抗力、网络故障、第三方服务异常导致的中断或延迟，不承担超出法律规定范围的责任。</text>
			<view class="doc-subtitle">5. 协议变更</view>
			<text class="doc-paragraph">我们可能根据业务变化更新本协议。更新后将在页面展示，更新内容自公布之日起生效。</text>
			<view class="doc-subtitle">6. 联系我们</view>
			<text class="doc-paragraph">如你对本协议有疑问，可通过应用内“反馈和建议”页面联系我们。</text>
			<view class="doc-subtitle">7. 终止与注销</view>
			<text class="doc-paragraph">如你不再使用本服务，可停止使用并通过反馈渠道申请账号相关信息处理。对于违反法律法规或本协议的行为，我们有权采取限制功能、暂停服务等措施。</text>
			<view class="doc-subtitle">8. 法律适用</view>
			<text class="doc-paragraph">本协议的订立、执行与解释适用中华人民共和国法律法规。如发生争议，双方应友好协商解决。</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'UserAgreementPage'
}
</script>

<style scoped lang="scss">
.doc-page {
	min-height: 100vh;
	padding: 24rpx;
	background: #f6fcf8;
}

.doc-card {
	padding: 24rpx;
	border-radius: 16rpx;
	background: #ffffff;
}

.doc-title {
	font-size: 34rpx;
	font-weight: 700;
	color: #214f36;
}

.doc-time {
	margin-top: 10rpx;
	margin-bottom: 18rpx;
	font-size: 24rpx;
	color: #6b7f70;
}

.doc-subtitle {
	margin-top: 18rpx;
	margin-bottom: 8rpx;
	font-size: 28rpx;
	font-weight: 600;
	color: #214f36;
}

.doc-paragraph {
	display: block;
	font-size: 26rpx;
	line-height: 1.8;
	color: #354d3f;
}
</style>
