<template>
	<view class="care-page" :style="{ paddingTop: `${navMetrics.navBarHeight + 12}px` }">
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
				<text class="custom-nav-title">养护管理</text>
			</view>
		</view>
		<up-card :showHead="false" :showFoot="false" :border="false" margin="0">
			<template #body>
				<view class="page-head">
					<up-icon name="clock-fill" size="22" color="#33c26d"></up-icon>
					<text class="page-title">养护活动</text>
				</view>
				<text class="page-desc">根据绿植养护计划，生成养护活动</text>
			</template>
		</up-card>

		<view class="section-wrap">
			<view class="section-head">
				<text class="section-title">今日养护</text>
				<view class="section-right">
					<text class="section-count">{{ todayTasks.length }} 项</text>
					<view
						class="batch-done-btn"
						:class="{ 'is-disabled': !todayPendingCount }"
						@tap="completeTodayTasks"
					>
						完成
					</view>
				</view>
			</view>
			<up-card :showHead="false" :showFoot="false" :border="false" margin="0">
				<template #body>
					<view v-if="todayTasks.length" class="task-list">
						<view
							v-for="task in todayTasks"
							:key="task.id"
							class="task-item"
							:class="{ 'task-item-done': task.completed }"
							@tap="handleTaskTap(task)"
						>
							<view class="task-left">
								<view class="task-icon-box">
									<up-icon :name="task.icon" size="30" :color="task.completed ? '#a5b5ac' : '#33c26d'"></up-icon>
								</view>
								<view class="task-content">
									<view class="task-main-line">
										<text class="task-name">{{ task.name }}</text>
										<text class="task-plant">{{ task.plantName }}</text>
									</view>
									<text class="task-time">{{ task.completed ? task.timeText : getDayLabel(task.offset) }}</text>
								</view>
							</view>
							<view class="task-action" :class="{ 'task-action-done': task.completed }">
								<up-icon
									:name="task.completed ? 'checkmark-circle-fill' : 'checkmark-circle'"
									size="22"
									:color="task.completed ? '#33c26d' : '#9db0a5'"
								></up-icon>
							</view>
						</view>
					</view>
					<view v-else class="empty-text">暂无养护活动</view>
				</template>
			</up-card>
		</view>

		<view class="section-wrap">
			<view class="section-head">
				<text class="section-title">未来三天</text>
				<text class="section-count">{{ upcomingPendingCount }} 项</text>
			</view>
			<up-card :showHead="false" :showFoot="false" :border="false" margin="0">
				<template #body>
					<view v-if="upcomingTasks.length" class="task-list">
						<view
							v-for="task in upcomingTasks"
							:key="task.id"
							class="task-item"
							:class="{ 'task-item-done': task.completed }"
							@tap="handleTaskTap(task)"
						>
							<view class="task-left">
								<view class="task-icon-box">
									<up-icon :name="task.icon" size="30" :color="task.completed ? '#a5b5ac' : '#33c26d'"></up-icon>
								</view>
								<view class="task-content">
									<view class="task-main-line">
										<text class="task-name">{{ task.name }}</text>
										<text class="task-plant">{{ task.plantName }}</text>
									</view>
									<text class="task-time">{{ task.completed ? task.timeText : getDayLabel(task.offset) }}</text>
								</view>
							</view>
							<view class="task-action" :class="{ 'task-action-done': task.completed }">
								<up-icon
									:name="task.completed ? 'checkmark-circle-fill' : 'checkmark-circle'"
									size="22"
									:color="task.completed ? '#33c26d' : '#9db0a5'"
								></up-icon>
							</view>
						</view>
					</view>
					<view v-else class="empty-text">暂无养护活动</view>
				</template>
			</up-card>
		</view>

		<view class="section-wrap">
			<view class="section-head">
				<text class="section-title">最近完成</text>
				<text class="section-count">{{ recentCompletedCount }} 项</text>
			</view>
			<up-card :showHead="false" :showFoot="false" :border="false" margin="0">
				<template #body>
					<view v-if="recentCompletedTasks.length" class="task-list">
						<view
							v-for="task in recentCompletedTasks"
							:key="task.id"
							class="task-item task-item-done"
						>
							<view class="task-left">
								<view class="task-icon-box">
									<up-icon :name="task.icon" size="30" color="#a5b5ac"></up-icon>
								</view>
								<view class="task-content">
									<view class="task-main-line">
										<text class="task-name">{{ task.name }}</text>
										<text class="task-plant">{{ task.plantName }}</text>
									</view>
									<text class="task-time">{{ task.completeText }}</text>
									<text v-if="task.recordText" class="task-time">{{ task.recordText }}</text>
								</view>
							</view>
							<view class="task-action task-action-done">
								<up-icon name="checkmark-circle-fill" size="22" color="#33c26d"></up-icon>
							</view>
						</view>
					</view>
					<view v-else class="empty-text">暂无已完成任务</view>
					<text class="section-tip">仅展示最近10天的养护记录</text>
				</template>
			</up-card>
			
		</view>

		<up-popup
			:show="showWateringPopup"
			mode="bottom"
			round="18"
			@close="showWateringPopup = false"
		>
			<view class="watering-popup">
				<view class="watering-head">
					<text class="watering-title">浇水记录</text>
					<up-icon name="close" size="16" color="#8ea096" @tap="showWateringPopup = false"></up-icon>
				</view>

				<up-form :model="wateringForm" labelPosition="top">
					<up-form-item label="水量（ml）">
						<up-input
							v-model="wateringForm.amount"
							type="number"
							placeholder="选填，例如 180"
							border="surround"
							clearable
						></up-input>
					</up-form-item>

					<up-form-item label="浇水方式">
						<up-subsection
							:list="wateringMethodOptions"
							:current="wateringMethodIndex"
							mode="button"
							activeColor="#33c26d"
							inactiveColor="#5a6b60"
							bgColor="#eaf9f0"
							@change="onWateringMethodChange"
						></up-subsection>
					</up-form-item>

					<up-form-item label="添加照片">
						<view class="watering-photo-picker" @tap="openPhotoSourceSheet('watering')">
							<image
								v-if="wateringForm.photo"
								class="watering-photo"
								:src="wateringForm.photo"
								mode="aspectFill"
							></image>
							<view v-else class="watering-photo-placeholder">
								<up-icon name="camera-fill" size="20" color="#33c26d"></up-icon>
								<text>拍照或从相册选择</text>
							</view>
						</view>
					</up-form-item>

					<up-form-item label="备注">
						<up-textarea
							v-model="wateringForm.note"
							placeholder="选填：记录土壤湿度、环境变化等"
							border="surround"
							height="90"
							maxlength="120"
							count
						></up-textarea>
					</up-form-item>
				</up-form>

				<view class="watering-submit-wrap">
					<up-button
						type="primary"
						text="保存并完成"
						color="#33c26d"
						shape="circle"
						@click="submitWateringRecord"
					></up-button>
				</view>
			</view>
		</up-popup>

		<up-popup
			:show="showFertilizePopup"
			mode="bottom"
			round="18"
			@close="showFertilizePopup = false"
		>
			<view class="fertilize-popup">
				<view class="fertilize-head">
					<text class="fertilize-title">施肥记录</text>
					<up-icon name="close" size="16" color="#8ea096" @tap="showFertilizePopup = false"></up-icon>
				</view>

				<up-form :model="fertilizeForm" labelPosition="top">
					<up-form-item label="施肥用料">
						<view class="select-field" @tap="showFertilizeMaterialSheet = true">
							<text :class="fertilizeForm.material ? 'select-text' : 'select-placeholder'">
								{{ fertilizeForm.material || '请选择施肥用料' }}
							</text>
							<up-icon name="arrow-right" size="14" color="#7bc59a"></up-icon>
						</view>
					</up-form-item>

					<up-form-item label="添加照片">
						<view class="fertilize-photo-picker" @tap="openPhotoSourceSheet('fertilize')">
							<image
								v-if="fertilizeForm.photo"
								class="fertilize-photo"
								:src="fertilizeForm.photo"
								mode="aspectFill"
							></image>
							<view v-else class="fertilize-photo-placeholder">
								<up-icon name="camera-fill" size="20" color="#33c26d"></up-icon>
								<text>拍照或从相册选择</text>
							</view>
						</view>
					</up-form-item>

					<up-form-item label="备注">
						<up-textarea
							v-model="fertilizeForm.note"
							placeholder="选填：记录肥料浓度、植物状态等"
							border="surround"
							height="90"
							maxlength="120"
							count
						></up-textarea>
					</up-form-item>
				</up-form>

				<view class="fertilize-submit-wrap">
					<up-button
						type="primary"
						text="保存并完成"
						color="#33c26d"
						shape="circle"
						@click="submitFertilizeRecord"
					></up-button>
				</view>
			</view>
		</up-popup>

		<up-popup
			:show="showPrunePopup"
			mode="bottom"
			round="18"
			@close="showPrunePopup = false"
		>
			<view class="prune-popup">
				<view class="prune-head">
					<text class="prune-title">修剪记录</text>
					<up-icon name="close" size="16" color="#8ea096" @tap="showPrunePopup = false"></up-icon>
				</view>

				<up-form :model="pruneForm" labelPosition="top">
					<up-form-item label="修剪部位">
						<up-subsection
							:list="prunePartOptions"
							:current="prunePartIndex"
							mode="button"
							activeColor="#33c26d"
							inactiveColor="#5a6b60"
							bgColor="#eaf9f0"
							@change="onPrunePartChange"
						></up-subsection>
					</up-form-item>

					<up-form-item label="添加照片">
						<view class="prune-photo-picker" @tap="openPhotoSourceSheet('prune')">
							<image
								v-if="pruneForm.photo"
								class="prune-photo"
								:src="pruneForm.photo"
								mode="aspectFill"
							></image>
							<view v-else class="prune-photo-placeholder">
								<up-icon name="camera-fill" size="20" color="#33c26d"></up-icon>
								<text>拍照或从相册选择</text>
							</view>
						</view>
					</up-form-item>

					<up-form-item label="备注">
						<up-textarea
							v-model="pruneForm.note"
							placeholder="选填：记录修剪原因和预期效果"
							border="surround"
							height="90"
							maxlength="120"
							count
						></up-textarea>
					</up-form-item>
				</up-form>

				<view class="prune-submit-wrap">
					<up-button
						type="primary"
						text="保存并完成"
						color="#33c26d"
						shape="circle"
						@click="submitPruneRecord"
					></up-button>
				</view>
			</view>
		</up-popup>

		<up-popup
			:show="showRepotPopup"
			mode="bottom"
			round="18"
			@close="showRepotPopup = false"
		>
			<view class="repot-popup">
				<view class="repot-head">
					<text class="repot-title">换盆记录</text>
					<up-icon name="close" size="16" color="#8ea096" @tap="showRepotPopup = false"></up-icon>
				</view>

				<up-form :model="repotForm" labelPosition="top">
					<up-form-item label="新盆尺寸（直径）">
						<up-input
							v-model="repotForm.potSize"
							placeholder="选填：如 18cm"
							border="surround"
							clearable
						></up-input>
					</up-form-item>

					<up-form-item label="添加照片">
						<view class="repot-photo-picker" @tap="openPhotoSourceSheet('repot')">
							<image
								v-if="repotForm.photo"
								class="repot-photo"
								:src="repotForm.photo"
								mode="aspectFill"
							></image>
							<view v-else class="repot-photo-placeholder">
								<up-icon name="camera-fill" size="20" color="#33c26d"></up-icon>
								<text>拍照或从相册选择</text>
							</view>
						</view>
					</up-form-item>

					<up-form-item label="备注">
						<up-textarea
							v-model="repotForm.note"
							placeholder="选填：记录换盆原因和土壤配置"
							border="surround"
							height="90"
							maxlength="120"
							count
						></up-textarea>
					</up-form-item>
				</up-form>

				<view class="repot-submit-wrap">
					<up-button
						type="primary"
						text="保存并完成"
						color="#33c26d"
						shape="circle"
						@click="submitRepotRecord"
					></up-button>
				</view>
			</view>
		</up-popup>

		<up-popup
			:show="showShotPopup"
			mode="bottom"
			round="18"
			@close="showShotPopup = false"
		>
			<view class="shot-popup">
				<view class="shot-head">
					<text class="shot-title">拍照记录</text>
					<up-icon name="close" size="16" color="#8ea096" @tap="showShotPopup = false"></up-icon>
				</view>

				<up-form :model="shotForm" labelPosition="top">
					<up-form-item label="上传图片">
						<view
							v-if="!shotForm.photos.length"
							class="shot-photo-picker shot-photo-picker--empty"
							@tap="openPhotoSourceSheet('shot')"
						>
							<view class="shot-photo-placeholder shot-photo-placeholder--empty">
								<up-icon name="camera-fill" size="24" color="#33c26d"></up-icon>
								<text class="shot-photo-main-text">拍照或从相册选择</text>
								<text class="shot-photo-sub-text">最多上传9张</text>
							</view>
						</view>
						<view v-else class="shot-photos-grid">
							<view
								v-for="(photo, idx) in shotForm.photos"
								:key="`${photo}-${idx}`"
								class="shot-photo-item"
								@tap="onPreviewShotPhoto(idx)"
							>
								<image
									class="shot-photo"
									:src="photo"
									mode="aspectFill"
								></image>
								<view class="shot-photo-remove" @tap.stop="onRemoveShotPhoto(idx)">
									<up-icon name="close" size="10" color="#ffffff"></up-icon>
								</view>
							</view>
							<view
								v-if="shotForm.photos.length < 9"
								class="shot-photo-picker shot-photo-picker--add"
								@tap="openPhotoSourceSheet('shot')"
							>
								<view class="shot-photo-placeholder shot-photo-placeholder--add">
									<up-icon name="plus" size="20" color="#33c26d"></up-icon>
									<text class="shot-photo-main-text">添加</text>
									<text class="shot-photo-count">{{ shotForm.photos.length }}/9</text>
								</view>
							</view>
						</view>
					</up-form-item>

					<up-form-item label="备注">
						<up-textarea
							v-model="shotForm.note"
							placeholder="请输入拍照备注"
							border="surround"
							height="90"
							maxlength="120"
							count
						></up-textarea>
					</up-form-item>
				</up-form>

				<view class="shot-submit-wrap">
					<up-button
						type="primary"
						text="保存并完成"
						color="#33c26d"
						shape="circle"
						@click="submitShotRecord"
					></up-button>
				</view>
			</view>
		</up-popup>

		<up-popup
			:show="showMeasurePopup"
			mode="bottom"
			round="18"
			@close="showMeasurePopup = false"
		>
			<view class="measure-popup">
				<view class="measure-head">
					<text class="measure-title">测量记录</text>
					<up-icon name="close" size="16" color="#8ea096" @tap="showMeasurePopup = false"></up-icon>
				</view>

				<up-form :model="measureForm" labelPosition="top">
					<up-form-item label="重量（含花盆）">
						<up-input
							v-model="measureForm.weight"
							type="number"
							placeholder="请输入重量，如 1250（g）"
							border="surround"
							clearable
						></up-input>
					</up-form-item>

					<up-form-item label="高度">
						<up-input
							v-model="measureForm.height"
							type="number"
							placeholder="请输入高度，如 35（cm）"
							border="surround"
							clearable
						></up-input>
					</up-form-item>

					<up-form-item label="添加照片">
						<view class="measure-photo-picker" @tap="openPhotoSourceSheet('measure')">
							<image
								v-if="measureForm.photo"
								class="measure-photo"
								:src="measureForm.photo"
								mode="aspectFill"
							></image>
							<view v-else class="measure-photo-placeholder">
								<up-icon name="camera-fill" size="20" color="#33c26d"></up-icon>
								<text>拍照或从相册选择</text>
							</view>
						</view>
					</up-form-item>

					<up-form-item label="备注">
						<up-textarea
							v-model="measureForm.note"
							placeholder="选填：记录环境、温湿度等"
							border="surround"
							height="90"
							maxlength="120"
							count
						></up-textarea>
					</up-form-item>
				</up-form>

				<view class="measure-submit-wrap">
					<up-button
						type="primary"
						text="保存并完成"
						color="#33c26d"
						shape="circle"
						@click="submitMeasureRecord"
					></up-button>
				</view>
			</view>
		</up-popup>

		<up-popup
			:show="showLoosenPopup"
			mode="bottom"
			round="18"
			@close="showLoosenPopup = false"
		>
			<view class="loosen-popup">
				<view class="loosen-head">
					<text class="loosen-title">松土记录</text>
					<up-icon name="close" size="16" color="#8ea096" @tap="showLoosenPopup = false"></up-icon>
				</view>

				<up-form :model="loosenForm" labelPosition="top">
					<up-form-item label="上传图片">
						<view class="loosen-photo-picker" @tap="openPhotoSourceSheet('loosen')">
							<image
								v-if="loosenForm.photo"
								class="loosen-photo"
								:src="loosenForm.photo"
								mode="aspectFill"
							></image>
							<view v-else class="loosen-photo-placeholder">
								<up-icon name="camera-fill" size="20" color="#33c26d"></up-icon>
								<text>拍照或从相册选择</text>
							</view>
						</view>
					</up-form-item>

					<up-form-item label="备注">
						<up-textarea
							v-model="loosenForm.note"
							placeholder="请输入松土备注"
							border="surround"
							height="90"
							maxlength="120"
							count
						></up-textarea>
					</up-form-item>
				</up-form>

				<view class="loosen-submit-wrap">
					<up-button
						type="primary"
						text="保存并完成"
						color="#33c26d"
						shape="circle"
						@click="submitLoosenRecord"
					></up-button>
				</view>
			</view>
		</up-popup>

		<up-popup
			:show="showBugPopup"
			mode="bottom"
			round="18"
			@close="showBugPopup = false"
		>
			<view class="bug-popup">
				<view class="bug-head">
					<text class="bug-title">病虫害记录</text>
					<up-icon name="close" size="16" color="#8ea096" @tap="showBugPopup = false"></up-icon>
				</view>

				<up-form :model="bugForm" labelPosition="top">
					<up-form-item label="病虫害类型">
						<view class="select-field" @tap="showBugTypeSheet = true">
							<text :class="bugForm.type ? 'select-text' : 'select-placeholder'">
								{{ bugForm.type || '请选择病虫害类型' }}
							</text>
							<up-icon name="arrow-right" size="14" color="#7bc59a"></up-icon>
						</view>
					</up-form-item>

					<up-form-item label="处理方式">
						<view class="select-field" @tap="showBugTreatmentSheet = true">
							<text :class="bugForm.treatment ? 'select-text' : 'select-placeholder'">
								{{ bugForm.treatment || '请选择处理方式' }}
							</text>
							<up-icon name="arrow-right" size="14" color="#7bc59a"></up-icon>
						</view>
					</up-form-item>

					<up-form-item label="添加照片">
						<view class="bug-photo-picker" @tap="openPhotoSourceSheet('bug')">
							<image
								v-if="bugForm.photo"
								class="bug-photo"
								:src="bugForm.photo"
								mode="aspectFill"
							></image>
							<view v-else class="bug-photo-placeholder">
								<up-icon name="camera-fill" size="20" color="#33c26d"></up-icon>
								<text>拍照或从相册选择</text>
							</view>
						</view>
					</up-form-item>

					<up-form-item label="备注">
						<up-textarea
							v-model="bugForm.note"
							placeholder="选填：记录症状和处理反馈"
							border="surround"
							height="90"
							maxlength="120"
							count
						></up-textarea>
					</up-form-item>
				</up-form>

				<view class="bug-submit-wrap">
					<up-button
						type="primary"
						text="保存并完成"
						color="#33c26d"
						shape="circle"
						@click="submitBugRecord"
					></up-button>
				</view>
			</view>
		</up-popup>

		<up-action-sheet
			:show="showPhotoSourceSheet"
			:actions="photoSourceActions"
			cancelText="取消"
			@select="onPhotoSourceSelect"
			@close="showPhotoSourceSheet = false"
		></up-action-sheet>

		<up-action-sheet
			:show="showFertilizeMaterialSheet"
			:actions="fertilizeMaterialActions"
			cancelText="取消"
			@select="onFertilizeMaterialSelect"
			@close="showFertilizeMaterialSheet = false"
		></up-action-sheet>

		<up-action-sheet
			:show="showBugTypeSheet"
			:actions="bugTypeActions"
			cancelText="取消"
			@select="onBugTypeSelect"
			@close="showBugTypeSheet = false"
		></up-action-sheet>

		<up-action-sheet
			:show="showBugTreatmentSheet"
			:actions="bugTreatmentActions"
			cancelText="取消"
			@select="onBugTreatmentSelect"
			@close="showBugTreatmentSheet = false"
		></up-action-sheet>
	</view>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { completeCareTask, listCareActivitiesByMonth, listCareTasks } from '@/api'

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

const careTaskList = ref([])
const completedTaskHistory = ref([])
const selectedGardenId = ref('')

const readSelectedGardenId = () => `${uni.getStorageSync(SELECTED_GARDEN_KEY) || ''}`.trim()

const todayTasks = computed(() => careTaskList.value.filter((task) => task.offset === 0))
const upcomingTasks = computed(() =>
	careTaskList.value
		.filter((task) => task.offset > 0 && task.offset <= 3)
		.sort((a, b) => a.offset - b.offset)
)

const todayPendingCount = computed(() => todayTasks.value.filter((task) => !task.completed).length)
const upcomingPendingCount = computed(() => upcomingTasks.value.filter((task) => !task.completed).length)
const recentCompletedTasks = computed(() =>
	completedTaskHistory.value
		.filter((task) => task.dayAgo <= 10)
		.sort((a, b) => a.dayAgo - b.dayAgo)
)
const recentCompletedCount = computed(() => recentCompletedTasks.value.length)
const showWateringPopup = ref(false)
const activeWateringTaskId = ref('')
const showFertilizePopup = ref(false)
const activeFertilizeTaskId = ref('')
const showPrunePopup = ref(false)
const activePruneTaskId = ref('')
const showRepotPopup = ref(false)
const activeRepotTaskId = ref('')
const showShotPopup = ref(false)
const activeShotTaskId = ref('')
const showMeasurePopup = ref(false)
const activeMeasureTaskId = ref('')
const showLoosenPopup = ref(false)
const activeLoosenTaskId = ref('')
const showBugPopup = ref(false)
const activeBugTaskId = ref('')
const showPhotoSourceSheet = ref(false)
const showFertilizeMaterialSheet = ref(false)
const showBugTypeSheet = ref(false)
const showBugTreatmentSheet = ref(false)
const photoUploadTarget = ref('watering')

const wateringMethodOptions = ['常规浇水', '浸盆法', '喷雾']
const wateringMethodIndex = ref(-1)
const fertilizeMaterialOptions = ['花多多1号', '花多多2号', '硝酸2氢钾', '硫酸亚铁', '复合肥']
const fertilizeMaterialActions = fertilizeMaterialOptions.map((name) => ({ name }))
const prunePartOptions = ['枯枝', '黄叶', '徒长枝', '病枝', '整形修剪']
const prunePartIndex = ref(-1)
const photoSourceActions = [
	{ name: '拍照', sourceType: ['camera'] },
	{ name: '从相册选择', sourceType: ['album'] }
]
const bugTypeOptions = ['蚜虫', '红蜘蛛', '白粉虱', '介壳虫', '白粉病', '根腐病', '灰霉病', '炭疽病', '其他']
const bugTypeActions = bugTypeOptions.map((name) => ({ name }))
const bugTreatmentOptions = ['物理清除', '肥皂水', '酒精擦拭', '专用药剂', '隔离观察']
const bugTreatmentActions = bugTreatmentOptions.map((name) => ({ name }))

const wateringForm = reactive({
	amount: '',
	method: '',
	photo: '',
	note: ''
})

const fertilizeForm = reactive({
	material: '',
	photo: '',
	note: ''
})

const pruneForm = reactive({
	part: '',
	photo: '',
	note: ''
})

const repotForm = reactive({
	potSize: '',
	photo: '',
	note: ''
})

const shotForm = reactive({
	photos: [],
	note: ''
})

const measureForm = reactive({
	weight: '',
	height: '',
	photo: '',
	note: ''
})

const loosenForm = reactive({
	photo: '',
	note: ''
})

const bugForm = reactive({
	type: '',
	treatment: '',
	photo: '',
	note: ''
})

const loadCareTasks = () => {
	listCareTasks(selectedGardenId.value || undefined)
		.then((tasks) => {
			careTaskList.value = tasks || []
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '加载任务失败',
				icon: 'none'
			})
		})
}

const loadCompletedHistory = () => {
	const nowDate = new Date()
	const currentMonth = nowDate.toISOString().slice(0, 7)
	const prevDate = new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, 1)
	const prevMonth = `${prevDate.getFullYear()}-${`${prevDate.getMonth() + 1}`.padStart(2, '0')}`
	Promise.all([
		listCareActivitiesByMonth(currentMonth, selectedGardenId.value || undefined),
		listCareActivitiesByMonth(prevMonth, selectedGardenId.value || undefined)
	])
		.then((results) => {
			const activities = [...(results[0] || []), ...(results[1] || [])]
			const now = Date.now()
			completedTaskHistory.value = (activities || [])
				.filter((item) => item.completed)
				.map((item) => {
					const targetTime = new Date(`${item.date}T${item.time || '00:00'}:00`).getTime()
					const dayAgo = Math.max(0, Math.floor((now - targetTime) / (24 * 3600 * 1000)))
					return {
						id: item.id,
						icon: item.icon,
						name: item.name,
						plantName: item.plantName,
						dayAgo,
						completeText: `${dayAgo}天前 ${item.time || ''} 完成`,
						recordText: formatRecordSummary(item.name, item.record)
					}
				})
		})
		.catch(() => {
			completedTaskHistory.value = []
		})
}

const formatRecordSummary = (name, record) => {
	if (!record || typeof record !== 'object') return ''
	if (name === '浇水') {
		const parts = []
		if (record.amount !== undefined && record.amount !== null && `${record.amount}` !== '') {
			parts.push(`水量${record.amount}ml`)
		}
		if (record.method) parts.push(`${record.method}`)
		return parts.join('，')
	}
	if (name === '施肥') return record.material ? `用料：${record.material}` : ''
	if (name === '修剪') return record.part ? `部位：${record.part}` : ''
	if (name === '换盆') return record.potSize ? `新盆：${record.potSize}` : ''
	if (name === '测量') {
		const parts = []
		if (record.weight !== undefined && record.weight !== null && `${record.weight}` !== '') {
			parts.push(`重量${record.weight}g`)
		}
		if (record.height !== undefined && record.height !== null && `${record.height}` !== '') {
			parts.push(`高度${record.height}cm`)
		}
		return parts.join('，')
	}
	if (name === '病虫害') {
		const parts = []
		if (record.type) parts.push(`类型：${record.type}`)
		if (record.treatment) parts.push(`处理：${record.treatment}`)
		return parts.join('，')
	}
	if (name === '拍照') {
		const count = Array.isArray(record.photos) ? record.photos.filter(Boolean).length : 0
		if (count > 0) return `已上传${count}张照片`
		return record.photo ? '已上传1张照片' : ''
	}
	if (name === '松土') return record.photo ? '已上传照片' : ''
	return ''
}

const getDayLabel = (offset) => {
	if (offset <= 0) return '今天'
	if (offset === 1) return '明天'
	if (offset === 2) return '后天'
	return `第${offset}天`
}

const resetWateringForm = () => {
	wateringForm.amount = ''
	wateringForm.method = ''
	wateringForm.photo = ''
	wateringForm.note = ''
	wateringMethodIndex.value = -1
}

const resetFertilizeForm = () => {
	fertilizeForm.material = ''
	fertilizeForm.photo = ''
	fertilizeForm.note = ''
}

const resetPruneForm = () => {
	pruneForm.part = ''
	pruneForm.photo = ''
	pruneForm.note = ''
	prunePartIndex.value = -1
}

const resetRepotForm = () => {
	repotForm.potSize = ''
	repotForm.photo = ''
	repotForm.note = ''
}

const resetShotForm = () => {
	shotForm.photos = []
	shotForm.note = ''
}

const resetMeasureForm = () => {
	measureForm.weight = ''
	measureForm.height = ''
	measureForm.photo = ''
	measureForm.note = ''
}

const resetLoosenForm = () => {
	loosenForm.photo = ''
	loosenForm.note = ''
}

const resetBugForm = () => {
	bugForm.type = ''
	bugForm.treatment = ''
	bugForm.photo = ''
	bugForm.note = ''
}

const toggleTask = (taskId) => {
	const task = careTaskList.value.find((item) => item.id === taskId)
	if (!task) return
	task.completed = !task.completed
}

const handleTaskTap = (task) => {
	if (task.name === '浇水') {
		activeWateringTaskId.value = task.id
		resetWateringForm()
		showWateringPopup.value = true
		return
	}
	if (task.name === '施肥') {
		activeFertilizeTaskId.value = task.id
		resetFertilizeForm()
		showFertilizePopup.value = true
		return
	}
	if (task.name === '修剪') {
		activePruneTaskId.value = task.id
		resetPruneForm()
		showPrunePopup.value = true
		return
	}
	if (task.name === '换盆') {
		activeRepotTaskId.value = task.id
		resetRepotForm()
		showRepotPopup.value = true
		return
	}
	if (task.name === '拍照') {
		activeShotTaskId.value = task.id
		resetShotForm()
		showShotPopup.value = true
		return
	}
	if (task.name === '测量') {
		activeMeasureTaskId.value = task.id
		resetMeasureForm()
		showMeasurePopup.value = true
		return
	}
	if (task.name === '松土') {
		activeLoosenTaskId.value = task.id
		resetLoosenForm()
		showLoosenPopup.value = true
		return
	}
	if (task.name === '病虫害') {
		activeBugTaskId.value = task.id
		resetBugForm()
		showBugPopup.value = true
		return
	}
	toggleTask(task.id)
}

const onWateringMethodChange = (index) => {
	wateringMethodIndex.value = index
	wateringForm.method = wateringMethodOptions[index] || ''
}

const onFertilizeMaterialSelect = (action) => {
	showFertilizeMaterialSheet.value = false
	fertilizeForm.material = action?.name || ''
}

const onBugTypeSelect = (action) => {
	showBugTypeSheet.value = false
	bugForm.type = action?.name || ''
}

const onBugTreatmentSelect = (action) => {
	showBugTreatmentSheet.value = false
	bugForm.treatment = action?.name || ''
}

const onPrunePartChange = (index) => {
	prunePartIndex.value = index
	pruneForm.part = prunePartOptions[index] || ''
}

const openPhotoSourceSheet = (target = 'watering') => {
	photoUploadTarget.value = target
	showPhotoSourceSheet.value = true
}

const onPhotoSourceSelect = (action) => {
	showPhotoSourceSheet.value = false
	const remaining = 9 - (shotForm.photos?.length || 0)
	if (photoUploadTarget.value === 'shot' && remaining <= 0) {
		uni.showToast({
			title: '最多上传9张图片',
			icon: 'none'
		})
		return
	}
	const maxCount = photoUploadTarget.value === 'shot' ? remaining : 1
	uni.chooseImage({
		count: maxCount,
		sizeType: ['compressed'],
		sourceType: action.sourceType,
		success: (res) => {
			const picked = Array.isArray(res.tempFilePaths) ? res.tempFilePaths.filter(Boolean) : []
			const photoPath = picked[0] || ''
			if (photoUploadTarget.value === 'fertilize') {
				fertilizeForm.photo = photoPath
				return
			}
			if (photoUploadTarget.value === 'prune') {
				pruneForm.photo = photoPath
				return
			}
			if (photoUploadTarget.value === 'repot') {
				repotForm.photo = photoPath
				return
			}
			if (photoUploadTarget.value === 'shot') {
				shotForm.photos = [...(shotForm.photos || []), ...picked].slice(0, 9)
				return
			}
			if (photoUploadTarget.value === 'measure') {
				measureForm.photo = photoPath
				return
			}
			if (photoUploadTarget.value === 'loosen') {
				loosenForm.photo = photoPath
				return
			}
			if (photoUploadTarget.value === 'bug') {
				bugForm.photo = photoPath
				return
			}
			wateringForm.photo = photoPath
		}
	})
}

const onRemoveShotPhoto = (idx) => {
	if (idx < 0 || idx >= shotForm.photos.length) return
	shotForm.photos.splice(idx, 1)
}

const onPreviewShotPhoto = (idx) => {
	if (idx < 0 || idx >= shotForm.photos.length) return
	uni.previewImage({
		urls: shotForm.photos,
		current: shotForm.photos[idx]
	})
}

const submitWateringRecord = () => {
	const taskId = activeWateringTaskId.value
	if (!taskId) return
	completeCareTask(taskId, {
		amount: wateringForm.amount ? Number(wateringForm.amount) : null,
		method: wateringForm.method || null,
		photo: wateringForm.photo || null,
		note: wateringForm.note?.trim() || null
	})
		.then(() => {
			showWateringPopup.value = false
			loadCareTasks()
			loadCompletedHistory()
			uni.showToast({
				title: '浇水记录已保存',
				icon: 'success'
			})
		})
		.catch((err) => {
			uni.showToast({
				title: err?.message || '保存失败',
				icon: 'none'
			})
		})
}

const submitFertilizeRecord = () => {
	const taskId = activeFertilizeTaskId.value
	if (!taskId) return
	completeCareTask(taskId, {
		material: fertilizeForm.material || null,
		photo: fertilizeForm.photo || null,
		note: fertilizeForm.note?.trim() || null
	}).then(() => {
		showFertilizePopup.value = false
		loadCareTasks()
		loadCompletedHistory()
		uni.showToast({ title: '施肥记录已保存', icon: 'success' })
	}).catch((err) => {
		uni.showToast({ title: err?.message || '保存失败', icon: 'none' })
	})
}

const submitPruneRecord = () => {
	const taskId = activePruneTaskId.value
	if (!taskId) return
	completeCareTask(taskId, {
		part: pruneForm.part || null,
		photo: pruneForm.photo || null,
		note: pruneForm.note?.trim() || null
	}).then(() => {
		showPrunePopup.value = false
		loadCareTasks()
		loadCompletedHistory()
		uni.showToast({ title: '修剪记录已保存', icon: 'success' })
	}).catch((err) => {
		uni.showToast({ title: err?.message || '保存失败', icon: 'none' })
	})
}

const submitRepotRecord = () => {
	const taskId = activeRepotTaskId.value
	if (!taskId) return
	completeCareTask(taskId, {
		potSize: repotForm.potSize || null,
		photo: repotForm.photo || null,
		note: repotForm.note?.trim() || null
	}).then(() => {
		showRepotPopup.value = false
		loadCareTasks()
		loadCompletedHistory()
		uni.showToast({ title: '换盆记录已保存', icon: 'success' })
	}).catch((err) => {
		uni.showToast({ title: err?.message || '保存失败', icon: 'none' })
	})
}

const submitShotRecord = () => {
	if (!shotForm.photos.length) {
		uni.showToast({
			title: '请先上传图片',
			icon: 'none'
		})
		return
	}
	if (!shotForm.note.trim()) {
		uni.showToast({
			title: '请填写备注',
			icon: 'none'
		})
		return
	}

	const taskId = activeShotTaskId.value
	if (!taskId) return
	completeCareTask(taskId, {
		photo: shotForm.photos[0] || null,
		photos: shotForm.photos.length ? shotForm.photos : null,
		note: shotForm.note?.trim() || null
	}).then(() => {
		showShotPopup.value = false
		loadCareTasks()
		loadCompletedHistory()
		uni.showToast({ title: '拍照记录已保存', icon: 'success' })
	}).catch((err) => {
		uni.showToast({ title: err?.message || '保存失败', icon: 'none' })
	})
}

const submitMeasureRecord = () => {
	const taskId = activeMeasureTaskId.value
	if (!taskId) return
	completeCareTask(taskId, {
		weight: measureForm.weight ? Number(measureForm.weight) : null,
		height: measureForm.height ? Number(measureForm.height) : null,
		photo: measureForm.photo || null,
		note: measureForm.note?.trim() || null
	}).then(() => {
		showMeasurePopup.value = false
		loadCareTasks()
		loadCompletedHistory()
		uni.showToast({ title: '测量记录已保存', icon: 'success' })
	}).catch((err) => {
		uni.showToast({ title: err?.message || '保存失败', icon: 'none' })
	})
}

const submitLoosenRecord = () => {
	if (!loosenForm.photo) {
		uni.showToast({
			title: '请先上传图片',
			icon: 'none'
		})
		return
	}
	if (!loosenForm.note.trim()) {
		uni.showToast({
			title: '请填写备注',
			icon: 'none'
		})
		return
	}

	const taskId = activeLoosenTaskId.value
	if (!taskId) return
	completeCareTask(taskId, {
		photo: loosenForm.photo || null,
		note: loosenForm.note?.trim() || null
	}).then(() => {
		showLoosenPopup.value = false
		loadCareTasks()
		loadCompletedHistory()
		uni.showToast({ title: '松土记录已保存', icon: 'success' })
	}).catch((err) => {
		uni.showToast({ title: err?.message || '保存失败', icon: 'none' })
	})
}

const submitBugRecord = () => {
	if (!bugForm.type) {
		uni.showToast({
			title: '请选择病虫害类型',
			icon: 'none'
		})
		return
	}
	if (!bugForm.treatment.trim()) {
		uni.showToast({
			title: '请选择处理方式',
			icon: 'none'
		})
		return
	}

	const taskId = activeBugTaskId.value
	if (!taskId) return
	completeCareTask(taskId, {
		type: bugForm.type || null,
		treatment: bugForm.treatment || null,
		photo: bugForm.photo || null,
		note: bugForm.note?.trim() || null
	}).then(() => {
		showBugPopup.value = false
		loadCareTasks()
		loadCompletedHistory()
		uni.showToast({ title: '病虫害记录已保存', icon: 'success' })
	}).catch((err) => {
		uni.showToast({ title: err?.message || '保存失败', icon: 'none' })
	})
}

const completeTodayTasks = () => {
	const todayPendingTasks = careTaskList.value.filter((task) => task.offset === 0 && !task.completed)
	if (!todayPendingTasks.length) return

	uni.showModal({
		title: '确认完成',
		content: `确认将今日 ${todayPendingTasks.length} 项任务全部标记为已完成吗？`,
		confirmColor: '#33c26d',
		success: (res) => {
			if (!res.confirm) return
			Promise.all(todayPendingTasks.map((task) => completeCareTask(task.id)))
				.then(() => {
					loadCareTasks()
					loadCompletedHistory()
				})
				.catch((err) => {
					uni.showToast({
						title: err?.message || '批量完成失败',
						icon: 'none'
					})
				})
		}
	})
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
	loadCareTasks()
	loadCompletedHistory()
})
</script>

<style scoped lang="scss">
	.care-page {
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

	.page-head {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.page-title {
		font-size: 32rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.page-desc {
		display: block;
		margin-top: 12rpx;
		font-size: 24rpx;
		color: #5a6b60;
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

	.section-right {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.batch-done-btn {
		padding: 6rpx 12rpx;
		border-radius: 999rpx;
		font-size: 20rpx;
		font-weight: 600;
		color: #2f8f56;
		background: #eefbf3;
		border: 1px solid #d7efdf;
	}

	.batch-done-btn.is-disabled {
		color: #9db0a5;
		background: #f3f7f5;
		border-color: #e5ece8;
	}

	.task-list {
		display: flex;
		flex-direction: column;
		gap: 10rpx;
	}

	.task-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 96rpx;
		padding: 16rpx 14rpx;
		border-radius: 16rpx;
		background: #ffffff;
		border-bottom: 1px solid #e3f2e9;
	}

	.task-list .task-item:last-child {
		border-bottom: none;
	}

	.task-item-done {
		opacity: 0.72;
	}

	.task-left {
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.task-icon-box {
		width: 56rpx;
		height: 56rpx;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #eaf9f0;
	}

	.task-content {
		min-width: 0;
	}

	.task-main-line {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.task-name {
		font-size: 28rpx;
		font-weight: 600;
		color: #1f1f1f;
	}

	.task-plant {
		font-size: 24rpx;
		color: #1f1f1f;
	}

	.task-time {
		display: block;
		margin-top: 4rpx;
		font-size: 24rpx;
		color: #7a8a82;
	}

	.task-action {
		flex-shrink: 0;
		margin-left: 8rpx;
	}

	.task-action-done {
		transform: scale(1.03);
	}

	.empty-text {
		font-size: 24rpx;
		color: #8ea096;
		text-align: center;
		padding: 20rpx 0;
	}

	.section-tip {
		display: block;
		margin-top: 10rpx;
		font-size: 22rpx;
		color: #8ea096;
		text-align: center;
	}

	.select-field {
		height: 76rpx;
		padding: 0 24rpx;
		border-radius: 12rpx;
		border: 1px solid #d7efdf;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.select-text {
		font-size: 26rpx;
		color: #294f38;
	}

	.select-placeholder {
		font-size: 26rpx;
		color: #9aa9a0;
	}

	.watering-popup {
		padding: 20rpx 24rpx 26rpx;
		background: #f9fdfa;
	}

	.fertilize-popup {
		padding: 20rpx 24rpx 26rpx;
		background: #f9fdfa;
	}

	.prune-popup {
		padding: 20rpx 24rpx 26rpx;
		background: #f9fdfa;
	}

	.repot-popup {
		padding: 20rpx 24rpx 26rpx;
		background: #f9fdfa;
	}

	.shot-popup {
		padding: 20rpx 24rpx 26rpx;
		background: #f9fdfa;
	}

	.measure-popup {
		padding: 20rpx 24rpx 26rpx;
		background: #f9fdfa;
	}

	.loosen-popup {
		padding: 20rpx 24rpx 26rpx;
		background: #f9fdfa;
	}

	.bug-popup {
		padding: 20rpx 24rpx 26rpx;
		background: #f9fdfa;
	}

	.watering-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6rpx;
	}

	.fertilize-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6rpx;
	}

	.prune-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6rpx;
	}

	.repot-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6rpx;
	}

	.shot-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6rpx;
	}

	.measure-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6rpx;
	}

	.loosen-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6rpx;
	}

	.bug-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6rpx;
	}

	.watering-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.fertilize-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.prune-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.repot-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.shot-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.measure-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.loosen-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.bug-title {
		font-size: 30rpx;
		font-weight: 700;
		color: #1f7a44;
	}

	.watering-photo-picker {
		width: 100%;
		height: 180rpx;
		border-radius: 14rpx;
		border: 1px dashed #b9e5cb;
		background: #eefbf3;
		overflow: hidden;
	}

	.fertilize-photo-picker {
		width: 100%;
		height: 180rpx;
		border-radius: 14rpx;
		border: 1px dashed #b9e5cb;
		background: #eefbf3;
		overflow: hidden;
	}

	.prune-photo-picker {
		width: 100%;
		height: 180rpx;
		border-radius: 14rpx;
		border: 1px dashed #b9e5cb;
		background: #eefbf3;
		overflow: hidden;
	}

	.repot-photo-picker {
		width: 100%;
		height: 180rpx;
		border-radius: 14rpx;
		border: 1px dashed #b9e5cb;
		background: #eefbf3;
		overflow: hidden;
	}

	.shot-photo-picker {
		position: relative;
		width: 100%;
		height: 180rpx;
		border-radius: 14rpx;
		border: 1px dashed #b9e5cb;
		background: #eefbf3;
		overflow: hidden;
		box-sizing: border-box;
	}

	.shot-photos-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 12rpx;
		width: 100%;
	}

	.shot-photo-item {
		position: relative;
		width: calc((100% - 24rpx) / 3);
		height: 0;
		padding-top: calc((100% - 24rpx) / 3);
		border-radius: 14rpx;
		overflow: hidden;
		background: #eefbf3;
		box-sizing: border-box;
	}

	.shot-photo-picker--add {
		width: calc((100% - 24rpx) / 3);
		height: 0;
		padding-top: calc((100% - 24rpx) / 3);
	}

	.shot-photo-picker--empty {
		height: 220rpx;
	}

	.shot-photo-remove {
		position: absolute;
		top: 6rpx;
		right: 6rpx;
		width: 28rpx;
		height: 28rpx;
		border-radius: 999rpx;
		background: rgba(0, 0, 0, 0.45);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 3;
	}

	.measure-photo-picker {
		width: 100%;
		height: 180rpx;
		border-radius: 14rpx;
		border: 1px dashed #b9e5cb;
		background: #eefbf3;
		overflow: hidden;
	}

	.loosen-photo-picker {
		width: 100%;
		height: 180rpx;
		border-radius: 14rpx;
		border: 1px dashed #b9e5cb;
		background: #eefbf3;
		overflow: hidden;
	}

	.bug-photo-picker {
		width: 100%;
		height: 180rpx;
		border-radius: 14rpx;
		border: 1px dashed #b9e5cb;
		background: #eefbf3;
		overflow: hidden;
	}

	.watering-photo {
		width: 100%;
		height: 100%;
	}

	.fertilize-photo {
		width: 100%;
		height: 100%;
	}

	.prune-photo {
		width: 100%;
		height: 100%;
	}

	.repot-photo {
		width: 100%;
		height: 100%;
	}

	.shot-photo {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.measure-photo {
		width: 100%;
		height: 100%;
	}

	.loosen-photo {
		width: 100%;
		height: 100%;
	}

	.bug-photo {
		width: 100%;
		height: 100%;
	}

	.watering-photo-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		font-size: 22rpx;
		color: #2f8f56;
	}

	.fertilize-photo-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		font-size: 22rpx;
		color: #2f8f56;
	}

	.prune-photo-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		font-size: 22rpx;
		color: #2f8f56;
	}

	.repot-photo-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		font-size: 22rpx;
		color: #2f8f56;
	}

	.shot-photo-placeholder {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		font-size: 22rpx;
		color: #2f8f56;
		text-align: center;
		padding: 10rpx;
		box-sizing: border-box;
	}

	.shot-photo-placeholder--add {
		gap: 6rpx;
	}

	.shot-photo-placeholder--empty {
		gap: 10rpx;
	}

	.shot-photo-main-text {
		font-size: 22rpx;
		color: #2f8f56;
		line-height: 1.3;
	}

	.shot-photo-sub-text {
		font-size: 20rpx;
		color: #8ab99f;
		line-height: 1.3;
	}

	.shot-photo-count {
		font-size: 20rpx;
		color: #6c9a7f;
	}

	.measure-photo-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		font-size: 22rpx;
		color: #2f8f56;
	}

	.loosen-photo-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		font-size: 22rpx;
		color: #2f8f56;
	}

	.bug-photo-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		font-size: 22rpx;
		color: #2f8f56;
	}

	.watering-submit-wrap {
		margin-top: 20rpx;
	}

	.fertilize-submit-wrap {
		margin-top: 20rpx;
	}

	.prune-submit-wrap {
		margin-top: 20rpx;
	}

	.repot-submit-wrap {
		margin-top: 20rpx;
	}

	.shot-submit-wrap {
		margin-top: 20rpx;
	}

	.measure-submit-wrap {
		margin-top: 20rpx;
	}

	.loosen-submit-wrap {
		margin-top: 20rpx;
	}

	.bug-submit-wrap {
		margin-top: 20rpx;
	}

	:deep(.u-form-item__body__left__content__label) {
		white-space: nowrap;
		font-size: 26rpx;
		color: #294f38;
	}

	:deep(.u-form-item__body__left) {
		width: auto !important;
	}

	:deep(.u-form-item__body__left__content) {
		flex: none;
		width: fit-content;
		padding-right: 0;
	}

	:deep(.u-form-item__body) {
		padding: 8px 0;
	}
</style>
