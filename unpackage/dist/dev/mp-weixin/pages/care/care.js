"use strict";
const common_vendor = require("../../common/vendor.js");
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
const _sfc_main = {
  __name: "care",
  setup(__props) {
    const careTaskList = common_vendor.ref([
      { id: "t1", offset: 0, icon: "/static/icon/water.png", name: "浇水", plantName: "常春藤", timeText: "今天 09:30", completed: false },
      { id: "t2", offset: 0, icon: "/static/icon/fertilize.png", name: "施肥", plantName: "龟背竹", timeText: "今天 10:00", completed: false },
      { id: "t3", offset: 0, icon: "/static/icon/prune.png", name: "修剪", plantName: "发财树", timeText: "今天 11:30", completed: false },
      { id: "t4", offset: 0, icon: "/static/icon/repot.png", name: "换盆", plantName: "多肉白牡丹", timeText: "今天 14:00", completed: false },
      { id: "t5", offset: 0, icon: "/static/icon/pest.png", name: "病虫害", plantName: "吊兰", timeText: "今天 15:20", completed: false },
      { id: "t6", offset: 0, icon: "/static/icon/measure.png", name: "测量", plantName: "虎皮兰", timeText: "今天 17:00", completed: true },
      { id: "t7", offset: 0, icon: "/static/icon/photo.png", name: "拍照", plantName: "绿萝", timeText: "今天 18:30", completed: false },
      { id: "t8", offset: 0, icon: "/static/icon/loosen.png", name: "松土", plantName: "琴叶榕", timeText: "今天 20:00", completed: false },
      { id: "t9", offset: 1, icon: "/static/icon/water.png", name: "浇水", plantName: "绿萝", timeText: "明天 09:30", completed: false },
      { id: "t10", offset: 2, icon: "/static/icon/fertilize.png", name: "施肥", plantName: "常春藤", timeText: "后天 10:00", completed: false },
      { id: "t11", offset: 3, icon: "/static/icon/measure.png", name: "测量", plantName: "虎皮兰", timeText: "第3天 20:00", completed: false }
    ]);
    const completedTaskHistory = common_vendor.ref([
      { id: "c1", icon: "/static/icon/water.png", name: "浇水", plantName: "常春藤", dayAgo: 1, completeText: "1天前 09:20 完成" },
      { id: "c2", icon: "/static/icon/prune.png", name: "修剪", plantName: "发财树", dayAgo: 2, completeText: "2天前 18:10 完成" },
      { id: "c3", icon: "/static/icon/fertilize.png", name: "施肥", plantName: "龟背竹", dayAgo: 4, completeText: "4天前 10:00 完成" },
      { id: "c4", icon: "/static/icon/measure.png", name: "测量", plantName: "虎皮兰", dayAgo: 7, completeText: "7天前 20:30 完成" },
      { id: "c5", icon: "/static/icon/photo.png", name: "拍照", plantName: "绿萝", dayAgo: 10, completeText: "10天前 19:40 完成" }
    ]);
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
      photo: "",
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
      shotForm.photo = "";
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
      showPhotoSourceSheet.value = false;
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: action.sourceType,
        success: (res) => {
          var _a;
          const photoPath = ((_a = res.tempFilePaths) == null ? void 0 : _a[0]) || "";
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
            shotForm.photo = photoPath;
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
    const getCurrentTimeText = (offset) => {
      const now = /* @__PURE__ */ new Date();
      const hh = `${now.getHours()}`.padStart(2, "0");
      const mm = `${now.getMinutes()}`.padStart(2, "0");
      return `${getDayLabel(offset)} ${hh}:${mm}`;
    };
    const submitWateringRecord = () => {
      const task = careTaskList.value.find((item) => item.id === activeWateringTaskId.value);
      if (!task) {
        showWateringPopup.value = false;
        return;
      }
      task.completed = true;
      task.timeText = getCurrentTimeText(task.offset);
      showWateringPopup.value = false;
      common_vendor.index.showToast({
        title: "浇水记录已保存",
        icon: "success"
      });
    };
    const submitFertilizeRecord = () => {
      const task = careTaskList.value.find((item) => item.id === activeFertilizeTaskId.value);
      if (!task) {
        showFertilizePopup.value = false;
        return;
      }
      task.completed = true;
      task.timeText = getCurrentTimeText(task.offset);
      showFertilizePopup.value = false;
      common_vendor.index.showToast({
        title: "施肥记录已保存",
        icon: "success"
      });
    };
    const submitPruneRecord = () => {
      const task = careTaskList.value.find((item) => item.id === activePruneTaskId.value);
      if (!task) {
        showPrunePopup.value = false;
        return;
      }
      task.completed = true;
      task.timeText = getCurrentTimeText(task.offset);
      showPrunePopup.value = false;
      common_vendor.index.showToast({
        title: "修剪记录已保存",
        icon: "success"
      });
    };
    const submitRepotRecord = () => {
      const task = careTaskList.value.find((item) => item.id === activeRepotTaskId.value);
      if (!task) {
        showRepotPopup.value = false;
        return;
      }
      task.completed = true;
      task.timeText = getCurrentTimeText(task.offset);
      showRepotPopup.value = false;
      common_vendor.index.showToast({
        title: "换盆记录已保存",
        icon: "success"
      });
    };
    const submitShotRecord = () => {
      if (!shotForm.photo) {
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
      const task = careTaskList.value.find((item) => item.id === activeShotTaskId.value);
      if (!task) {
        showShotPopup.value = false;
        return;
      }
      task.completed = true;
      task.timeText = getCurrentTimeText(task.offset);
      showShotPopup.value = false;
      common_vendor.index.showToast({
        title: "拍照记录已保存",
        icon: "success"
      });
    };
    const submitMeasureRecord = () => {
      const task = careTaskList.value.find((item) => item.id === activeMeasureTaskId.value);
      if (!task) {
        showMeasurePopup.value = false;
        return;
      }
      task.completed = true;
      task.timeText = getCurrentTimeText(task.offset);
      showMeasurePopup.value = false;
      common_vendor.index.showToast({
        title: "测量记录已保存",
        icon: "success"
      });
    };
    const submitLoosenRecord = () => {
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
      const task = careTaskList.value.find((item) => item.id === activeLoosenTaskId.value);
      if (!task) {
        showLoosenPopup.value = false;
        return;
      }
      task.completed = true;
      task.timeText = getCurrentTimeText(task.offset);
      showLoosenPopup.value = false;
      common_vendor.index.showToast({
        title: "松土记录已保存",
        icon: "success"
      });
    };
    const submitBugRecord = () => {
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
      const task = careTaskList.value.find((item) => item.id === activeBugTaskId.value);
      if (!task) {
        showBugPopup.value = false;
        return;
      }
      task.completed = true;
      task.timeText = getCurrentTimeText(task.offset);
      showBugPopup.value = false;
      common_vendor.index.showToast({
        title: "病虫害记录已保存",
        icon: "success"
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
          todayPendingTasks.forEach((task) => {
            task.completed = true;
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: "clock-fill",
          size: "22",
          color: "#33c26d"
        }),
        b: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        c: common_vendor.t(todayTasks.value.length),
        d: !todayPendingCount.value ? 1 : "",
        e: common_vendor.o(completeTodayTasks),
        f: todayTasks.value.length
      }, todayTasks.value.length ? {
        g: common_vendor.f(todayTasks.value, (task, k0, i0) => {
          return {
            a: "866f8a92-3-" + i0 + ",866f8a92-2",
            b: common_vendor.p({
              name: task.icon,
              size: "30",
              color: task.completed ? "#a5b5ac" : "#33c26d"
            }),
            c: common_vendor.t(task.name),
            d: common_vendor.t(task.plantName),
            e: common_vendor.t(task.completed ? task.timeText : getDayLabel(task.offset)),
            f: "866f8a92-4-" + i0 + ",866f8a92-2",
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
        h: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        i: common_vendor.t(upcomingPendingCount.value),
        j: upcomingTasks.value.length
      }, upcomingTasks.value.length ? {
        k: common_vendor.f(upcomingTasks.value, (task, k0, i0) => {
          return {
            a: "866f8a92-6-" + i0 + ",866f8a92-5",
            b: common_vendor.p({
              name: task.icon,
              size: "30",
              color: task.completed ? "#a5b5ac" : "#33c26d"
            }),
            c: common_vendor.t(task.name),
            d: common_vendor.t(task.plantName),
            e: common_vendor.t(task.completed ? task.timeText : getDayLabel(task.offset)),
            f: "866f8a92-7-" + i0 + ",866f8a92-5",
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
        m: common_vendor.t(recentCompletedCount.value),
        n: recentCompletedTasks.value.length
      }, recentCompletedTasks.value.length ? {
        o: common_vendor.f(recentCompletedTasks.value, (task, k0, i0) => {
          return {
            a: "866f8a92-9-" + i0 + ",866f8a92-8",
            b: common_vendor.p({
              name: task.icon,
              size: "30",
              color: "#a5b5ac"
            }),
            c: common_vendor.t(task.name),
            d: common_vendor.t(task.plantName),
            e: common_vendor.t(task.completeText),
            f: "866f8a92-10-" + i0 + ",866f8a92-8",
            g: task.id
          };
        }),
        p: common_vendor.p({
          name: "checkmark-circle-fill",
          size: "22",
          color: "#33c26d"
        })
      } : {}, {
        q: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        r: common_vendor.o(($event) => showWateringPopup.value = false),
        s: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        t: common_vendor.o(($event) => wateringForm.amount = $event),
        v: common_vendor.p({
          type: "number",
          placeholder: "选填，例如 180",
          border: "surround",
          clearable: true,
          modelValue: wateringForm.amount
        }),
        w: common_vendor.p({
          label: "水量（ml）"
        }),
        x: common_vendor.o(onWateringMethodChange),
        y: common_vendor.p({
          list: wateringMethodOptions,
          current: wateringMethodIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eaf9f0"
        }),
        z: common_vendor.p({
          label: "浇水方式"
        }),
        A: wateringForm.photo
      }, wateringForm.photo ? {
        B: wateringForm.photo
      } : {
        C: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        D: common_vendor.o(($event) => openPhotoSourceSheet("watering")),
        E: common_vendor.p({
          label: "添加照片"
        }),
        F: common_vendor.o(($event) => wateringForm.note = $event),
        G: common_vendor.p({
          placeholder: "选填：记录土壤湿度、环境变化等",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: wateringForm.note
        }),
        H: common_vendor.p({
          label: "备注"
        }),
        I: common_vendor.p({
          model: wateringForm,
          labelPosition: "top"
        }),
        J: common_vendor.o(submitWateringRecord),
        K: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        L: common_vendor.o(($event) => showWateringPopup.value = false),
        M: common_vendor.p({
          show: showWateringPopup.value,
          mode: "bottom",
          round: "18"
        }),
        N: common_vendor.o(($event) => showFertilizePopup.value = false),
        O: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        P: common_vendor.t(fertilizeForm.material || "请选择施肥用料"),
        Q: common_vendor.n(fertilizeForm.material ? "select-text" : "select-placeholder"),
        R: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#7bc59a"
        }),
        S: common_vendor.o(($event) => showFertilizeMaterialSheet.value = true),
        T: common_vendor.p({
          label: "施肥用料"
        }),
        U: fertilizeForm.photo
      }, fertilizeForm.photo ? {
        V: fertilizeForm.photo
      } : {
        W: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        X: common_vendor.o(($event) => openPhotoSourceSheet("fertilize")),
        Y: common_vendor.p({
          label: "添加照片"
        }),
        Z: common_vendor.o(($event) => fertilizeForm.note = $event),
        aa: common_vendor.p({
          placeholder: "选填：记录肥料浓度、植物状态等",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: fertilizeForm.note
        }),
        ab: common_vendor.p({
          label: "备注"
        }),
        ac: common_vendor.p({
          model: fertilizeForm,
          labelPosition: "top"
        }),
        ad: common_vendor.o(submitFertilizeRecord),
        ae: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        af: common_vendor.o(($event) => showFertilizePopup.value = false),
        ag: common_vendor.p({
          show: showFertilizePopup.value,
          mode: "bottom",
          round: "18"
        }),
        ah: common_vendor.o(($event) => showPrunePopup.value = false),
        ai: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        aj: common_vendor.o(onPrunePartChange),
        ak: common_vendor.p({
          list: prunePartOptions,
          current: prunePartIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eaf9f0"
        }),
        al: common_vendor.p({
          label: "修剪部位"
        }),
        am: pruneForm.photo
      }, pruneForm.photo ? {
        an: pruneForm.photo
      } : {
        ao: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        ap: common_vendor.o(($event) => openPhotoSourceSheet("prune")),
        aq: common_vendor.p({
          label: "添加照片"
        }),
        ar: common_vendor.o(($event) => pruneForm.note = $event),
        as: common_vendor.p({
          placeholder: "选填：记录修剪原因和预期效果",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: pruneForm.note
        }),
        at: common_vendor.p({
          label: "备注"
        }),
        av: common_vendor.p({
          model: pruneForm,
          labelPosition: "top"
        }),
        aw: common_vendor.o(submitPruneRecord),
        ax: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        ay: common_vendor.o(($event) => showPrunePopup.value = false),
        az: common_vendor.p({
          show: showPrunePopup.value,
          mode: "bottom",
          round: "18"
        }),
        aA: common_vendor.o(($event) => showRepotPopup.value = false),
        aB: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        aC: common_vendor.o(($event) => repotForm.potSize = $event),
        aD: common_vendor.p({
          placeholder: "选填：如 18cm",
          border: "surround",
          clearable: true,
          modelValue: repotForm.potSize
        }),
        aE: common_vendor.p({
          label: "新盆尺寸（直径）"
        }),
        aF: repotForm.photo
      }, repotForm.photo ? {
        aG: repotForm.photo
      } : {
        aH: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        aI: common_vendor.o(($event) => openPhotoSourceSheet("repot")),
        aJ: common_vendor.p({
          label: "添加照片"
        }),
        aK: common_vendor.o(($event) => repotForm.note = $event),
        aL: common_vendor.p({
          placeholder: "选填：记录换盆原因和土壤配置",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: repotForm.note
        }),
        aM: common_vendor.p({
          label: "备注"
        }),
        aN: common_vendor.p({
          model: repotForm,
          labelPosition: "top"
        }),
        aO: common_vendor.o(submitRepotRecord),
        aP: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        aQ: common_vendor.o(($event) => showRepotPopup.value = false),
        aR: common_vendor.p({
          show: showRepotPopup.value,
          mode: "bottom",
          round: "18"
        }),
        aS: common_vendor.o(($event) => showShotPopup.value = false),
        aT: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        aU: shotForm.photo
      }, shotForm.photo ? {
        aV: shotForm.photo
      } : {
        aW: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        aX: common_vendor.o(($event) => openPhotoSourceSheet("shot")),
        aY: common_vendor.p({
          label: "上传图片"
        }),
        aZ: common_vendor.o(($event) => shotForm.note = $event),
        ba: common_vendor.p({
          placeholder: "请输入拍照备注",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: shotForm.note
        }),
        bb: common_vendor.p({
          label: "备注"
        }),
        bc: common_vendor.p({
          model: shotForm,
          labelPosition: "top"
        }),
        bd: common_vendor.o(submitShotRecord),
        be: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        bf: common_vendor.o(($event) => showShotPopup.value = false),
        bg: common_vendor.p({
          show: showShotPopup.value,
          mode: "bottom",
          round: "18"
        }),
        bh: common_vendor.o(($event) => showMeasurePopup.value = false),
        bi: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        bj: common_vendor.o(($event) => measureForm.weight = $event),
        bk: common_vendor.p({
          type: "number",
          placeholder: "请输入重量，如 1250（g）",
          border: "surround",
          clearable: true,
          modelValue: measureForm.weight
        }),
        bl: common_vendor.p({
          label: "重量（含花盆）"
        }),
        bm: common_vendor.o(($event) => measureForm.height = $event),
        bn: common_vendor.p({
          type: "number",
          placeholder: "请输入高度，如 35（cm）",
          border: "surround",
          clearable: true,
          modelValue: measureForm.height
        }),
        bo: common_vendor.p({
          label: "高度"
        }),
        bp: measureForm.photo
      }, measureForm.photo ? {
        bq: measureForm.photo
      } : {
        br: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        bs: common_vendor.o(($event) => openPhotoSourceSheet("measure")),
        bt: common_vendor.p({
          label: "添加照片"
        }),
        bv: common_vendor.o(($event) => measureForm.note = $event),
        bw: common_vendor.p({
          placeholder: "选填：记录环境、温湿度等",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: measureForm.note
        }),
        bx: common_vendor.p({
          label: "备注"
        }),
        by: common_vendor.p({
          model: measureForm,
          labelPosition: "top"
        }),
        bz: common_vendor.o(submitMeasureRecord),
        bA: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        bB: common_vendor.o(($event) => showMeasurePopup.value = false),
        bC: common_vendor.p({
          show: showMeasurePopup.value,
          mode: "bottom",
          round: "18"
        }),
        bD: common_vendor.o(($event) => showLoosenPopup.value = false),
        bE: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        bF: loosenForm.photo
      }, loosenForm.photo ? {
        bG: loosenForm.photo
      } : {
        bH: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        bI: common_vendor.o(($event) => openPhotoSourceSheet("loosen")),
        bJ: common_vendor.p({
          label: "上传图片"
        }),
        bK: common_vendor.o(($event) => loosenForm.note = $event),
        bL: common_vendor.p({
          placeholder: "请输入松土备注",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: loosenForm.note
        }),
        bM: common_vendor.p({
          label: "备注"
        }),
        bN: common_vendor.p({
          model: loosenForm,
          labelPosition: "top"
        }),
        bO: common_vendor.o(submitLoosenRecord),
        bP: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        bQ: common_vendor.o(($event) => showLoosenPopup.value = false),
        bR: common_vendor.p({
          show: showLoosenPopup.value,
          mode: "bottom",
          round: "18"
        }),
        bS: common_vendor.o(($event) => showBugPopup.value = false),
        bT: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        bU: common_vendor.t(bugForm.type || "请选择病虫害类型"),
        bV: common_vendor.n(bugForm.type ? "select-text" : "select-placeholder"),
        bW: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#7bc59a"
        }),
        bX: common_vendor.o(($event) => showBugTypeSheet.value = true),
        bY: common_vendor.p({
          label: "病虫害类型"
        }),
        bZ: common_vendor.t(bugForm.treatment || "请选择处理方式"),
        ca: common_vendor.n(bugForm.treatment ? "select-text" : "select-placeholder"),
        cb: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#7bc59a"
        }),
        cc: common_vendor.o(($event) => showBugTreatmentSheet.value = true),
        cd: common_vendor.p({
          label: "处理方式"
        }),
        ce: bugForm.photo
      }, bugForm.photo ? {
        cf: bugForm.photo
      } : {
        cg: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        ch: common_vendor.o(($event) => openPhotoSourceSheet("bug")),
        ci: common_vendor.p({
          label: "添加照片"
        }),
        cj: common_vendor.o(($event) => bugForm.note = $event),
        ck: common_vendor.p({
          placeholder: "选填：记录症状和处理反馈",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: bugForm.note
        }),
        cl: common_vendor.p({
          label: "备注"
        }),
        cm: common_vendor.p({
          model: bugForm,
          labelPosition: "top"
        }),
        cn: common_vendor.o(submitBugRecord),
        co: common_vendor.p({
          type: "primary",
          text: "保存并完成",
          color: "#33c26d",
          shape: "circle"
        }),
        cp: common_vendor.o(($event) => showBugPopup.value = false),
        cq: common_vendor.p({
          show: showBugPopup.value,
          mode: "bottom",
          round: "18"
        }),
        cr: common_vendor.o(onPhotoSourceSelect),
        cs: common_vendor.o(($event) => showPhotoSourceSheet.value = false),
        ct: common_vendor.p({
          show: showPhotoSourceSheet.value,
          actions: photoSourceActions,
          cancelText: "取消"
        }),
        cv: common_vendor.o(onFertilizeMaterialSelect),
        cw: common_vendor.o(($event) => showFertilizeMaterialSheet.value = false),
        cx: common_vendor.p({
          show: showFertilizeMaterialSheet.value,
          actions: common_vendor.unref(fertilizeMaterialActions),
          cancelText: "取消"
        }),
        cy: common_vendor.o(onBugTypeSelect),
        cz: common_vendor.o(($event) => showBugTypeSheet.value = false),
        cA: common_vendor.p({
          show: showBugTypeSheet.value,
          actions: common_vendor.unref(bugTypeActions),
          cancelText: "取消"
        }),
        cB: common_vendor.o(onBugTreatmentSelect),
        cC: common_vendor.o(($event) => showBugTreatmentSheet.value = false),
        cD: common_vendor.p({
          show: showBugTreatmentSheet.value,
          actions: common_vendor.unref(bugTreatmentActions),
          cancelText: "取消"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-866f8a92"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/care/care.js.map
