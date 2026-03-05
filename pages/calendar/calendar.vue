<template>
	<view class="calendar-page" :style="{ paddingTop: `${navMetrics.navBarHeight + 12}px` }">
		<view class="custom-nav">
			<view
				class="custom-nav-inner"
				:style="{
					marginTop: `${navMetrics.statusBarHeight}px`,
					height: `${navMetrics.contentBarHeight}px`
				}"
			>
				<view class="custom-nav-home" @tap="goIndexPage">
					<up-icon name="home" size="14" color="#33c26d"></up-icon>
					<text>首页</text>
				</view>
				<text class="custom-nav-title">养护日历</text>
			</view>
		</view>
		<up-card :showHead="false" :showFoot="false" :border="false" margin="0">
			<template #body>
				<view class="calendar-head">
					<view class="month-switch" @tap="goPrevMonth">
						<up-icon name="arrow-left" size="14" color="#5a6b60"></up-icon>
					</view>
					<text class="month-title">{{ monthLabel }}</text>
					<view class="month-switch" @tap="goNextMonth">
						<up-icon name="arrow-right" size="14" color="#5a6b60"></up-icon>
					</view>
				</view>

				<view class="week-row">
					<text v-for="week in weekList" :key="week" class="week-item">{{ week }}</text>
				</view>

				<view class="day-grid">
					<view
						v-for="day in calendarDays"
						:key="day.key"
						class="day-cell"
						:class="{
							'is-current': day.isCurrentMonth,
							'is-selected': day.dateKey === selectedDate,
							'is-today': day.isToday
						}"
						@tap="selectDay(day)"
					>
						<text class="day-num">{{ day.day }}</text>
						<view
							v-if="day.activityCount"
							class="day-dot"
							:class="{ 'is-overdue-dot': day.hasOverdue }"
						></view>
					</view>
				</view>
			</template>
		</up-card>

		<view class="section-wrap">
			<view class="section-head">
				<text class="section-title">{{ selectedDateLabel }} 养护活动</text>
				<text class="section-count">{{ selectedActivities.length }} 项</text>
			</view>
			<up-card :showHead="false" :showFoot="false" :border="false" margin="0">
				<template #body>
					<view v-if="selectedActivities.length" class="activity-list">
						<view
							v-for="activity in selectedActivities"
							:key="activity.id"
							class="activity-item"
							:class="{ 'is-completed': activity.completed, 'is-clickable': activity.completed }"
							@tap="openCompletedRecord(activity)"
						>
							<view class="activity-left">
								<view class="activity-icon-box">
									<up-icon :name="activity.icon" size="30" color="#33c26d"></up-icon>
								</view>
								<view class="activity-content">
									<view class="activity-main">
										<text class="activity-name">{{ activity.name }}</text>
										<text class="activity-plant">{{ activity.plantName }}</text>
									</view>
									<text class="activity-time">{{ activity.time }}</text>
								</view>
							</view>
							<text class="activity-status" :class="getStatusClass(activity)">
								{{ getStatusText(activity) }}
							</text>
						</view>
					</view>
					<view v-else class="empty-text">当日暂无养护活动</view>
				</template>
			</up-card>
		</view>

		<up-popup
			:show="showRecordPopup"
			mode="bottom"
			round="18"
			@close="showRecordPopup = false"
		>
			<view class="record-popup">
				<view class="record-popup-head">
					<text class="record-popup-title">{{ currentRecordActivity?.name || '养护' }}记录</text>
					<up-icon name="close" size="16" color="#8ea096" @tap="showRecordPopup = false"></up-icon>
				</view>
				<view v-if="currentRecordRows.length" class="record-row-list">
					<view v-for="row in currentRecordRows" :key="row.label" class="record-row">
						<text class="record-label">{{ row.label }}</text>
						<text class="record-value">{{ row.value }}</text>
					</view>
				</view>
				<view v-if="currentRecordPhoto" class="record-photo-wrap">
					<text class="record-label">照片</text>
					<image class="record-photo" :src="currentRecordPhoto" mode="aspectFill"></image>
				</view>
				<view v-if="currentRecordNote" class="record-note-wrap">
					<text class="record-label">备注</text>
					<text class="record-note">{{ currentRecordNote }}</text>
				</view>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { listCareActivitiesByDate, listCareActivitiesByMonth } from '@/api'

const SELECTED_GARDEN_KEY = 'selectedGardenId'
const navMetrics = ref(resolveNavMetrics())

function resolveNavMetrics() {
	const systemInfo = uni.getSystemInfoSync ? uni.getSystemInfoSync() : {}
	const statusBarHeight = Number(systemInfo.statusBarHeight || 20)
	let capsuleHeight = 32
	let gap = 6
	try {
		const menu = uni.getMenuButtonBoundingClientRect ? uni.getMenuButtonBoundingClientRect() : null
		if (menu && menu.top && menu.height && menu.left) {
			capsuleHeight = menu.height
			gap = Math.max(4, menu.top - statusBarHeight)
		}
	} catch (e) {}
	const navBarHeight = Math.max(statusBarHeight + capsuleHeight + gap * 2, statusBarHeight + 44)
	return {
		statusBarHeight,
		navBarHeight,
		contentBarHeight: navBarHeight - statusBarHeight
	}
}

const weekList = ['日', '一', '二', '三', '四', '五', '六']

const today = new Date()
const todayKey = formatDate(today)
const selectedDate = ref(todayKey)
const currentMonthDate = ref(new Date(today.getFullYear(), today.getMonth(), 1))

const careActivityList = ref([])
const selectedGardenId = ref('')

const readSelectedGardenId = () => `${uni.getStorageSync(SELECTED_GARDEN_KEY) || ''}`.trim()

const monthLabel = computed(() => {
	const year = currentMonthDate.value.getFullYear()
	const month = currentMonthDate.value.getMonth() + 1
	return `${year}年${month}月`
})

const selectedDateLabel = computed(() => selectedDate.value || '未选择日期')

const calendarDays = computed(() => {
	const year = currentMonthDate.value.getFullYear()
	const month = currentMonthDate.value.getMonth()
	const firstWeekDay = new Date(year, month, 1).getDay()
	const monthDays = new Date(year, month + 1, 0).getDate()
	const prevMonthDays = new Date(year, month, 0).getDate()
	const list = []

	for (let i = firstWeekDay - 1; i >= 0; i--) {
		const day = prevMonthDays - i
		const date = new Date(year, month - 1, day)
		list.push(buildDayCell(date, false))
	}

	for (let day = 1; day <= monthDays; day++) {
		const date = new Date(year, month, day)
		list.push(buildDayCell(date, true))
	}

	const remain = (7 - (list.length % 7)) % 7
	for (let day = 1; day <= remain; day++) {
		const date = new Date(year, month + 1, day)
		list.push(buildDayCell(date, false))
	}

	return list
})

const selectedActivities = computed(() => {
	return careActivityList.value
		.filter((item) => item.date === selectedDate.value)
		.sort((a, b) => (a.time || '').localeCompare(b.time || ''))
})

const showRecordPopup = ref(false)
const currentRecordActivity = ref(null)

const currentRecordRows = computed(() => {
	if (!currentRecordActivity.value?.record) return []
	const { name, record } = currentRecordActivity.value
	switch (name) {
		case '浇水':
			return buildRows([
				{ label: '水量（ml）', value: record.amount },
				{ label: '浇水方式', value: record.method }
			])
		case '施肥':
			return buildRows([{ label: '施肥用料', value: record.material }])
		case '修剪':
			return buildRows([{ label: '修剪部位', value: record.part }])
		case '换盆':
			return buildRows([{ label: '新盆尺寸（直径）', value: record.potSize }])
		case '测量':
			return buildRows([
				{ label: '重量（含花盆）', value: record.weight },
				{ label: '高度', value: record.height }
			])
		case '病虫害':
			return buildRows([
				{ label: '病虫害类型', value: record.type },
				{ label: '处理方式', value: record.treatment }
			])
		default:
			return []
	}
})

const currentRecordPhoto = computed(() => currentRecordActivity.value?.record?.photo || '')
const currentRecordNote = computed(() => currentRecordActivity.value?.record?.note || '')

function buildRows(rows) {
	return rows.filter((item) => item.value !== undefined && item.value !== null && `${item.value}`.trim() !== '')
}

function buildDayCell(date, isCurrentMonth) {
	const dateKey = formatDate(date)
	const dayActivities = careActivityList.value.filter((item) => item.date === dateKey)
	const hasOverdue = dayActivities.some((item) => !item.completed && item.date < todayKey)

	return {
		key: `${dateKey}-${isCurrentMonth ? 'current' : 'other'}`,
		dateKey,
		day: date.getDate(),
		isCurrentMonth,
		isToday: dateKey === todayKey,
		activityCount: dayActivities.length,
		hasOverdue
	}
}

function formatDate(date) {
	const year = date.getFullYear()
	const month = `${date.getMonth() + 1}`.padStart(2, '0')
	const day = `${date.getDate()}`.padStart(2, '0')
	return `${year}-${month}-${day}`
}

const goPrevMonth = () => {
	const current = currentMonthDate.value
	currentMonthDate.value = new Date(current.getFullYear(), current.getMonth() - 1, 1)
	loadMonthActivities()
}

const goNextMonth = () => {
	const current = currentMonthDate.value
	currentMonthDate.value = new Date(current.getFullYear(), current.getMonth() + 1, 1)
	loadMonthActivities()
}

const selectDay = (day) => {
	selectedDate.value = day.dateKey
	loadDateActivities(day.dateKey)
}

const openCompletedRecord = (activity) => {
	if (!activity.completed) return
	if (!activity.record) {
		uni.showToast({
			title: '暂无填写记录',
			icon: 'none'
		})
		return
	}
	currentRecordActivity.value = activity
	showRecordPopup.value = true
}

const isOverdueActivity = (activity) => !activity.completed && activity.date < todayKey

const getStatusText = (activity) => {
	if (activity.completed) return '已呵护'
	return '未呵护'
}

const getStatusClass = (activity) => {
	if (activity.completed) return 'status-done'
	return 'status-pending'
}

const getCurrentMonth = () => {
	const year = currentMonthDate.value.getFullYear()
	const month = `${currentMonthDate.value.getMonth() + 1}`.padStart(2, '0')
	return `${year}-${month}`
}

const loadMonthActivities = () => {
	listCareActivitiesByMonth(getCurrentMonth(), selectedGardenId.value || undefined)
		.then((activities) => {
			careActivityList.value = activities || []
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '加载月活动失败',
				icon: 'none'
			})
		})
}

const loadDateActivities = (date) => {
	listCareActivitiesByDate(date, selectedGardenId.value || undefined)
		.then((activities) => {
			const map = new Map((careActivityList.value || []).map((item) => [item.id, item]))
			;(activities || []).forEach((item) => map.set(item.id, item))
			careActivityList.value = Array.from(map.values())
		})
		.catch(() => {})
}

const goIndexPage = () => {
	uni.reLaunch({
		url: '/pages/index/index',
		fail: () => {
			uni.redirectTo({
				url: '/pages/index/index'
			})
		}
	})
}

onShow(() => {
	selectedGardenId.value = readSelectedGardenId()
	loadMonthActivities()
	loadDateActivities(selectedDate.value)
})
</script>

<style scoped lang="scss">
	.calendar-page {
		min-height: 100vh;
		padding: 20rpx 24rpx 24rpx;
		background: #f6fcf8;
	}

	.custom-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 120;
		background: #f6fcf8;
	}

	.custom-nav-inner {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		box-sizing: border-box;
	}

	.custom-nav-home {
		position: absolute;
		left: 24rpx;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		gap: 6rpx;
		padding: 6rpx 12rpx;
		height: 44rpx;
		border-radius: 999rpx;
		background: #ffffff;
		border: 1px solid #d9d9d9;
		font-size: 20rpx;
		font-weight: 600;
		color: #1f1f1f;
		box-sizing: border-box;
	}

	.custom-nav-title {
		font-size: 32rpx;
		line-height: 44rpx;
		font-weight: 600;
		color: #1f1f1f;
		text-align: center;
	}

	.calendar-head {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 18rpx;
	}

	.month-switch {
		width: 46rpx;
		height: 46rpx;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #eefbf3;
	}

	.month-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.week-row {
		margin-top: 14rpx;
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}

	.week-item {
		text-align: center;
		font-size: 22rpx;
		color: #7a8a82;
	}

	.day-grid {
		margin-top: 8rpx;
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 8rpx;
	}

	.day-cell {
		position: relative;
		height: 72rpx;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f8fbf9;
	}

	.day-cell.is-current .day-num {
		color: #294f38;
	}

	.day-cell.is-selected {
		background: #e9f8ef;
		border: 1px solid #c7e9d5;
	}

	.day-cell.is-today .day-num {
		font-weight: 700;
		color: #33c26d;
	}

	.day-num {
		font-size: 24rpx;
		color: #b3c0b9;
	}

	.day-dot {
		position: absolute;
		bottom: 8rpx;
		left: 50%;
		width: 8rpx;
		height: 8rpx;
		border-radius: 50%;
		background: #33c26d;
		transform: translateX(-50%);
	}

	.day-dot.is-overdue-dot {
		color: #f56c6c;
		background: #f56c6c;
	}

	.section-wrap {
		margin-top: 20rpx;
	}

	.section-head {
		margin-bottom: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.section-title {
		font-size: 28rpx;
		font-weight: 700;
		color: #294f38;
	}

	.section-count {
		font-size: 24rpx;
		color: #7a8a82;
	}

	.activity-list {
		display: flex;
		flex-direction: column;
		gap: 10rpx;
	}

	.activity-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 96rpx;
		padding: 16rpx 14rpx;
		border-radius: 16rpx;
		background: #ffffff;
		border-bottom: 1px solid #e3f2e9;
	}

	.activity-item.is-clickable {
		cursor: pointer;
	}

	.activity-list .activity-item:last-child {
		border-bottom: none;
	}

	.activity-item.is-completed {
		opacity: 0.72;
	}

	.activity-left {
		display: flex;
		align-items: center;
		gap: 10rpx;
		min-width: 0;
	}

	.activity-icon-box {
		width: 56rpx;
		height: 56rpx;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #eaf9f0;
	}

	.activity-content {
		min-width: 0;
	}

	.activity-main {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.activity-name {
		font-size: 28rpx;
		font-weight: 600;
		color: #1f1f1f;
	}

	.activity-plant {
		font-size: 24rpx;
		color: #1f1f1f;
	}

	.activity-time {
		display: block;
		margin-top: 4rpx;
		font-size: 24rpx;
		color: #7a8a82;
	}

	.activity-status {
		flex-shrink: 0;
		font-size: 20rpx;
		padding: 4rpx 10rpx;
		border-radius: 999rpx;
	}

	.status-pending {
		color: #f56c6c;
		background: #ffecec;
	}

	.status-done {
		color: #7f8f87;
		background: #eef3f0;
	}

	.empty-text {
		font-size: 24rpx;
		color: #8ea096;
		text-align: center;
		padding: 20rpx 0;
	}

	.record-popup {
		padding: 26rpx 24rpx 30rpx;
		background: #f8fdf9;
	}

	.record-popup-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 14rpx;
	}

	.record-popup-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #294f38;
	}

	.record-row-list {
		background: #ffffff;
		border-radius: 16rpx;
		padding: 8rpx 16rpx;
	}

	.record-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20rpx;
		padding: 14rpx 0;
		border-bottom: 1px solid #e8f2ec;
	}

	.record-row:last-child {
		border-bottom: none;
	}

	.record-label {
		font-size: 24rpx;
		color: #6f8278;
		flex-shrink: 0;
	}

	.record-value {
		font-size: 24rpx;
		color: #1f1f1f;
		text-align: right;
		word-break: break-all;
	}

	.record-photo-wrap,
	.record-note-wrap {
		margin-top: 14rpx;
		background: #ffffff;
		border-radius: 16rpx;
		padding: 16rpx;
		display: flex;
		flex-direction: column;
		gap: 10rpx;
	}

	.record-photo {
		width: 180rpx;
		height: 180rpx;
		border-radius: 12rpx;
		background: #edf6f0;
	}

	.record-note {
		font-size: 24rpx;
		line-height: 1.6;
		color: #3a4c42;
		white-space: pre-wrap;
	}
</style>
