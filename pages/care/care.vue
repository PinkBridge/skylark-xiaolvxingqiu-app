<template>
	<view class="care-page">
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
				<text class="section-title">今日呵护</text>
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
					<view v-else class="empty-text">今日暂无待呵护活动</view>
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
					<view v-else class="empty-text">未来三天暂无待呵护活动</view>
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
								</view>
							</view>
							<view class="task-action task-action-done">
								<up-icon name="checkmark-circle-fill" size="22" color="#33c26d"></up-icon>
							</view>
						</view>
					</view>
					<view v-else class="empty-text">最近10天暂无已完成任务</view>
					<text class="section-tip">仅展示最近10天的呵护记录</text>
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
						<view class="shot-photo-picker" @tap="openPhotoSourceSheet('shot')">
							<image
								v-if="shotForm.photo"
								class="shot-photo"
								:src="shotForm.photo"
								mode="aspectFill"
							></image>
							<view v-else class="shot-photo-placeholder">
								<up-icon name="camera-fill" size="20" color="#33c26d"></up-icon>
								<text>拍照或从相册选择</text>
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

const careTaskList = ref([
	{ id: 't1', offset: 0, icon: '/static/icon/water.png', name: '浇水', plantName: '常春藤', timeText: '今天 09:30', completed: false },
	{ id: 't2', offset: 0, icon: '/static/icon/fertilize.png', name: '施肥', plantName: '龟背竹', timeText: '今天 10:00', completed: false },
	{ id: 't3', offset: 0, icon: '/static/icon/prune.png', name: '修剪', plantName: '发财树', timeText: '今天 11:30', completed: false },
	{ id: 't4', offset: 0, icon: '/static/icon/repot.png', name: '换盆', plantName: '多肉白牡丹', timeText: '今天 14:00', completed: false },
	{ id: 't5', offset: 0, icon: '/static/icon/pest.png', name: '病虫害', plantName: '吊兰', timeText: '今天 15:20', completed: false },
	{ id: 't6', offset: 0, icon: '/static/icon/measure.png', name: '测量', plantName: '虎皮兰', timeText: '今天 17:00', completed: true },
	{ id: 't7', offset: 0, icon: '/static/icon/photo.png', name: '拍照', plantName: '绿萝', timeText: '今天 18:30', completed: false },
	{ id: 't8', offset: 0, icon: '/static/icon/loosen.png', name: '松土', plantName: '琴叶榕', timeText: '今天 20:00', completed: false },
	{ id: 't9', offset: 1, icon: '/static/icon/water.png', name: '浇水', plantName: '绿萝', timeText: '明天 09:30', completed: false },
	{ id: 't10', offset: 2, icon: '/static/icon/fertilize.png', name: '施肥', plantName: '常春藤', timeText: '后天 10:00', completed: false },
	{ id: 't11', offset: 3, icon: '/static/icon/measure.png', name: '测量', plantName: '虎皮兰', timeText: '第3天 20:00', completed: false }
])

const completedTaskHistory = ref([
	{ id: 'c1', icon: '/static/icon/water.png', name: '浇水', plantName: '常春藤', dayAgo: 1, completeText: '1天前 09:20 完成' },
	{ id: 'c2', icon: '/static/icon/prune.png', name: '修剪', plantName: '发财树', dayAgo: 2, completeText: '2天前 18:10 完成' },
	{ id: 'c3', icon: '/static/icon/fertilize.png', name: '施肥', plantName: '龟背竹', dayAgo: 4, completeText: '4天前 10:00 完成' },
	{ id: 'c4', icon: '/static/icon/measure.png', name: '测量', plantName: '虎皮兰', dayAgo: 7, completeText: '7天前 20:30 完成' },
	{ id: 'c5', icon: '/static/icon/photo.png', name: '拍照', plantName: '绿萝', dayAgo: 10, completeText: '10天前 19:40 完成' }
])

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
	photo: '',
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
	shotForm.photo = ''
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
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: action.sourceType,
		success: (res) => {
			const photoPath = res.tempFilePaths?.[0] || ''
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
				shotForm.photo = photoPath
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

const getCurrentTimeText = (offset) => {
	const now = new Date()
	const hh = `${now.getHours()}`.padStart(2, '0')
	const mm = `${now.getMinutes()}`.padStart(2, '0')
	return `${getDayLabel(offset)} ${hh}:${mm}`
}

const submitWateringRecord = () => {
	const task = careTaskList.value.find((item) => item.id === activeWateringTaskId.value)
	if (!task) {
		showWateringPopup.value = false
		return
	}

	task.completed = true
	task.timeText = getCurrentTimeText(task.offset)

	showWateringPopup.value = false
	uni.showToast({
		title: '浇水记录已保存',
		icon: 'success'
	})
}

const submitFertilizeRecord = () => {
	const task = careTaskList.value.find((item) => item.id === activeFertilizeTaskId.value)
	if (!task) {
		showFertilizePopup.value = false
		return
	}

	task.completed = true
	task.timeText = getCurrentTimeText(task.offset)

	showFertilizePopup.value = false
	uni.showToast({
		title: '施肥记录已保存',
		icon: 'success'
	})
}

const submitPruneRecord = () => {
	const task = careTaskList.value.find((item) => item.id === activePruneTaskId.value)
	if (!task) {
		showPrunePopup.value = false
		return
	}

	task.completed = true
	task.timeText = getCurrentTimeText(task.offset)

	showPrunePopup.value = false
	uni.showToast({
		title: '修剪记录已保存',
		icon: 'success'
	})
}

const submitRepotRecord = () => {
	const task = careTaskList.value.find((item) => item.id === activeRepotTaskId.value)
	if (!task) {
		showRepotPopup.value = false
		return
	}

	task.completed = true
	task.timeText = getCurrentTimeText(task.offset)

	showRepotPopup.value = false
	uni.showToast({
		title: '换盆记录已保存',
		icon: 'success'
	})
}

const submitShotRecord = () => {
	if (!shotForm.photo) {
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

	const task = careTaskList.value.find((item) => item.id === activeShotTaskId.value)
	if (!task) {
		showShotPopup.value = false
		return
	}

	task.completed = true
	task.timeText = getCurrentTimeText(task.offset)

	showShotPopup.value = false
	uni.showToast({
		title: '拍照记录已保存',
		icon: 'success'
	})
}

const submitMeasureRecord = () => {
	const task = careTaskList.value.find((item) => item.id === activeMeasureTaskId.value)
	if (!task) {
		showMeasurePopup.value = false
		return
	}

	task.completed = true
	task.timeText = getCurrentTimeText(task.offset)

	showMeasurePopup.value = false
	uni.showToast({
		title: '测量记录已保存',
		icon: 'success'
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

	const task = careTaskList.value.find((item) => item.id === activeLoosenTaskId.value)
	if (!task) {
		showLoosenPopup.value = false
		return
	}

	task.completed = true
	task.timeText = getCurrentTimeText(task.offset)

	showLoosenPopup.value = false
	uni.showToast({
		title: '松土记录已保存',
		icon: 'success'
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

	const task = careTaskList.value.find((item) => item.id === activeBugTaskId.value)
	if (!task) {
		showBugPopup.value = false
		return
	}

	task.completed = true
	task.timeText = getCurrentTimeText(task.offset)

	showBugPopup.value = false
	uni.showToast({
		title: '病虫害记录已保存',
		icon: 'success'
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
			todayPendingTasks.forEach((task) => {
				task.completed = true
			})
		}
	})
}
</script>

<style scoped lang="scss">
	.care-page {
		min-height: 100vh;
		padding: 20rpx 24rpx 24rpx;
		background: #f6fcf8;
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
		width: 100%;
		height: 180rpx;
		border-radius: 14rpx;
		border: 1px dashed #b9e5cb;
		background: #eefbf3;
		overflow: hidden;
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
