"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_form_item2 = common_vendor.resolveComponent("up-form-item");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_subsection2 = common_vendor.resolveComponent("up-subsection");
  const _easycom_up_textarea2 = common_vendor.resolveComponent("up-textarea");
  const _easycom_up_switch2 = common_vendor.resolveComponent("up-switch");
  const _easycom_up_form2 = common_vendor.resolveComponent("up-form");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_up_action_sheet2 = common_vendor.resolveComponent("up-action-sheet");
  const _easycom_up_datetime_picker2 = common_vendor.resolveComponent("up-datetime-picker");
  (_easycom_up_icon2 + _easycom_up_form_item2 + _easycom_up_input2 + _easycom_up_subsection2 + _easycom_up_textarea2 + _easycom_up_switch2 + _easycom_up_form2 + _easycom_up_button2 + _easycom_up_action_sheet2 + _easycom_up_datetime_picker2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_subsection = () => "../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
const _easycom_up_textarea = () => "../../uni_modules/uview-plus/components/u-textarea/u-textarea.js";
const _easycom_up_switch = () => "../../uni_modules/uview-plus/components/u-switch/u-switch.js";
const _easycom_up_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_action_sheet = () => "../../uni_modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
const _easycom_up_datetime_picker = () => "../../uni_modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_form_item + _easycom_up_input + _easycom_up_subsection + _easycom_up_textarea + _easycom_up_switch + _easycom_up_form + _easycom_up_button + _easycom_up_action_sheet + _easycom_up_datetime_picker)();
}
const _sfc_main = {
  __name: "add",
  setup(__props) {
    const cultivationOptions = ["土培", "水培"];
    const cultivationIndex = common_vendor.ref(0);
    const editPlantId = common_vendor.ref("");
    const selectedGardenId = common_vendor.ref("");
    const plantForm = common_vendor.reactive({
      image: "",
      name: "",
      species: "",
      cultivationType: "soil",
      plantingDate: "",
      note: ""
    });
    const careTaskOptions = [
      { key: "water", label: "浇水", icon: "heart-fill" },
      { key: "fertilize", label: "施肥", icon: "gift-fill" },
      { key: "loosen", label: "松土", icon: "grid-fill" },
      { key: "prune", label: "修剪", icon: "cut" },
      { key: "repot", label: "换盆", icon: "reload" },
      { key: "pest", label: "病虫害", icon: "warning-fill" },
      { key: "measure", label: "测量", icon: "map-fill" },
      { key: "photo", label: "拍照", icon: "camera-fill" }
    ];
    const defaultIntervalDaysMap = {
      water: 5,
      fertilize: 21,
      loosen: 30,
      prune: 30,
      repot: 365,
      pest: 7,
      measure: 14,
      photo: 7
    };
    const defaultIntervalDays = (taskKey) => defaultIntervalDaysMap[taskKey] || 3;
    const normalizeIntervalDays = (taskKey, value) => {
      const interval = Number(value);
      if (Number.isFinite(interval) && interval > 0)
        return interval;
      return defaultIntervalDays(taskKey);
    };
    const createTaskConfig = () => careTaskOptions.reduce((acc, task) => {
      acc[task.key] = { enabled: false, intervalDays: defaultIntervalDays(task.key) };
      return acc;
    }, {});
    const carePlanConfig = common_vendor.reactive({
      seasonalMode: false,
      tasks: createTaskConfig(),
      seasonTasks: {
        spring: createTaskConfig(),
        summer: createTaskConfig(),
        autumn: createTaskConfig(),
        winter: createTaskConfig()
      }
    });
    const seasonPlanOptions = [
      { key: "spring", label: "春季" },
      { key: "summer", label: "夏季" },
      { key: "autumn", label: "秋季" },
      { key: "winter", label: "冬季" }
    ];
    const activeSeasonIndex = common_vendor.ref(0);
    const seasonTabList = seasonPlanOptions.map((season) => season.label);
    const currentSeasonKey = common_vendor.computed(() => {
      var _a;
      return ((_a = seasonPlanOptions[activeSeasonIndex.value]) == null ? void 0 : _a.key) || "spring";
    });
    const currentTaskPlanMap = common_vendor.computed(() => {
      if (!carePlanConfig.seasonalMode)
        return carePlanConfig.tasks;
      return carePlanConfig.seasonTasks[currentSeasonKey.value];
    });
    const showImageSourceSheet = common_vendor.ref(false);
    const imageSourceActions = [
      { name: "拍照", sourceType: ["camera"] },
      { name: "从相册选择", sourceType: ["album"] }
    ];
    const showDatePicker = common_vendor.ref(false);
    const datePickerValue = common_vendor.ref(Date.now());
    const seasonKeyMap = {
      SPRING: "spring",
      SUMMER: "summer",
      AUTUMN: "autumn",
      WINTER: "winter"
    };
    const seasonApiMap = {
      spring: "SPRING",
      summer: "SUMMER",
      autumn: "AUTUMN",
      winter: "WINTER"
    };
    const resetCarePlanConfig = () => {
      carePlanConfig.seasonalMode = false;
      carePlanConfig.tasks = createTaskConfig();
      carePlanConfig.seasonTasks = {
        spring: createTaskConfig(),
        summer: createTaskConfig(),
        autumn: createTaskConfig(),
        winter: createTaskConfig()
      };
      activeSeasonIndex.value = 0;
    };
    const resetPlantForm = () => {
      editPlantId.value = "";
      selectedGardenId.value = "";
      plantForm.image = "";
      plantForm.name = "";
      plantForm.species = "";
      plantForm.cultivationType = "soil";
      plantForm.plantingDate = "";
      plantForm.note = "";
      cultivationIndex.value = 0;
      datePickerValue.value = Date.now();
      resetCarePlanConfig();
    };
    const onCultivationChange = (index) => {
      cultivationIndex.value = index;
      plantForm.cultivationType = index === 0 ? "soil" : "water";
    };
    const openImageSourceSheet = () => {
      showImageSourceSheet.value = true;
    };
    const onImageSourceSelect = (action) => {
      showImageSourceSheet.value = false;
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: action.sourceType,
        success: (res) => {
          var _a;
          plantForm.image = ((_a = res.tempFilePaths) == null ? void 0 : _a[0]) || "";
        }
      });
    };
    const openDatePicker = () => {
      showDatePicker.value = true;
    };
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, "0");
      const day = `${date.getDate()}`.padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const onDateConfirm = (payload) => {
      const ts = (payload == null ? void 0 : payload.value) || Date.now();
      datePickerValue.value = ts;
      plantForm.plantingDate = formatDate(ts);
      showDatePicker.value = false;
    };
    const onSeasonTabChange = (index) => {
      activeSeasonIndex.value = index;
    };
    const buildCarePlanRequest = () => {
      const rules = [];
      if (!carePlanConfig.seasonalMode) {
        careTaskOptions.forEach((task) => {
          const cfg = carePlanConfig.tasks[task.key];
          rules.push({
            activityType: task.key,
            season: "ALL",
            enabled: !!cfg.enabled,
            intervalDays: normalizeIntervalDays(task.key, cfg.intervalDays)
          });
        });
      } else {
        Object.keys(seasonApiMap).forEach((seasonKey) => {
          careTaskOptions.forEach((task) => {
            const cfg = carePlanConfig.seasonTasks[seasonKey][task.key];
            rules.push({
              activityType: task.key,
              season: seasonApiMap[seasonKey],
              enabled: !!cfg.enabled,
              intervalDays: normalizeIntervalDays(task.key, cfg.intervalDays)
            });
          });
        });
      }
      return {
        enabled: true,
        seasonalMode: !!carePlanConfig.seasonalMode,
        rules
      };
    };
    const loadCarePlan = (plantId) => {
      api_index.getCarePlanConfig(plantId).then((data) => {
        resetCarePlanConfig();
        carePlanConfig.seasonalMode = !!(data == null ? void 0 : data.seasonalMode);
        ((data == null ? void 0 : data.rules) || []).forEach((rule) => {
          var _a;
          const key = rule == null ? void 0 : rule.activityType;
          if (!key || !carePlanConfig.tasks[key])
            return;
          const enabled = !!(rule == null ? void 0 : rule.enabled);
          const safeInterval = normalizeIntervalDays(key, rule == null ? void 0 : rule.intervalDays);
          const season = `${(rule == null ? void 0 : rule.season) || "ALL"}`.toUpperCase();
          if (season === "ALL") {
            carePlanConfig.tasks[key].enabled = enabled;
            carePlanConfig.tasks[key].intervalDays = safeInterval;
            return;
          }
          const seasonKey = seasonKeyMap[season];
          if (!seasonKey || !((_a = carePlanConfig.seasonTasks[seasonKey]) == null ? void 0 : _a[key]))
            return;
          carePlanConfig.seasonTasks[seasonKey][key].enabled = enabled;
          carePlanConfig.seasonTasks[seasonKey][key].intervalDays = safeInterval;
        });
      }).catch(() => {
        resetCarePlanConfig();
      });
    };
    const onSubmitPlant = () => {
      if (!plantForm.image || !plantForm.name || !plantForm.plantingDate) {
        common_vendor.index.showToast({
          title: "请完善必填信息",
          icon: "none"
        });
        return;
      }
      const payload = {
        image: plantForm.image,
        name: plantForm.name,
        species: plantForm.species,
        cultivationType: plantForm.cultivationType,
        plantingDate: plantForm.plantingDate,
        note: plantForm.note,
        gardenId: selectedGardenId.value ? Number(selectedGardenId.value) : void 0
      };
      let carePlanReq = null;
      try {
        carePlanReq = buildCarePlanRequest();
      } catch (err) {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "养护计划参数无效",
          icon: "none"
        });
        return;
      }
      const req = editPlantId.value ? api_index.updatePlant(editPlantId.value, payload) : api_index.createPlant(payload);
      req.then((savedPlant) => {
        const plantId = editPlantId.value || `${(savedPlant == null ? void 0 : savedPlant.id) || ""}`.trim();
        if (!plantId || !carePlanReq)
          return Promise.resolve();
        return api_index.saveCarePlanConfig(plantId, carePlanReq);
      }).then(() => {
        common_vendor.index.showToast({
          title: "绿植和计划已保存",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/plant/plant"
          });
        }, 500);
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "保存失败",
          icon: "none"
        });
      });
    };
    const applyAiPrefill = (prefillRaw) => {
      const raw = `${prefillRaw || ""}`.trim();
      if (!raw)
        return;
      let prefill = {};
      try {
        prefill = JSON.parse(decodeURIComponent(raw));
      } catch (e) {
        return;
      }
      const fallbackImage = `${(prefill == null ? void 0 : prefill.recognizedImageUrl) || (prefill == null ? void 0 : prefill.imageUrl) || ""}`.trim();
      if (fallbackImage) {
        plantForm.image = fallbackImage;
      }
      const name = `${(prefill == null ? void 0 : prefill.name) || ""}`.trim();
      if (name) {
        plantForm.name = name;
        plantForm.species = name;
      }
      const desc = `${(prefill == null ? void 0 : prefill.description) || ""}`.trim();
      if (desc) {
        plantForm.note = desc;
      }
      if (!plantForm.plantingDate) {
        plantForm.plantingDate = formatDate(Date.now());
      }
    };
    common_vendor.onLoad((query) => {
      resetPlantForm();
      selectedGardenId.value = `${(query == null ? void 0 : query.gardenId) || ""}`.trim();
      applyAiPrefill(query == null ? void 0 : query.prefill);
      const id = query == null ? void 0 : query.id;
      if (!id)
        return;
      editPlantId.value = id;
      api_index.getPlantById(id).then((data) => {
        plantForm.image = (data == null ? void 0 : data.image) || "";
        plantForm.name = (data == null ? void 0 : data.name) || "";
        plantForm.species = (data == null ? void 0 : data.species) || "";
        plantForm.cultivationType = (data == null ? void 0 : data.cultivationType) || "soil";
        plantForm.plantingDate = (data == null ? void 0 : data.plantingDate) || "";
        plantForm.note = (data == null ? void 0 : data.note) || "";
        cultivationIndex.value = plantForm.cultivationType === "water" ? 1 : 0;
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加载绿植失败",
          icon: "none"
        });
      });
      loadCarePlan(id);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: plantForm.image
      }, plantForm.image ? {
        b: plantForm.image
      } : {
        c: common_vendor.p({
          name: "camera-fill",
          size: "24",
          color: "#33c26d"
        })
      }, {
        d: common_vendor.o(openImageSourceSheet),
        e: common_vendor.p({
          label: "植物图片"
        }),
        f: common_vendor.o(($event) => plantForm.name = $event),
        g: common_vendor.p({
          placeholder: "请输入植物名称",
          border: "surround",
          clearable: true,
          modelValue: plantForm.name
        }),
        h: common_vendor.p({
          label: "植物名称"
        }),
        i: common_vendor.o(($event) => plantForm.species = $event),
        j: common_vendor.p({
          placeholder: "请输入植物品种",
          border: "surround",
          clearable: true,
          modelValue: plantForm.species
        }),
        k: common_vendor.p({
          label: "植物品种"
        }),
        l: common_vendor.o(onCultivationChange),
        m: common_vendor.p({
          list: cultivationOptions,
          current: cultivationIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eaf9f0"
        }),
        n: common_vendor.p({
          label: "栽培方式"
        }),
        o: common_vendor.t(plantForm.plantingDate || "请选择种植日期"),
        p: common_vendor.n(plantForm.plantingDate ? "date-text" : "date-placeholder"),
        q: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#7bc59a"
        }),
        r: common_vendor.o(openDatePicker),
        s: common_vendor.p({
          label: "种植日期"
        }),
        t: common_vendor.o(($event) => plantForm.note = $event),
        v: common_vendor.p({
          placeholder: "记录当前状态、环境、养护习惯等",
          border: "surround",
          height: "120",
          maxlength: "200",
          count: true,
          modelValue: plantForm.note
        }),
        w: common_vendor.p({
          label: "备注"
        }),
        x: common_vendor.o(($event) => carePlanConfig.seasonalMode = $event),
        y: common_vendor.p({
          activeValue: true,
          inactiveValue: false,
          size: "20",
          activeColor: "#33c26d",
          modelValue: carePlanConfig.seasonalMode
        }),
        z: carePlanConfig.seasonalMode
      }, carePlanConfig.seasonalMode ? {
        A: common_vendor.o(onSeasonTabChange),
        B: common_vendor.p({
          list: common_vendor.unref(seasonTabList),
          current: activeSeasonIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eefbf3"
        })
      } : {}, {
        C: common_vendor.f(careTaskOptions, (task, k0, i0) => {
          return {
            a: "2986bdf3-16-" + i0 + ",2986bdf3-13",
            b: common_vendor.p({
              name: task.icon,
              size: "16",
              color: "#33c26d"
            }),
            c: common_vendor.t(task.label),
            d: "2986bdf3-17-" + i0 + ",2986bdf3-13",
            e: common_vendor.o(($event) => currentTaskPlanMap.value[task.key].intervalDays = $event, task.key),
            f: common_vendor.p({
              type: "number",
              disabled: !currentTaskPlanMap.value[task.key].enabled,
              border: "surround",
              inputAlign: "center",
              customStyle: "width: 84rpx; height: 50rpx; padding: 0 6rpx;",
              modelValue: currentTaskPlanMap.value[task.key].intervalDays
            }),
            g: !currentTaskPlanMap.value[task.key].enabled ? 1 : "",
            h: "2986bdf3-18-" + i0 + ",2986bdf3-13",
            i: common_vendor.o(($event) => currentTaskPlanMap.value[task.key].enabled = $event, task.key),
            j: common_vendor.p({
              activeValue: true,
              inactiveValue: false,
              size: "20",
              activeColor: "#33c26d",
              modelValue: currentTaskPlanMap.value[task.key].enabled
            }),
            k: task.key
          };
        }),
        D: carePlanConfig.seasonalMode
      }, carePlanConfig.seasonalMode ? {} : {}, {
        E: common_vendor.p({
          label: "养护计划"
        }),
        F: common_vendor.p({
          model: plantForm,
          labelPosition: "top",
          labelWidth: "220rpx"
        }),
        G: common_vendor.o(onSubmitPlant),
        H: common_vendor.p({
          type: "primary",
          text: "保存绿植",
          color: "#33c26d",
          shape: "circle"
        }),
        I: common_vendor.o(onImageSourceSelect),
        J: common_vendor.o(($event) => showImageSourceSheet.value = false),
        K: common_vendor.p({
          show: showImageSourceSheet.value,
          actions: imageSourceActions,
          cancelText: "取消"
        }),
        L: common_vendor.o(onDateConfirm),
        M: common_vendor.o(($event) => showDatePicker.value = false),
        N: common_vendor.o(($event) => showDatePicker.value = false),
        O: common_vendor.p({
          show: showDatePicker.value,
          value: datePickerValue.value,
          mode: "date"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2986bdf3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/plant/add.js.map
