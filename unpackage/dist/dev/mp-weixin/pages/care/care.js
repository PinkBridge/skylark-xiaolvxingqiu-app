"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_card2 = common_vendor.resolveComponent("up-card");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_form_item2 = common_vendor.resolveComponent("up-form-item");
  const _easycom_up_subsection2 = common_vendor.resolveComponent("up-subsection");
  const _easycom_up_textarea2 = common_vendor.resolveComponent("up-textarea");
  const _easycom_up_form2 = common_vendor.resolveComponent("up-form");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  const _easycom_up_action_sheet2 = common_vendor.resolveComponent("up-action-sheet");
  (_easycom_up_icon2 + _easycom_up_card2 + _easycom_up_input2 + _easycom_up_form_item2 + _easycom_up_subsection2 + _easycom_up_textarea2 + _easycom_up_form2 + _easycom_up_button2 + _easycom_up_popup2 + _easycom_up_action_sheet2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_card = () => "../../uni_modules/uview-plus/components/u-card/u-card.js";
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_subsection = () => "../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
const _easycom_up_textarea = () => "../../uni_modules/uview-plus/components/u-textarea/u-textarea.js";
const _easycom_up_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
const _easycom_up_action_sheet = () => "../../uni_modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_card + _easycom_up_input + _easycom_up_form_item + _easycom_up_subsection + _easycom_up_textarea + _easycom_up_form + _easycom_up_button + _easycom_up_popup + _easycom_up_action_sheet)();
}
const SELECTED_GARDEN_KEY = "selectedGardenId";
const _sfc_main = {
  __name: "care",
  setup(__props) {
    const navMetrics = common_vendor.ref(resolveNavMetrics());
    function resolveNavMetrics() {
      const systemInfo = common_vendor.index.getSystemInfoSync ? common_vendor.index.getSystemInfoSync() : {};
      const statusBarHeight = Number(systemInfo.statusBarHeight || 20);
      let capsuleHeight = 32;
      let gap = 6;
      try {
        const menu = common_vendor.index.getMenuButtonBoundingClientRect ? common_vendor.index.getMenuButtonBoundingClientRect() : null;
        if (menu && menu.top && menu.height && menu.left) {
          capsuleHeight = menu.height;
          gap = Math.max(4, menu.top - statusBarHeight);
        }
      } catch (e) {
      }
      const navBarHeight = Math.max(statusBarHeight + capsuleHeight + gap * 2, statusBarHeight + 44);
      return {
        statusBarHeight,
        navBarHeight,
        contentBarHeight: navBarHeight - statusBarHeight
      };
    }
    const careTaskList = common_vendor.ref([]);
    const completedTaskHistory = common_vendor.ref([]);
    const selectedGardenId = common_vendor.ref("");
    const readSelectedGardenId = () => `${common_vendor.index.getStorageSync(SELECTED_GARDEN_KEY) || ""}`.trim();
    const todayTasks = common_vendor.computed(() => careTaskList.value.filter((task) => task.offset === 0));
    const upcomingTasks = common_vendor.computed(
      () => careTaskList.value.filter((task) => task.offset > 0 && task.offset <= 3).sort((a, b) => a.offset - b.offset)
    );
    const todayPendingCount = common_vendor.computed(() => todayTasks.value.filter((task) => !task.completed).length);
    const upcomingPendingCount = common_vendor.computed(() => upcomingTasks.value.filter((task) => !task.completed).length);
    const recentCompletedTasks = common_vendor.computed(
      () => completedTaskHistory.value.filter((task) => task.dayAgo <= 10).sort((a, b) => a.dayAgo - b.dayAgo)
    );
    const recentCompletedCount = common_vendor.computed(() => recentCompletedTasks.value.length);
    const showWateringPopup = common_vendor.ref(false);
    const activeWateringTaskId = common_vendor.ref("");
    const showFertilizePopup = common_vendor.ref(false);
    const activeFertilizeTaskId = common_vendor.ref("");
    const showPrunePopup = common_vendor.ref(false);
    const activePruneTaskId = common_vendor.ref("");
    const showRepotPopup = common_vendor.ref(false);
    const activeRepotTaskId = common_vendor.ref("");
    const showShotPopup = common_vendor.ref(false);
    const activeShotTaskId = common_vendor.ref("");
    const showMeasurePopup = common_vendor.ref(false);
    const activeMeasureTaskId = common_vendor.ref("");
    const showLoosenPopup = common_vendor.ref(false);
    const activeLoosenTaskId = common_vendor.ref("");
    const showBugPopup = common_vendor.ref(false);
    const activeBugTaskId = common_vendor.ref("");
    const showPhotoSourceSheet = common_vendor.ref(false);
    const showFertilizeMaterialSheet = common_vendor.ref(false);
    const showBugTypeSheet = common_vendor.ref(false);
    const showBugTreatmentSheet = common_vendor.ref(false);
    const photoUploadTarget = common_vendor.ref("watering");
    const wateringMethodOptions = ["常规浇水", "浸盆法", "喷雾"];
    const wateringMethodIndex = common_vendor.ref(-1);
    const fertilizeMaterialOptions = ["花多多1号", "花多多2号", "硝酸2氢钾", "硫酸亚铁", "复合肥"];
    const fertilizeMaterialActions = fertilizeMaterialOptions.map((name) => ({ name }));
    const prunePartOptions = ["枯枝", "黄叶", "徒长枝", "病枝", "整形修剪"];
    const prunePartIndex = common_vendor.ref(-1);
    const photoSourceActions = [
      { name: "拍照", sourceType: ["camera"] },
      { name: "从相册选择", sourceType: ["album"] }
    ];
    const bugTypeOptions = ["蚜虫", "红蜘蛛", "白粉虱", "介壳虫", "白粉病", "根腐病", "灰霉病", "炭疽病", "其他"];
    const bugTypeActions = bugTypeOptions.map((name) => ({ name }));
    const bugTreatmentOptions = ["物理清除", "肥皂水", "酒精擦拭", "专用药剂", "隔离观察"];
    const bugTreatmentActions = bugTreatmentOptions.map((name) => ({ name }));
    const wateringForm = common_vendor.reactive({
      amount: "",
      method: "",
      photo: "",
      note: ""
    });
    const fertilizeForm = common_vendor.reactive({
      material: "",
      photo: "",
      note: ""
    });
    const pruneForm = common_vendor.reactive({
      part: "",
      photo: "",
      note: ""
    });
    const repotForm = common_vendor.reactive({
      potSize: "",
      photo: "",
      note: ""
    });
    const shotForm = common_vendor.reactive({
      photos: [],
      note: ""
    });
    const measureForm = common_vendor.reactive({
      weight: "",
      height: "",
      photo: "",
      note: ""
    });
    const loosenForm = common_vendor.reactive({
      photo: "",
      note: ""
    });
    const bugForm = common_vendor.reactive({
      type: "",
      treatment: "",
      photo: "",
      note: ""
    });
    const loadCareTasks = () => {
      api_index.listCareTasks(selectedGardenId.value || void 0).then((tasks) => {
        careTaskList.value = tasks || [];
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加载任务失败",
          icon: "none"
        });
      });
    };
    const loadCompletedHistory = () => {
      const nowDate = /* @__PURE__ */ new Date();
      const currentMonth = nowDate.toISOString().slice(0, 7);
      const prevDate = new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, 1);
      const prevMonth = `${prevDate.getFullYear()}-${`${prevDate.getMonth() + 1}`.padStart(2, "0")}`;
      Promise.all([
        api_index.listCareActivitiesByMonth(currentMonth, selectedGardenId.value || void 0),
        api_index.listCareActivitiesByMonth(prevMonth, selectedGardenId.value || void 0)
      ]).then((results) => {
        const activities = [...results[0] || [], ...results[1] || []];
        const now = Date.now();
        completedTaskHistory.value = (activities || []).filter((item) => item.completed).map((item) => {
          const targetTime = (/* @__PURE__ */ new Date(`${item.date}T${item.time || "00:00"}:00`)).getTime();
          const dayAgo = Math.max(0, Math.floor((now - targetTime) / (24 * 3600 * 1e3)));
          return {
            id: item.id,
            icon: item.icon,
            name: item.name,
            plantName: item.plantName,
            dayAgo,
            completeText: `${dayAgo}天前 ${item.time || ""} 完成`,
            recordText: formatRecordSummary(item.name, item.record)
          };
        });
      }).catch(() => {
        completedTaskHistory.value = [];
      });
    };
    const formatRecordSummary = (name, record) => {
      if (!record || typeof record !== "object")
        return "";
      if (name === "浇水") {
        const parts = [];
        if (record.amount !== void 0 && record.amount !== null && `${record.amount}` !== "") {
          parts.push(`水量${record.amount}ml`);
        }
        if (record.method)
          parts.push(`${record.method}`);
        return parts.join("，");
      }
      if (name === "施肥")
        return record.material ? `用料：${record.material}` : "";
      if (name === "修剪")
        return record.part ? `部位：${record.part}` : "";
      if (name === "换盆")
        return record.potSize ? `新盆：${record.potSize}` : "";
      if (name === "测量") {
        const parts = [];
        if (record.weight !== void 0 && record.weight !== null && `${record.weight}` !== "") {
          parts.push(`重量${record.weight}g`);
        }
        if (record.height !== void 0 && record.height !== null && `${record.height}` !== "") {
          parts.push(`高度${record.height}cm`);
        }
        return parts.join("，");
      }
      if (name === "病虫害") {
        const parts = [];
        if (record.type)
          parts.push(`类型：${record.type}`);
        if (record.treatment)
          parts.push(`处理：${record.treatment}`);
        return parts.join("，");
      }
      if (name === "拍照") {
        const count = Array.isArray(record.photos) ? record.photos.filter(Boolean).length : 0;
        if (count > 0)
          return `已上传${count}张照片`;
        return record.photo ? "已上传1张照片" : "";
      }
      if (name === "松土")
        return record.photo ? "已上传照片" : "";
      return "";
    };
    const getDayLabel = (offset) => {
      if (offset <= 0)
        return "今天";
      if (offset === 1)
        return "明天";
      if (offset === 2)
        return "后天";
      return `第${offset}天`;
    };
    const resetWateringForm = () => {
      wateringForm.amount = "";
      wateringForm.method = "";
      wateringForm.photo = "";
      wateringForm.note = "";
      wateringMethodIndex.value = -1;
    };
    const resetFertilizeForm = () => {
      fertilizeForm.material = "";
      fertilizeForm.photo = "";
      fertilizeForm.note = "";
    };
    const resetPruneForm = () => {
      pruneForm.part = "";
      pruneForm.photo = "";
      pruneForm.note = "";
      prunePartIndex.value = -1;
    };
    const resetRepotForm = () => {
      repotForm.potSize = "";
      repotForm.photo = "";
      repotForm.note = "";
    };
    const resetShotForm = () => {
      shotForm.photos = [];
      shotForm.note = "";
    };
    const resetMeasureForm = () => {
      measureForm.weight = "";
      measureForm.height = "";
      measureForm.photo = "";
      measureForm.note = "";
    };
    const resetLoosenForm = () => {
      loosenForm.photo = "";
      loosenForm.note = "";
    };
    const resetBugForm = () => {
      bugForm.type = "";
      bugForm.treatment = "";
      bugForm.photo = "";
      bugForm.note = "";
    };
    const toggleTask = (taskId) => {
      const task = careTaskList.value.find((item) => item.id === taskId);
      if (!task)
        return;
      task.completed = !task.completed;
    };
    const handleTaskTap = (task) => {
      if (task.name === "浇水") {
        activeWateringTaskId.value = task.id;
        resetWateringForm();
        showWateringPopup.value = true;
        return;
      }
      if (task.name === "施肥") {
        activeFertilizeTaskId.value = task.id;
        resetFertilizeForm();
        showFertilizePopup.value = true;
        return;
      }
      if (task.name === "修剪") {
        activePruneTaskId.value = task.id;
        resetPruneForm();
        showPrunePopup.value = true;
        return;
      }
      if (task.name === "换盆") {
        activeRepotTaskId.value = task.id;
        resetRepotForm();
        showRepotPopup.value = true;
        return;
      }
      if (task.name === "拍照") {
        activeShotTaskId.value = task.id;
        resetShotForm();
        showShotPopup.value = true;
        return;
      }
      if (task.name === "测量") {
        activeMeasureTaskId.value = task.id;
        resetMeasureForm();
        showMeasurePopup.value = true;
        return;
      }
      if (task.name === "松土") {
        activeLoosenTaskId.value = task.id;
        resetLoosenForm();
        showLoosenPopup.value = true;
        return;
      }
      if (task.name === "病虫害") {
        activeBugTaskId.value = task.id;
        resetBugForm();
        showBugPopup.value = true;
        return;
      }
      toggleTask(task.id);
    };
    const onWateringMethodChange = (index) => {
      wateringMethodIndex.value = index;
      wateringForm.method = wateringMethodOptions[index] || "";
    };
    const onFertilizeMaterialSelect = (action) => {
      showFertilizeMaterialSheet.value = false;
      fertilizeForm.material = (action == null ? void 0 : action.name) || "";
    };
    const onBugTypeSelect = (action) => {
      showBugTypeSheet.value = false;
      bugForm.type = (action == null ? void 0 : action.name) || "";
    };
    const onBugTreatmentSelect = (action) => {
      showBugTreatmentSheet.value = false;
      bugForm.treatment = (action == null ? void 0 : action.name) || "";
    };
    const onPrunePartChange = (index) => {
      prunePartIndex.value = index;
      pruneForm.part = prunePartOptions[index] || "";
    };
    const openPhotoSourceSheet = (target = "watering") => {
      photoUploadTarget.value = target;
      showPhotoSourceSheet.value = true;
    };
    const onPhotoSourceSelect = (action) => {
      var _a;
      showPhotoSourceSheet.value = false;
      const remaining = 9 - (((_a = shotForm.photos) == null ? void 0 : _a.length) || 0);
      if (photoUploadTarget.value === "shot" && remaining <= 0) {
        common_vendor.index.showToast({
          title: "最多上传9张图片",
          icon: "none"
        });
        return;
      }
      const maxCount = photoUploadTarget.value === "shot" ? remaining : 1;
      common_vendor.index.chooseImage({
        count: maxCount,
        sizeType: ["compressed"],
        sourceType: action.sourceType,
        success: (res) => {
          const picked = Array.isArray(res.tempFilePaths) ? res.tempFilePaths.filter(Boolean) : [];
          const photoPath = picked[0] || "";
          if (photoUploadTarget.value === "fertilize") {
            fertilizeForm.photo = photoPath;
            return;
          }
          if (photoUploadTarget.value === "prune") {
            pruneForm.photo = photoPath;
            return;
          }
          if (photoUploadTarget.value === "repot") {
            repotForm.photo = photoPath;
            return;
          }
          if (photoUploadTarget.value === "shot") {
            shotForm.photos = [...shotForm.photos || [], ...picked].slice(0, 9);
            return;
          }
          if (photoUploadTarget.value === "measure") {
            measureForm.photo = photoPath;
            return;
          }
          if (photoUploadTarget.value === "loosen") {
            loosenForm.photo = photoPath;
            return;
          }
          if (photoUploadTarget.value === "bug") {
            bugForm.photo = photoPath;
            return;
          }
          wateringForm.photo = photoPath;
        }
      });
    };
    const onRemoveShotPhoto = (idx) => {
      if (idx < 0 || idx >= shotForm.photos.length)
        return;
      shotForm.photos.splice(idx, 1);
    };
    const onPreviewShotPhoto = (idx) => {
      if (idx < 0 || idx >= shotForm.photos.length)
        return;
      common_vendor.index.previewImage({
        urls: shotForm.photos,
        current: shotForm.photos[idx]
      });
    };
    const submitWateringRecord = () => {
      var _a;
      const taskId = activeWateringTaskId.value;
      if (!taskId)
        return;
      api_index.completeCareTask(taskId, {
        amount: wateringForm.amount ? Number(wateringForm.amount) : null,
        method: wateringForm.method || null,
        photo: wateringForm.photo || null,
        note: ((_a = wateringForm.note) == null ? void 0 : _a.trim()) || null
      }).then(() => {
        showWateringPopup.value = false;
        loadCareTasks();
        loadCompletedHistory();
        common_vendor.index.showToast({
          title: "浇水记录已保存",
          icon: "success"
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "保存失败",
          icon: "none"
        });
      });
    };
    const submitFertilizeRecord = () => {
      var _a;
      const taskId = activeFertilizeTaskId.value;
      if (!taskId)
        return;
      api_index.completeCareTask(taskId, {
        material: fertilizeForm.material || null,
        photo: fertilizeForm.photo || null,
        note: ((_a = fertilizeForm.note) == null ? void 0 : _a.trim()) || null
      }).then(() => {
        showFertilizePopup.value = false;
        loadCareTasks();
        loadCompletedHistory();
        common_vendor.index.showToast({ title: "施肥记录已保存", icon: "success" });
      }).catch((err) => {
        common_vendor.index.showToast({ title: (err == null ? void 0 : err.message) || "保存失败", icon: "none" });
      });
    };
    const submitPruneRecord = () => {
      var _a;
      const taskId = activePruneTaskId.value;
      if (!taskId)
        return;
      api_index.completeCareTask(taskId, {
        part: pruneForm.part || null,
        photo: pruneForm.photo || null,
        note: ((_a = pruneForm.note) == null ? void 0 : _a.trim()) || null
      }).then(() => {
        showPrunePopup.value = false;
        loadCareTasks();
        loadCompletedHistory();
        common_vendor.index.showToast({ title: "修剪记录已保存", icon: "success" });
      }).catch((err) => {
        common_vendor.index.showToast({ title: (err == null ? void 0 : err.message) || "保存失败", icon: "none" });
      });
    };
    const submitRepotRecord = () => {
      var _a;
      const taskId = activeRepotTaskId.value;
      if (!taskId)
        return;
      api_index.completeCareTask(taskId, {
        potSize: repotForm.potSize || null,
        photo: repotForm.photo || null,
        note: ((_a = repotForm.note) == null ? void 0 : _a.trim()) || null
      }).then(() => {
        showRepotPopup.value = false;
        loadCareTasks();
        loadCompletedHistory();
        common_vendor.index.showToast({ title: "换盆记录已保存", icon: "success" });
      }).catch((err) => {
        common_vendor.index.showToast({ title: (err == null ? void 0 : err.message) || "保存失败", icon: "none" });
      });
    };
    const submitShotRecord = () => {
      var _a;
      if (!shotForm.photos.length) {
        common_vendor.index.showToast({
          title: "请先上传图片",
          icon: "none"
        });
        return;
      }
      if (!shotForm.note.trim()) {
        common_vendor.index.showToast({
          title: "请填写备注",
          icon: "none"
        });
        return;
      }
      const taskId = activeShotTaskId.value;
      if (!taskId)
        return;
      api_index.completeCareTask(taskId, {
        photo: shotForm.photos[0] || null,
        photos: shotForm.photos.length ? shotForm.photos : null,
        note: ((_a = shotForm.note) == null ? void 0 : _a.trim()) || null
      }).then(() => {
        showShotPopup.value = false;
        loadCareTasks();
        loadCompletedHistory();
        common_vendor.index.showToast({ title: "拍照记录已保存", icon: "success" });
      }).catch((err) => {
        common_vendor.index.showToast({ title: (err == null ? void 0 : err.message) || "保存失败", icon: "none" });
      });
    };
    const submitMeasureRecord = () => {
      var _a;
      const taskId = activeMeasureTaskId.value;
      if (!taskId)
        return;
      api_index.completeCareTask(taskId, {
        weight: measureForm.weight ? Number(measureForm.weight) : null,
        height: measureForm.height ? Number(measureForm.height) : null,
        photo: measureForm.photo || null,
        note: ((_a = measureForm.note) == null ? void 0 : _a.trim()) || null
      }).then(() => {
        showMeasurePopup.value = false;
        loadCareTasks();
        loadCompletedHistory();
        common_vendor.index.showToast({ title: "测量记录已保存", icon: "success" });
      }).catch((err) => {
        common_vendor.index.showToast({ title: (err == null ? void 0 : err.message) || "保存失败", icon: "none" });
      });
    };
    const submitLoosenRecord = () => {
      var _a;
      if (!loosenForm.photo) {
        common_vendor.index.showToast({
          title: "请先上传图片",
          icon: "none"
        });
        return;
      }
      if (!loosenForm.note.trim()) {
        common_vendor.index.showToast({
          title: "请填写备注",
          icon: "none"
        });
        return;
      }
      const taskId = activeLoosenTaskId.value;
      if (!taskId)
        return;
      api_index.completeCareTask(taskId, {
        photo: loosenForm.photo || null,
        note: ((_a = loosenForm.note) == null ? void 0 : _a.trim()) || null
      }).then(() => {
        showLoosenPopup.value = false;
        loadCareTasks();
        loadCompletedHistory();
        common_vendor.index.showToast({ title: "松土记录已保存", icon: "success" });
      }).catch((err) => {
        common_vendor.index.showToast({ title: (err == null ? void 0 : err.message) || "保存失败", icon: "none" });
      });
    };
    const submitBugRecord = () => {
      var _a;
      if (!bugForm.type) {
        common_vendor.index.showToast({
          title: "请选择病虫害类型",
          icon: "none"
        });
        return;
      }
      if (!bugForm.treatment.trim()) {
        common_vendor.index.showToast({
          title: "请选择处理方式",
          icon: "none"
        });
        return;
      }
      const taskId = activeBugTaskId.value;
      if (!taskId)
        return;
      api_index.completeCareTask(taskId, {
        type: bugForm.type || null,
        treatment: bugForm.treatment || null,
        photo: bugForm.photo || null,
        note: ((_a = bugForm.note) == null ? void 0 : _a.trim()) || null
      }).then(() => {
        showBugPopup.value = false;
        loadCareTasks();
        loadCompletedHistory();
        common_vendor.index.showToast({ title: "病虫害记录已保存", icon: "success" });
      }).catch((err) => {
        common_vendor.index.showToast({ title: (err == null ? void 0 : err.message) || "保存失败", icon: "none" });
      });
    };
    const completeTodayTasks = () => {
      const todayPendingTasks = careTaskList.value.filter((task) => task.offset === 0 && !task.completed);
      if (!todayPendingTasks.length)
        return;
      common_vendor.index.showModal({
        title: "确认完成",
        content: `确认将今日 ${todayPendingTasks.length} 项任务全部标记为已完成吗？`,
        confirmColor: "#33c26d",
        success: (res) => {
          if (!res.confirm)
            return;
          Promise.all(todayPendingTasks.map((task) => api_index.completeCareTask(task.id))).then(() => {
            loadCareTasks();
            loadCompletedHistory();
          }).catch((err) => {
            common_vendor.index.showToast({
              title: (err == null ? void 0 : err.message) || "批量完成失败",
              icon: "none"
            });
          });
        }
      });
    };
    const goIndexPage = () => {
      common_vendor.index.reLaunch({
        url: "/pages/index/index",
        fail: () => {
          common_vendor.index.redirectTo({
            url: "/pages/index/index"
          });
        }
      });
    };
    common_vendor.onShow(() => {
      selectedGardenId.value = readSelectedGardenId();
      loadCareTasks();
      loadCompletedHistory();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: "home",
          size: "14",
          color: "#33c26d"
        }),
        b: common_vendor.o(goIndexPage),
        c: `${navMetrics.value.statusBarHeight}px`,
        d: `${navMetrics.value.contentBarHeight}px`,
        e: common_vendor.p({
          name: "clock-fill",
          size: "22",
          color: "#33c26d"
        }),
        f: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        g: common_vendor.t(todayTasks.value.length),
        h: !todayPendingCount.value ? 1 : "",
        i: common_vendor.o(completeTodayTasks),
        j: todayTasks.value.length
      }, todayTasks.value.length ? {
        k: common_vendor.f(todayTasks.value, (task, k0, i0) => {
          return {
            a: "866f8a92-4-" + i0 + ",866f8a92-3",
            b: common_vendor.p({
              name: task.icon,
              size: "30",
              color: task.completed ? "#a5b5ac" : "#33c26d"
            }),
            c: common_vendor.t(task.name),
            d: common_vendor.t(task.plantName),
            e: common_vendor.t(task.completed ? task.timeText : getDayLabel(task.offset)),
            f: "866f8a92-5-" + i0 + ",866f8a92-3",
            g: common_vendor.p({
              name: task.completed ? "checkmark-circle-fill" : "checkmark-circle",
              size: "22",
              color: task.completed ? "#33c26d" : "#9db0a5"
            }),
            h: task.completed ? 1 : "",
            i: task.id,
            j: task.completed ? 1 : "",
            k: common_vendor.o(($event) => handleTaskTap(task), task.id)
          };
        })
      } : {}, {
        l: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        m: common_vendor.t(upcomingPendingCount.value),
        n: upcomingTasks.value.length
      }, upcomingTasks.value.length ? {
        o: common_vendor.f(upcomingTasks.value, (task, k0, i0) => {
          return {
            a: "866f8a92-7-" + i0 + ",866f8a92-6",
            b: common_vendor.p({
              name: task.icon,
              size: "30",
              color: task.completed ? "#a5b5ac" : "#33c26d"
            }),
            c: common_vendor.t(task.name),
            d: common_vendor.t(task.plantName),
            e: common_vendor.t(task.completed ? task.timeText : getDayLabel(task.offset)),
            f: "866f8a92-8-" + i0 + ",866f8a92-6",
            g: common_vendor.p({
              name: task.completed ? "checkmark-circle-fill" : "checkmark-circle",
              size: "22",
              color: task.completed ? "#33c26d" : "#9db0a5"
            }),
            h: task.completed ? 1 : "",
            i: task.id,
            j: task.completed ? 1 : "",
            k: common_vendor.o(($event) => handleTaskTap(task), task.id)
          };
        })
      } : {}, {
        p: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        q: common_vendor.t(recentCompletedCount.value),
        r: recentCompletedTasks.value.length
      }, recentCompletedTasks.value.length ? {
        s: common_vendor.f(recentCompletedTasks.value, (task, k0, i0) => {
          return common_vendor.e({
            a: "866f8a92-10-" + i0 + ",866f8a92-9",
            b: common_vendor.p({
              name: task.icon,
              size: "30",
              color: "#a5b5ac"
            }),
            c: common_vendor.t(task.name),
            d: common_vendor.t(task.plantName),
            e: common_vendor.t(task.completeText),
            f: task.recordText
          }, task.recordText ? {
            g: common_vendor.t(task.recordText)
          } : {}, {
            h: "866f8a92-11-" + i0 + ",866f8a92-9",
            i: task.id
          });
        }),
        t: common_vendor.p({
          name: "checkmark-circle-fill",
          size: "22",
          color: "#33c26d"
        })
      } : {}, {
        v: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        w: common_vendor.o(($event) => showWateringPopup.value = false),
        x: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        y: common_vendor.o(($event) => wateringForm.amount = $event),
        z: common_vendor.p({
          type: "number",
          placeholder: "选填，例如 180",
          border: "surround",
          clearable: true,
          modelValue: wateringForm.amount
        }),
        A: common_vendor.p({
          label: "水量（ml）"
        }),
        B: common_vendor.o(onWateringMethodChange),
        C: common_vendor.p({
          list: wateringMethodOptions,
          current: wateringMethodIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eaf9f0"
        }),
        D: common_vendor.p({
          label: "浇水方式"
        }),
        E: wateringForm.photo
      }, wateringForm.photo ? {
        F: wateringForm.photo
      } : {
        G: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        H: common_vendor.o(($event) => openPhotoSourceSheet("watering")),
        I: common_vendor.p({
          label: "添加照片"
        }),
        J: common_vendor.o(($event) => wateringForm.note = $event),
        K: common_vendor.p({
          placeholder: "选填：记录土壤湿度、环境变化等",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: wateringForm.note
        }),
        L: common_vendor.p({
          label: "备注"
        }),
        M: common_vendor.p({
          model: wateringForm,
          labelPosition: "top"
        }),
        N: common_vendor.o(submitWateringRecord),
        O: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        P: common_vendor.o(($event) => showWateringPopup.value = false),
        Q: common_vendor.p({
          show: showWateringPopup.value,
          mode: "bottom",
          round: "18"
        }),
        R: common_vendor.o(($event) => showFertilizePopup.value = false),
        S: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        T: common_vendor.t(fertilizeForm.material || "请选择施肥用料"),
        U: common_vendor.n(fertilizeForm.material ? "select-text" : "select-placeholder"),
        V: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#7bc59a"
        }),
        W: common_vendor.o(($event) => showFertilizeMaterialSheet.value = true),
        X: common_vendor.p({
          label: "施肥用料"
        }),
        Y: fertilizeForm.photo
      }, fertilizeForm.photo ? {
        Z: fertilizeForm.photo
      } : {
        aa: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        ab: common_vendor.o(($event) => openPhotoSourceSheet("fertilize")),
        ac: common_vendor.p({
          label: "添加照片"
        }),
        ad: common_vendor.o(($event) => fertilizeForm.note = $event),
        ae: common_vendor.p({
          placeholder: "选填：记录肥料浓度、植物状态等",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: fertilizeForm.note
        }),
        af: common_vendor.p({
          label: "备注"
        }),
        ag: common_vendor.p({
          model: fertilizeForm,
          labelPosition: "top"
        }),
        ah: common_vendor.o(submitFertilizeRecord),
        ai: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        aj: common_vendor.o(($event) => showFertilizePopup.value = false),
        ak: common_vendor.p({
          show: showFertilizePopup.value,
          mode: "bottom",
          round: "18"
        }),
        al: common_vendor.o(($event) => showPrunePopup.value = false),
        am: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        an: common_vendor.o(onPrunePartChange),
        ao: common_vendor.p({
          list: prunePartOptions,
          current: prunePartIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eaf9f0"
        }),
        ap: common_vendor.p({
          label: "修剪部位"
        }),
        aq: pruneForm.photo
      }, pruneForm.photo ? {
        ar: pruneForm.photo
      } : {
        as: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        at: common_vendor.o(($event) => openPhotoSourceSheet("prune")),
        av: common_vendor.p({
          label: "添加照片"
        }),
        aw: common_vendor.o(($event) => pruneForm.note = $event),
        ax: common_vendor.p({
          placeholder: "选填：记录修剪原因和预期效果",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: pruneForm.note
        }),
        ay: common_vendor.p({
          label: "备注"
        }),
        az: common_vendor.p({
          model: pruneForm,
          labelPosition: "top"
        }),
        aA: common_vendor.o(submitPruneRecord),
        aB: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        aC: common_vendor.o(($event) => showPrunePopup.value = false),
        aD: common_vendor.p({
          show: showPrunePopup.value,
          mode: "bottom",
          round: "18"
        }),
        aE: common_vendor.o(($event) => showRepotPopup.value = false),
        aF: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        aG: common_vendor.o(($event) => repotForm.potSize = $event),
        aH: common_vendor.p({
          placeholder: "选填：如 18cm",
          border: "surround",
          clearable: true,
          modelValue: repotForm.potSize
        }),
        aI: common_vendor.p({
          label: "新盆尺寸（直径）"
        }),
        aJ: repotForm.photo
      }, repotForm.photo ? {
        aK: repotForm.photo
      } : {
        aL: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        aM: common_vendor.o(($event) => openPhotoSourceSheet("repot")),
        aN: common_vendor.p({
          label: "添加照片"
        }),
        aO: common_vendor.o(($event) => repotForm.note = $event),
        aP: common_vendor.p({
          placeholder: "选填：记录换盆原因和土壤配置",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: repotForm.note
        }),
        aQ: common_vendor.p({
          label: "备注"
        }),
        aR: common_vendor.p({
          model: repotForm,
          labelPosition: "top"
        }),
        aS: common_vendor.o(submitRepotRecord),
        aT: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        aU: common_vendor.o(($event) => showRepotPopup.value = false),
        aV: common_vendor.p({
          show: showRepotPopup.value,
          mode: "bottom",
          round: "18"
        }),
        aW: common_vendor.o(($event) => showShotPopup.value = false),
        aX: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        aY: !shotForm.photos.length
      }, !shotForm.photos.length ? {
        aZ: common_vendor.p({
          name: "camera-fill",
          size: "24",
          color: "#33c26d"
        }),
        ba: common_vendor.o(($event) => openPhotoSourceSheet("shot"))
      } : common_vendor.e({
        bb: common_vendor.f(shotForm.photos, (photo, idx, i0) => {
          return {
            a: photo,
            b: "866f8a92-59-" + i0 + ",866f8a92-57",
            c: common_vendor.o(($event) => onRemoveShotPhoto(idx), `${photo}-${idx}`),
            d: `${photo}-${idx}`,
            e: common_vendor.o(($event) => onPreviewShotPhoto(idx), `${photo}-${idx}`)
          };
        }),
        bc: common_vendor.p({
          name: "close",
          size: "10",
          color: "#ffffff"
        }),
        bd: shotForm.photos.length < 9
      }, shotForm.photos.length < 9 ? {
        be: common_vendor.p({
          name: "plus",
          size: "20",
          color: "#33c26d"
        }),
        bf: common_vendor.t(shotForm.photos.length),
        bg: common_vendor.o(($event) => openPhotoSourceSheet("shot"))
      } : {}), {
        bh: common_vendor.p({
          label: "上传图片"
        }),
        bi: common_vendor.o(($event) => shotForm.note = $event),
        bj: common_vendor.p({
          placeholder: "请输入拍照备注",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: shotForm.note
        }),
        bk: common_vendor.p({
          label: "备注"
        }),
        bl: common_vendor.p({
          model: shotForm,
          labelPosition: "top"
        }),
        bm: common_vendor.o(submitShotRecord),
        bn: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        bo: common_vendor.o(($event) => showShotPopup.value = false),
        bp: common_vendor.p({
          show: showShotPopup.value,
          mode: "bottom",
          round: "18"
        }),
        bq: common_vendor.o(($event) => showMeasurePopup.value = false),
        br: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        bs: common_vendor.o(($event) => measureForm.weight = $event),
        bt: common_vendor.p({
          type: "number",
          placeholder: "请输入重量，如 1250（g）",
          border: "surround",
          clearable: true,
          modelValue: measureForm.weight
        }),
        bv: common_vendor.p({
          label: "重量（含花盆）"
        }),
        bw: common_vendor.o(($event) => measureForm.height = $event),
        bx: common_vendor.p({
          type: "number",
          placeholder: "请输入高度，如 35（cm）",
          border: "surround",
          clearable: true,
          modelValue: measureForm.height
        }),
        by: common_vendor.p({
          label: "高度"
        }),
        bz: measureForm.photo
      }, measureForm.photo ? {
        bA: measureForm.photo
      } : {
        bB: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        bC: common_vendor.o(($event) => openPhotoSourceSheet("measure")),
        bD: common_vendor.p({
          label: "添加照片"
        }),
        bE: common_vendor.o(($event) => measureForm.note = $event),
        bF: common_vendor.p({
          placeholder: "选填：记录环境、温湿度等",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: measureForm.note
        }),
        bG: common_vendor.p({
          label: "备注"
        }),
        bH: common_vendor.p({
          model: measureForm,
          labelPosition: "top"
        }),
        bI: common_vendor.o(submitMeasureRecord),
        bJ: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        bK: common_vendor.o(($event) => showMeasurePopup.value = false),
        bL: common_vendor.p({
          show: showMeasurePopup.value,
          mode: "bottom",
          round: "18"
        }),
        bM: common_vendor.o(($event) => showLoosenPopup.value = false),
        bN: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        bO: loosenForm.photo
      }, loosenForm.photo ? {
        bP: loosenForm.photo
      } : {
        bQ: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        bR: common_vendor.o(($event) => openPhotoSourceSheet("loosen")),
        bS: common_vendor.p({
          label: "上传图片"
        }),
        bT: common_vendor.o(($event) => loosenForm.note = $event),
        bU: common_vendor.p({
          placeholder: "请输入松土备注",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: loosenForm.note
        }),
        bV: common_vendor.p({
          label: "备注"
        }),
        bW: common_vendor.p({
          model: loosenForm,
          labelPosition: "top"
        }),
        bX: common_vendor.o(submitLoosenRecord),
        bY: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        bZ: common_vendor.o(($event) => showLoosenPopup.value = false),
        ca: common_vendor.p({
          show: showLoosenPopup.value,
          mode: "bottom",
          round: "18"
        }),
        cb: common_vendor.o(($event) => showBugPopup.value = false),
        cc: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        cd: common_vendor.t(bugForm.type || "请选择病虫害类型"),
        ce: common_vendor.n(bugForm.type ? "select-text" : "select-placeholder"),
        cf: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#7bc59a"
        }),
        cg: common_vendor.o(($event) => showBugTypeSheet.value = true),
        ch: common_vendor.p({
          label: "病虫害类型"
        }),
        ci: common_vendor.t(bugForm.treatment || "请选择处理方式"),
        cj: common_vendor.n(bugForm.treatment ? "select-text" : "select-placeholder"),
        ck: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#7bc59a"
        }),
        cl: common_vendor.o(($event) => showBugTreatmentSheet.value = true),
        cm: common_vendor.p({
          label: "处理方式"
        }),
        cn: bugForm.photo
      }, bugForm.photo ? {
        co: bugForm.photo
      } : {
        cp: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        cq: common_vendor.o(($event) => openPhotoSourceSheet("bug")),
        cr: common_vendor.p({
          label: "添加照片"
        }),
        cs: common_vendor.o(($event) => bugForm.note = $event),
        ct: common_vendor.p({
          placeholder: "选填：记录症状和处理反馈",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: bugForm.note
        }),
        cv: common_vendor.p({
          label: "备注"
        }),
        cw: common_vendor.p({
          model: bugForm,
          labelPosition: "top"
        }),
        cx: common_vendor.o(submitBugRecord),
        cy: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        cz: common_vendor.o(($event) => showBugPopup.value = false),
        cA: common_vendor.p({
          show: showBugPopup.value,
          mode: "bottom",
          round: "18"
        }),
        cB: common_vendor.o(onPhotoSourceSelect),
        cC: common_vendor.o(($event) => showPhotoSourceSheet.value = false),
        cD: common_vendor.p({
          show: showPhotoSourceSheet.value,
          actions: photoSourceActions,
          cancelText: "取消"
        }),
        cE: common_vendor.o(onFertilizeMaterialSelect),
        cF: common_vendor.o(($event) => showFertilizeMaterialSheet.value = false),
        cG: common_vendor.p({
          show: showFertilizeMaterialSheet.value,
          actions: common_vendor.unref(fertilizeMaterialActions),
          cancelText: "取消"
        }),
        cH: common_vendor.o(onBugTypeSelect),
        cI: common_vendor.o(($event) => showBugTypeSheet.value = false),
        cJ: common_vendor.p({
          show: showBugTypeSheet.value,
          actions: common_vendor.unref(bugTypeActions),
          cancelText: "取消"
        }),
        cK: common_vendor.o(onBugTreatmentSelect),
        cL: common_vendor.o(($event) => showBugTreatmentSheet.value = false),
        cM: common_vendor.p({
          show: showBugTreatmentSheet.value,
          actions: common_vendor.unref(bugTreatmentActions),
          cancelText: "取消"
        }),
        cN: `${navMetrics.value.navBarHeight + 12}px`
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-866f8a92"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/care/care.js.map
