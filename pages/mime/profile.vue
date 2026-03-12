<template>
	<view class="profile-page">
		<up-form :model="form" labelPosition="left" labelWidth="140rpx">
			<up-form-item label="头像" borderBottom>
				<view class="avatar-row" @tap="chooseAvatar">
					<image class="avatar-preview" :src="form.avatar" mode="aspectFill"></image>
					<up-icon name="arrow-right" size="14" color="#7bc59a"></up-icon>
				</view>
			</up-form-item>

			<up-form-item label="昵称" borderBottom>
				<up-input
					v-model="form.name"
					placeholder="请输入昵称"
					border="none"
					clearable
					maxlength="16"
				></up-input>
			</up-form-item>

			<up-form-item label="性别" borderBottom>
				<up-subsection
					:list="genderOptions"
					:current="genderIndex"
					mode="button"
					activeColor="#33c26d"
					inactiveColor="#5a6b60"
					bgColor="#eaf9f0"
					@change="onGenderChange"
				></up-subsection>
			</up-form-item>

			<up-form-item label="生日" borderBottom>
				<view class="date-field" @tap="openDatePicker">
					<text :class="form.birthday ? 'date-text' : 'date-placeholder'">
						{{ form.birthday || '请选择生日' }}
					</text>
					<up-icon name="arrow-right" size="14" color="#7bc59a"></up-icon>
				</view>
			</up-form-item>

			<up-form-item label="手机号" borderBottom>
				<up-input v-model="form.phone" placeholder="微信授权手机号" border="none" disabled></up-input>
			</up-form-item>

			<up-form-item label="签名" borderBottom>
				<up-textarea
					v-model="form.motto"
					placeholder="写点和绿植有关的小心情吧"
					border="surround"
					height="100"
					maxlength="60"
					count
				></up-textarea>
			</up-form-item>
		</up-form>

		<view class="submit-wrap">
			<up-button
				type="primary"
				text="保存信息"
				color="#33c26d"
				shape="circle"
				@click="saveProfile"
			></up-button>
		</view>

		<up-datetime-picker
			:show="showDatePicker"
			:value="datePickerValue"
			mode="date"
			@confirm="onDateConfirm"
			@cancel="showDatePicker = false"
			@close="showDatePicker = false"
		></up-datetime-picker>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { getUserProfile, updateUserProfile, uploadImageResource } from '@/api'
import { readCachedWxProfile, saveWxAuthProfile } from '@/utils/auth'

const defaultAvatar = 'https://cdn.uviewui.com/uview/example/button.png'
const genderOptions = ['男', '女', '保密']
const genderValues = ['male', 'female', 'unknown']

const form = reactive({
	avatar: defaultAvatar,
	name: '',
	gender: 'male',
	birthday: '',
	motto: '每一份生命都值得尊重和呵护!',
	phone: ''
})

const genderIndex = ref(0)
const showDatePicker = ref(false)
const datePickerValue = ref(Date.now())

const loadProfile = () => {
	getUserProfile()
		.then((savedProfile) => {
			form.avatar = savedProfile?.avatar || defaultAvatar
			form.name = savedProfile?.name || ''
			form.gender = savedProfile?.gender || 'male'
			form.birthday = savedProfile?.birthday || ''
			form.motto = savedProfile?.motto || form.motto
			form.phone = savedProfile?.phone || ''

			const index = genderValues.findIndex((item) => item === form.gender)
			genderIndex.value = index > -1 ? index : 0
		})
		.catch(() => {
			const cached = readCachedWxProfile()
			if (!cached) return
			form.avatar = cached?.avatar || form.avatar
			form.name = cached?.name || form.name
			form.gender = cached?.gender || form.gender
			form.phone = cached?.phone || form.phone
			const index = genderValues.findIndex((item) => item === form.gender)
			genderIndex.value = index > -1 ? index : 0
		})
}

loadProfile()

const chooseAvatar = () => {
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: ['camera', 'album'],
		success: async (res) => {
			const selectedPath = res.tempFilePaths?.[0] || ''
			if (!selectedPath) return
			try {
				form.avatar = await uploadImageResource({ filePath: selectedPath, fileName: 'avatar.jpg' })
			} catch (err) {
				uni.showToast({
					title: err?.message || '头像上传失败',
					icon: 'none'
				})
			}
		}
	})
}

const onGenderChange = (index) => {
	genderIndex.value = index
	form.gender = genderValues[index] || 'unknown'
}

const openDatePicker = () => {
	showDatePicker.value = true
}

const formatDate = (timestamp) => {
	const date = new Date(timestamp)
	const year = date.getFullYear()
	const month = `${date.getMonth() + 1}`.padStart(2, '0')
	const day = `${date.getDate()}`.padStart(2, '0')
	return `${year}-${month}-${day}`
}

const onDateConfirm = (payload) => {
	const ts = payload?.value || Date.now()
	datePickerValue.value = ts
	form.birthday = formatDate(ts)
	showDatePicker.value = false
}

const saveProfile = () => {
	if (!form.name.trim()) {
		uni.showToast({
			title: '请输入昵称',
			icon: 'none'
		})
		return
	}

	Promise.resolve()
		.then(async () => {
			const avatar = form.avatar ? await uploadImageResource({ filePath: form.avatar, fileName: 'avatar.jpg' }) : defaultAvatar
			form.avatar = avatar || defaultAvatar
			return {
				avatar: form.avatar || defaultAvatar,
				name: form.name.trim(),
				gender: form.gender,
				birthday: form.birthday,
				motto: form.motto.trim() || '每一份生命都值得尊重和呵护!',
				phone: form.phone || ''
			}
		})
		.then((payload) => updateUserProfile(payload))
		.then(() => {
			saveWxAuthProfile({
				avatar: form.avatar || defaultAvatar,
				name: form.name.trim(),
				gender: form.gender,
				phone: form.phone || ''
			})
			uni.showToast({
				title: '保存成功',
				icon: 'success'
			})
			setTimeout(() => {
				uni.navigateBack()
			}, 400)
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '保存失败',
				icon: 'none'
			})
		})
}
</script>

<style scoped lang="scss">
	.profile-page {
		min-height: 100vh;
		padding: 16rpx 24rpx 24rpx;
		background: #f6fcf8;
	}

	.avatar-row {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.avatar-preview {
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
		border: 2px solid #d7f2e1;
	}

	.date-field {
		height: 72rpx;
		padding: 0 20rpx;
		border-radius: 12rpx;
		border: 1px solid #d7efdf;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.date-text {
		font-size: 26rpx;
		color: #294f38;
	}

	.date-placeholder {
		font-size: 26rpx;
		color: #9aa9a0;
	}

	.submit-wrap {
		margin-top: 28rpx;
	}
</style>
