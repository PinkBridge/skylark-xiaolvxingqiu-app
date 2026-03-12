"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_card2 = common_vendor.resolveComponent("up-card");
  const _easycom_up_subsection2 = common_vendor.resolveComponent("up-subsection");
  const _easycom_up_album2 = common_vendor.resolveComponent("up-album");
  const _easycom_up_switch2 = common_vendor.resolveComponent("up-switch");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_form_item2 = common_vendor.resolveComponent("up-form-item");
  const _easycom_up_textarea2 = common_vendor.resolveComponent("up-textarea");
  const _easycom_up_form2 = common_vendor.resolveComponent("up-form");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  (_easycom_up_icon2 + _easycom_up_card2 + _easycom_up_subsection2 + _easycom_up_album2 + _easycom_up_switch2 + _easycom_up_input2 + _easycom_up_form_item2 + _easycom_up_textarea2 + _easycom_up_form2 + _easycom_up_button2 + _easycom_up_popup2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_card = () => "../../uni_modules/uview-plus/components/u-card/u-card.js";
const _easycom_up_subsection = () => "../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
const _easycom_up_album = () => "../../uni_modules/uview-plus/components/u-album/u-album.js";
const _easycom_up_switch = () => "../../uni_modules/uview-plus/components/u-switch/u-switch.js";
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_textarea = () => "../../uni_modules/uview-plus/components/u-textarea/u-textarea.js";
const _easycom_up_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_card + _easycom_up_subsection + _easycom_up_album + _easycom_up_switch + _easycom_up_input + _easycom_up_form_item + _easycom_up_textarea + _easycom_up_form + _easycom_up_button + _easycom_up_popup)();
}
const growthRecordPageSize = 10;
const albumRecordPageSize = 10;
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const detailTabs = ["生长记录", "植物相册", "养护计划", "统计分析"];
    const activeTabIndex = common_vendor.ref(0);
    const currentPlantId = common_vendor.ref(1);
    const currentPlantData = common_vendor.ref({
      id: 1,
      name: "绿植",
      statusLabel: "健康",
      days: 1,
      cultivationLabel: "土培",
      image: "/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg",
      focused: false,
      focusReason: "",
      focusPhoto: "",
      focusAt: ""
    });
    const showFocusPopup = common_vendor.ref(false);
    const focusForm = common_vendor.reactive({
      photo: "",
      reason: ""
    });
    const switchingStatus = common_vendor.ref(false);
    const plantStatusOptions = [
      { value: "healthy", label: "健康", color: "#33c26d", bgColor: "#eefbf3", borderColor: "#d7efdf", icon: "checkmark-circle-fill" },
      { value: "sick", label: "生病", color: "#f56c6c", bgColor: "#fff3f3", borderColor: "#ffd6d6", icon: "close-circle-fill" },
      { value: "dormant", label: "休眠", color: "#e6a23c", bgColor: "#fff7e6", borderColor: "#ffe7ba", icon: "clock-fill" },
      { value: "dead", label: "已死亡", color: "#909399", bgColor: "#f4f4f5", borderColor: "#e4e7ed", icon: "minus-circle-fill" },
      { value: "gifted", label: "已送人", color: "#409eff", bgColor: "#ecf5ff", borderColor: "#d9ecff", icon: "account-fill" },
      { value: "sold", label: "已售出", color: "#9c6bff", bgColor: "#f5f0ff", borderColor: "#e5d8ff", icon: "checkmark-circle-fill" }
    ];
    const statusAliasMap = {
      健康: "healthy",
      生病: "sick",
      休眠: "dormant",
      已死亡: "dead",
      死亡: "dead",
      已送人: "gifted",
      已售出: "sold"
    };
    const resolveStatusValue = (status) => {
      if (!status)
        return "healthy";
      const raw = `${status}`.trim();
      if (!raw)
        return "healthy";
      return statusAliasMap[raw] || raw.toLowerCase();
    };
    const currentStatusOption = common_vendor.computed(() => {
      const value = resolveStatusValue(currentPlant.value.healthStatus);
      return plantStatusOptions.find((item) => item.value === value) || plantStatusOptions[0];
    });
    const growthRecords = common_vendor.ref([]);
    const growthRecordLoading = common_vendor.ref(false);
    const growthRecordPageNo = common_vendor.ref(1);
    const growthRecordHasMore = common_vendor.ref(true);
    const albumRecords = common_vendor.ref([]);
    const albumRecordLoading = common_vendor.ref(false);
    const albumRecordPageNo = common_vendor.ref(1);
    const albumRecordHasMore = common_vendor.ref(true);
    const statsSummary = common_vendor.ref({
      totalCareCount: 0,
      photoCount: 0,
      waterCount: 0,
      lastCareGap: 0,
      weekCareCount: 0,
      wateringOutsideRecommendedCount: 0,
      wateringTimeTip: "",
      wateringTimeDistribution: [],
      statusTimeDistribution: []
    });
    const monthlyStats = common_vendor.ref([]);
    const careTaskOptions = [
      { key: "water", label: "浇水", icon: "/static/icon/water.png" },
      { key: "fertilize", label: "施肥", icon: "/static/icon/fertilize.png" },
      { key: "loosen", label: "松土", icon: "/static/icon/loosen.png" },
      { key: "prune", label: "修剪", icon: "/static/icon/prune.png" },
      { key: "repot", label: "换盆", icon: "/static/icon/repot.png" },
      { key: "pest", label: "病虫害", icon: "/static/icon/pest.png" },
      { key: "measure", label: "测量", icon: "/static/icon/measure.png" },
      { key: "photo", label: "拍照", icon: "/static/icon/photo.png" }
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
    const defaultIntervalDays = (taskKey) => {
      return defaultIntervalDaysMap[taskKey] || 3;
    };
    const normalizeIntervalDays = (taskKey, value) => {
      const interval = Number(value);
      if (Number.isFinite(interval) && interval > 0)
        return interval;
      return defaultIntervalDays(taskKey);
    };
    const createTaskConfig = () => {
      return careTaskOptions.reduce((acc, task) => {
        acc[task.key] = { enabled: false, intervalDays: defaultIntervalDays(task.key) };
        return acc;
      }, {});
    };
    const carePlanConfig = common_vendor.reactive({
      enabled: true,
      intervalDays: "",
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
    const savingCarePlan = common_vendor.ref(false);
    const currentPlant = common_vendor.computed(() => {
      return currentPlantData.value;
    });
    const basicInfoItems = common_vendor.computed(() => {
      return [
        { key: "days", icon: "clock-fill", iconColor: "#4b9c72", value: `第 ${currentPlant.value.days} 天` },
        { key: "cultivation", icon: "home-fill", iconColor: "#4b9c72", value: currentPlant.value.cultivationLabel },
        { key: "species", icon: "bookmark-fill", iconColor: "#4b9c72", value: currentPlant.value.species || "未知品种" }
      ];
    });
    const photoRecords = common_vendor.computed(() => albumRecords.value);
    const currentTaskPlanMap = common_vendor.computed(() => {
      if (!carePlanConfig.seasonalMode)
        return carePlanConfig.tasks;
      return carePlanConfig.seasonTasks[currentSeasonKey.value];
    });
    const monthlyBarMax = common_vendor.computed(() => {
      const values = monthlyStats.value.map((item) => Number((item == null ? void 0 : item.count) || 0));
      return Math.max(1, ...values);
    });
    const mapWateringSegmentLabel = (segment) => {
      if (segment === "morning")
        return "早上";
      if (segment === "daytime")
        return "白天";
      if (segment === "evening")
        return "晚上";
      if (segment === "night")
        return "夜间";
      return segment || "未知";
    };
    const wateringTimeDistribution = common_vendor.computed(() => {
      var _a;
      const raw = Array.isArray((_a = statsSummary.value) == null ? void 0 : _a.wateringTimeDistribution) ? statsSummary.value.wateringTimeDistribution : [];
      return raw.map((item) => ({
        segment: (item == null ? void 0 : item.segment) || "",
        label: mapWateringSegmentLabel((item == null ? void 0 : item.segment) || ""),
        count: Number((item == null ? void 0 : item.count) || 0)
      }));
    });
    const wateringTimeMax = common_vendor.computed(() => {
      const values = wateringTimeDistribution.value.map((item) => Number((item == null ? void 0 : item.count) || 0));
      return Math.max(1, ...values);
    });
    const healthStatusOrder = ["健康", "生病", "休眠", "已死亡", "已送人", "已售出"];
    const healthStatusColorKeyMap = {
      健康: "healthy",
      生病: "sick",
      休眠: "dormant",
      已死亡: "dead",
      已送人: "gifted",
      已售出: "sold"
    };
    const healthStatusDistribution = common_vendor.computed(() => {
      var _a;
      const raw = Array.isArray((_a = statsSummary.value) == null ? void 0 : _a.statusTimeDistribution) ? statsSummary.value.statusTimeDistribution : [];
      const map = {};
      raw.forEach((item) => {
        const status = `${(item == null ? void 0 : item.status) || ""}`.trim();
        if (!status)
          return;
        map[status] = Number((item == null ? void 0 : item.durationMinutes) || 0);
      });
      const total = healthStatusOrder.reduce((sum, status) => sum + Number(map[status] || 0), 0);
      return healthStatusOrder.map((status) => {
        const minutes = Number(map[status] || 0);
        const ratioNumber = total > 0 ? minutes / total * 100 : 0;
        const days = minutes / (24 * 60);
        return {
          key: healthStatusColorKeyMap[status] || "healthy",
          status,
          minutes,
          daysText: `${days >= 1 ? days.toFixed(1) : days.toFixed(2)}天`,
          ratio: `${Math.max(total > 0 ? 4 : 0, Math.round(ratioNumber))}%`,
          ratioText: `${Math.round(ratioNumber)}%`
        };
      });
    });
    const isAlwaysHealthyTimeline = common_vendor.computed(() => {
      const list = healthStatusDistribution.value || [];
      if (!list.length)
        return false;
      const healthy = list.find((item) => item.status === "健康");
      const healthyMinutes = Number((healthy == null ? void 0 : healthy.minutes) || 0);
      if (healthyMinutes <= 0)
        return false;
      return list.every((item) => {
        if (item.status === "健康")
          return true;
        return Number(item.minutes || 0) <= 0;
      });
    });
    const onTabChange = (index) => {
      activeTabIndex.value = index;
      if (index === 0 && !growthRecords.value.length) {
        resetGrowthRecords();
        loadGrowthRecords();
      }
      if (index === 1 && !albumRecords.value.length) {
        resetAlbumRecords();
        loadAlbumRecords();
      }
    };
    const onSeasonTabChange = (index) => {
      activeSeasonIndex.value = index;
    };
    const mapGrowthRecordItem = (item) => {
      return {
        id: (item == null ? void 0 : item.id) || `${Date.now()}-${Math.random()}`,
        name: (item == null ? void 0 : item.name) || "养护记录",
        icon: (item == null ? void 0 : item.icon) || "checkmark-circle-fill",
        timeText: toDaysAgoText(item == null ? void 0 : item.date),
        date: (item == null ? void 0 : item.date) || "",
        content: (item == null ? void 0 : item.content) || "已完成本次养护记录"
      };
    };
    const toDaysAgoText = (dateText) => {
      if (!dateText)
        return "今天";
      try {
        const normalized = `${dateText}`.trim().replace(/-/g, "/");
        const targetDate = new Date(normalized);
        if (Number.isNaN(targetDate.getTime()))
          return "今天";
        const today = /* @__PURE__ */ new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const targetStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
        const diff = Math.floor((todayStart.getTime() - targetStart.getTime()) / (24 * 60 * 60 * 1e3));
        if (diff <= 0)
          return "今天";
        return `${diff}天前`;
      } catch (e) {
        return "今天";
      }
    };
    const resetGrowthRecords = () => {
      growthRecords.value = [];
      growthRecordPageNo.value = 1;
      growthRecordHasMore.value = true;
    };
    const loadGrowthRecords = () => {
      if (growthRecordLoading.value || !growthRecordHasMore.value || !currentPlantId.value)
        return;
      growthRecordLoading.value = true;
      api_index.listPlantGrowthRecords(currentPlantId.value, growthRecordPageNo.value, growthRecordPageSize).then((data) => {
        const list = Array.isArray(data == null ? void 0 : data.list) ? data.list.map(mapGrowthRecordItem) : [];
        if (growthRecordPageNo.value === 1) {
          growthRecords.value = list;
        } else {
          growthRecords.value = growthRecords.value.concat(list);
        }
        growthRecordHasMore.value = !!(data == null ? void 0 : data.hasMore);
        if (data == null ? void 0 : data.hasMore) {
          growthRecordPageNo.value += 1;
        }
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加载记录失败",
          icon: "none"
        });
      }).finally(() => {
        growthRecordLoading.value = false;
      });
    };
    const mapAlbumRecordItem = (item) => {
      return {
        id: (item == null ? void 0 : item.id) || `${Date.now()}-${Math.random()}`,
        date: (item == null ? void 0 : item.date) || "",
        desc: (item == null ? void 0 : item.desc) || "拍照记录",
        images: Array.isArray(item == null ? void 0 : item.images) ? item.images.filter(Boolean) : []
      };
    };
    const resetAlbumRecords = () => {
      albumRecords.value = [];
      albumRecordPageNo.value = 1;
      albumRecordHasMore.value = true;
    };
    const loadAlbumRecords = () => {
      if (albumRecordLoading.value || !albumRecordHasMore.value || !currentPlantId.value)
        return;
      albumRecordLoading.value = true;
      api_index.listPlantAlbumRecords(currentPlantId.value, albumRecordPageNo.value, albumRecordPageSize).then((data) => {
        const list = Array.isArray(data == null ? void 0 : data.list) ? data.list.map(mapAlbumRecordItem).filter((item) => item.images.length) : [];
        if (albumRecordPageNo.value === 1) {
          albumRecords.value = list;
        } else {
          albumRecords.value = albumRecords.value.concat(list);
        }
        albumRecordHasMore.value = !!(data == null ? void 0 : data.hasMore);
        if (data == null ? void 0 : data.hasMore) {
          albumRecordPageNo.value += 1;
        }
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加载相册失败",
          icon: "none"
        });
      }).finally(() => {
        albumRecordLoading.value = false;
      });
    };
    const loadPlantStats = () => {
      if (!currentPlantId.value)
        return;
      api_index.getPlantCareStats(currentPlantId.value).then((data) => {
        statsSummary.value = {
          totalCareCount: Number((data == null ? void 0 : data.totalCareCount) || 0),
          photoCount: Number((data == null ? void 0 : data.photoCount) || 0),
          waterCount: Number((data == null ? void 0 : data.waterCount) || 0),
          lastCareGap: Number((data == null ? void 0 : data.lastCareGap) || 0),
          weekCareCount: Number((data == null ? void 0 : data.weekCareCount) || 0),
          wateringOutsideRecommendedCount: Number((data == null ? void 0 : data.wateringOutsideRecommendedCount) || 0),
          wateringTimeTip: (data == null ? void 0 : data.wateringTimeTip) || "",
          wateringTimeDistribution: Array.isArray(data == null ? void 0 : data.wateringTimeDistribution) ? data.wateringTimeDistribution : [],
          statusTimeDistribution: Array.isArray(data == null ? void 0 : data.statusTimeDistribution) ? data.statusTimeDistribution : []
        };
      }).catch(() => {
        statsSummary.value = {
          totalCareCount: 0,
          photoCount: 0,
          waterCount: 0,
          lastCareGap: 0,
          weekCareCount: 0,
          wateringOutsideRecommendedCount: 0,
          wateringTimeTip: "",
          wateringTimeDistribution: [],
          statusTimeDistribution: []
        };
      });
    };
    const loadPlantMonthlyStats = () => {
      if (!currentPlantId.value)
        return;
      api_index.getPlantMonthlyStats(currentPlantId.value, 6).then((list) => {
        const rows = Array.isArray(list) ? list : [];
        monthlyStats.value = rows.map((item) => {
          const monthText = `${(item == null ? void 0 : item.month) || ""}`;
          const label = /^\d{4}-\d{2}$/.test(monthText) ? `${Number(monthText.slice(5, 7))}月` : monthText;
          return {
            month: monthText,
            label,
            count: Number((item == null ? void 0 : item.careCount) || 0)
          };
        });
      }).catch(() => {
        monthlyStats.value = [];
      });
    };
    const resetCarePlanConfig = () => {
      carePlanConfig.enabled = true;
      carePlanConfig.seasonalMode = false;
      carePlanConfig.tasks = createTaskConfig();
      carePlanConfig.seasonTasks = {
        spring: createTaskConfig(),
        summer: createTaskConfig(),
        autumn: createTaskConfig(),
        winter: createTaskConfig()
      };
    };
    const seasonKeyMap = {
      SPRING: "spring",
      SUMMER: "summer",
      AUTUMN: "autumn",
      WINTER: "winter"
    };
    const loadCarePlan = (plantId) => {
      api_index.getCarePlanConfig(plantId).then((data) => {
        resetCarePlanConfig();
        carePlanConfig.enabled = (data == null ? void 0 : data.enabled) !== false;
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
    const buildCarePlanPayload = () => {
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
        const seasonApiMap = {
          spring: "SPRING",
          summer: "SUMMER",
          autumn: "AUTUMN",
          winter: "WINTER"
        };
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
        enabled: !!carePlanConfig.enabled,
        seasonalMode: !!carePlanConfig.seasonalMode,
        rules
      };
    };
    const onSaveCarePlan = () => {
      if (!currentPlantId.value || savingCarePlan.value)
        return;
      savingCarePlan.value = true;
      api_index.saveCarePlanConfig(currentPlantId.value, buildCarePlanPayload()).then(() => {
        common_vendor.index.showToast({
          title: "养护计划已保存",
          icon: "success"
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "保存失败",
          icon: "none"
        });
      }).finally(() => {
        savingCarePlan.value = false;
      });
    };
    const onShareToMoments = () => {
      common_vendor.index.showShareMenu({
        menus: ["shareAppMessage", "shareTimeline"]
      });
      common_vendor.index.showToast({
        title: "请点击右上角分享到朋友圈",
        icon: "none"
      });
    };
    const onToggleFocus = () => {
      if (currentPlant.value.focused) {
        common_vendor.index.showModal({
          title: "移除需关注",
          content: `确认将「${currentPlant.value.name}」移出需关注列表吗？`,
          confirmColor: "#f56c6c",
          success: (res) => {
            if (!res.confirm)
              return;
            api_index.clearPlantFocus(currentPlant.value.id).then((data) => {
              currentPlant.value.focused = !!(data == null ? void 0 : data.focused);
              currentPlant.value.focusReason = (data == null ? void 0 : data.focusReason) || "";
              currentPlant.value.focusPhoto = (data == null ? void 0 : data.focusPhoto) || "";
              currentPlant.value.focusAt = (data == null ? void 0 : data.focusAt) || "";
              common_vendor.index.showToast({
                title: "已移除需关注",
                icon: "success"
              });
            }).catch((err) => {
              common_vendor.index.showToast({
                title: (err == null ? void 0 : err.message) || "移除失败",
                icon: "none"
              });
            });
          }
        });
        return;
      }
      focusForm.photo = "";
      focusForm.reason = "";
      showFocusPopup.value = true;
    };
    const buildPlantUpdatePayload = () => {
      return {
        name: currentPlant.value.name || "",
        species: currentPlant.value.species || "",
        image: currentPlant.value.image || "",
        cultivationType: currentPlant.value.cultivationType || "soil",
        plantingDate: currentPlant.value.plantingDate || "",
        note: currentPlant.value.note || "",
        healthStatus: resolveStatusValue(currentPlant.value.healthStatus),
        favorite: !!currentPlant.value.favorite
      };
    };
    const onSwitchPlantStatus = () => {
      if (switchingStatus.value)
        return;
      common_vendor.index.showActionSheet({
        itemList: plantStatusOptions.map((item) => item.label),
        success: (res) => {
          const next = plantStatusOptions[res == null ? void 0 : res.tapIndex];
          if (!next)
            return;
          const current = resolveStatusValue(currentPlant.value.healthStatus);
          if (next.value === current)
            return;
          switchingStatus.value = true;
          api_index.updatePlant(currentPlant.value.id, {
            ...buildPlantUpdatePayload(),
            healthStatus: next.value
          }).then((data) => {
            currentPlant.value.healthStatus = (data == null ? void 0 : data.healthStatus) || next.value;
            currentPlant.value.statusLabel = (data == null ? void 0 : data.statusLabel) || next.label;
            loadPlantStats();
            common_vendor.index.showToast({
              title: `已切换为${next.label}`,
              icon: "success"
            });
          }).catch((err) => {
            common_vendor.index.showToast({
              title: (err == null ? void 0 : err.message) || "状态切换失败",
              icon: "none"
            });
          }).finally(() => {
            switchingStatus.value = false;
          });
        }
      });
    };
    const onPickFocusPhoto = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["camera", "album"],
        success: async (res) => {
          var _a;
          const selectedPath = ((_a = res.tempFilePaths) == null ? void 0 : _a[0]) || "";
          if (!selectedPath)
            return;
          try {
            focusForm.photo = await api_index.uploadImageResource({ filePath: selectedPath, fileName: "focus.jpg" });
          } catch (err) {
            common_vendor.index.showToast({
              title: (err == null ? void 0 : err.message) || "图片上传失败",
              icon: "none"
            });
          }
        }
      });
    };
    const onSubmitFocus = () => {
      if (!focusForm.photo) {
        common_vendor.index.showToast({
          title: "请先上传图片",
          icon: "none"
        });
        return;
      }
      if (!focusForm.reason.trim()) {
        common_vendor.index.showToast({
          title: "请填写备注",
          icon: "none"
        });
        return;
      }
      Promise.resolve().then(async () => {
        focusForm.photo = await api_index.uploadImageResource({ filePath: focusForm.photo, fileName: "focus.jpg" });
        return {
          photoUrl: focusForm.photo,
          reason: focusForm.reason.trim()
        };
      }).then((payload) => api_index.setPlantFocus(currentPlant.value.id, payload)).then((data) => {
        currentPlant.value.focused = !!(data == null ? void 0 : data.focused);
        currentPlant.value.focusReason = (data == null ? void 0 : data.focusReason) || "";
        currentPlant.value.focusPhoto = (data == null ? void 0 : data.focusPhoto) || "";
        currentPlant.value.focusAt = (data == null ? void 0 : data.focusAt) || "";
        showFocusPopup.value = false;
        common_vendor.index.showToast({
          title: "已加入需关注",
          icon: "success"
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "保存失败",
          icon: "none"
        });
      });
    };
    const onEditPlant = () => {
      common_vendor.index.navigateTo({
        url: `/pages/plant/add?id=${currentPlant.value.id}&mode=edit`
      });
    };
    const onDeletePlant = () => {
      var _a;
      if (!((_a = currentPlant.value) == null ? void 0 : _a.id)) {
        common_vendor.index.showToast({
          title: "绿植信息异常，请稍后重试",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showModal({
        title: "删除绿植",
        content: `确认删除「${currentPlant.value.name}」吗？`,
        confirmColor: "#f56c6c",
        success: (res) => {
          if (!res.confirm)
            return;
          api_index.deletePlant(currentPlant.value.id).then(() => {
            common_vendor.index.showToast({
              title: "已删除",
              icon: "success"
            });
            const payload = { id: currentPlant.value.id };
            common_vendor.index.$emit("plant:deleted", payload);
            try {
              const eventChannel = typeof common_vendor.index.getOpenerEventChannel === "function" ? common_vendor.index.getOpenerEventChannel() : null;
              if (eventChannel && typeof eventChannel.emit === "function") {
                eventChannel.emit("plantDeleted", payload);
              }
            } catch (e) {
            }
            setTimeout(() => {
              common_vendor.index.switchTab({
                url: "/pages/plant/plant",
                fail: () => {
                  common_vendor.index.navigateBack({
                    fail: () => {
                      common_vendor.index.reLaunch({
                        url: "/pages/plant/plant"
                      });
                    }
                  });
                }
              });
            }, 400);
          }).catch((err) => {
            common_vendor.index.showToast({
              title: (err == null ? void 0 : err.message) || "删除失败",
              icon: "none"
            });
          });
        }
      });
    };
    common_vendor.onReachBottom(() => {
      if (activeTabIndex.value === 0) {
        loadGrowthRecords();
        return;
      }
      if (activeTabIndex.value === 1) {
        loadAlbumRecords();
      }
    });
    common_vendor.onLoad((query) => {
      const id = Number((query == null ? void 0 : query.id) || 1);
      currentPlantId.value = Number.isNaN(id) ? 1 : id;
      resetGrowthRecords();
      resetAlbumRecords();
      loadGrowthRecords();
      loadPlantStats();
      loadPlantMonthlyStats();
      api_index.getPlantById(currentPlantId.value).then((data) => {
        currentPlantData.value = {
          ...currentPlantData.value,
          ...data,
          focused: !!(data == null ? void 0 : data.focused),
          focusReason: (data == null ? void 0 : data.focusReason) || "",
          focusPhoto: (data == null ? void 0 : data.focusPhoto) || "",
          focusAt: (data == null ? void 0 : data.focusAt) || "",
          cultivationLabel: (data == null ? void 0 : data.cultivationType) === "water" ? "水培" : "土培"
        };
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加载绿植失败",
          icon: "none"
        });
      });
      loadCarePlan(currentPlantId.value);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentPlant.value.image,
        b: common_vendor.t(currentPlant.value.name),
        c: common_vendor.p({
          name: currentStatusOption.value.icon,
          size: "14",
          color: currentStatusOption.value.color
        }),
        d: common_vendor.t(currentStatusOption.value.label),
        e: currentStatusOption.value.color,
        f: currentStatusOption.value.bgColor,
        g: currentStatusOption.value.borderColor,
        h: common_vendor.o(onSwitchPlantStatus),
        i: common_vendor.p({
          name: currentPlant.value.focused ? "warning-fill" : "warning",
          size: "14",
          color: currentPlant.value.focused ? "#d48806" : "#2f8f56"
        }),
        j: common_vendor.t(currentPlant.value.focused ? "已关注" : "关注"),
        k: currentPlant.value.focused ? 1 : "",
        l: common_vendor.o(onToggleFocus),
        m: common_vendor.p({
          name: "edit-pen",
          size: "16",
          color: "#33c26d"
        }),
        n: common_vendor.o(onEditPlant),
        o: common_vendor.p({
          name: "trash",
          size: "16",
          color: "#f56c6c"
        }),
        p: common_vendor.o(onDeletePlant),
        q: common_vendor.f(basicInfoItems.value, (infoItem, k0, i0) => {
          return {
            a: "b13b633e-5-" + i0 + ",b13b633e-0",
            b: common_vendor.p({
              name: infoItem.icon,
              size: "14",
              color: infoItem.iconColor || "#7c8b83"
            }),
            c: common_vendor.t(infoItem.value),
            d: infoItem.key,
            e: common_vendor.n(`basic-info-item--${infoItem.key}`)
          };
        }),
        r: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        s: common_vendor.o(onTabChange),
        t: common_vendor.p({
          list: detailTabs,
          current: activeTabIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eaf9f0"
        }),
        v: activeTabIndex.value === 0
      }, activeTabIndex.value === 0 ? common_vendor.e({
        w: common_vendor.f(growthRecords.value, (record, k0, i0) => {
          return {
            a: "b13b633e-8-" + i0 + "," + ("b13b633e-7-" + i0),
            b: common_vendor.p({
              name: record.icon || "checkmark-circle-fill",
              size: "16",
              color: "#33c26d"
            }),
            c: common_vendor.t(record.name),
            d: common_vendor.t(record.timeText),
            e: common_vendor.t(record.content || "已完成本次养护记录"),
            f: record.id,
            g: "b13b633e-7-" + i0
          };
        }),
        x: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        y: !growthRecords.value.length && !growthRecordLoading.value
      }, !growthRecords.value.length && !growthRecordLoading.value ? {} : {}, {
        z: growthRecordLoading.value
      }, growthRecordLoading.value ? {} : growthRecords.value.length && !growthRecordHasMore.value ? {} : {}, {
        A: growthRecords.value.length && !growthRecordHasMore.value
      }) : activeTabIndex.value === 1 ? common_vendor.e({
        C: common_vendor.f(photoRecords.value, (photo, k0, i0) => {
          return {
            a: common_vendor.t(photo.desc),
            b: "b13b633e-10-" + i0 + "," + ("b13b633e-9-" + i0),
            c: common_vendor.p({
              urls: photo.images,
              multipleSize: "140rpx",
              rowCount: "3",
              space: "10rpx"
            }),
            d: common_vendor.t(toDaysAgoText(photo.date)),
            e: "b13b633e-11-" + i0 + "," + ("b13b633e-9-" + i0),
            f: common_vendor.o(($event) => onShareToMoments(), photo.id),
            g: photo.id,
            h: "b13b633e-9-" + i0
          };
        }),
        D: common_vendor.p({
          name: "share-fill",
          size: "16",
          color: "#33c26d"
        }),
        E: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        F: !photoRecords.value.length && !albumRecordLoading.value
      }, !photoRecords.value.length && !albumRecordLoading.value ? {} : {}, {
        G: albumRecordLoading.value
      }, albumRecordLoading.value ? {} : photoRecords.value.length && !albumRecordHasMore.value ? {} : {}, {
        H: photoRecords.value.length && !albumRecordHasMore.value
      }) : activeTabIndex.value === 2 ? common_vendor.e({
        J: common_vendor.o(($event) => carePlanConfig.seasonalMode = $event),
        K: common_vendor.p({
          disabled: !carePlanConfig.enabled,
          activeValue: true,
          inactiveValue: false,
          size: "20",
          activeColor: "#33c26d",
          modelValue: carePlanConfig.seasonalMode
        }),
        L: common_vendor.p({
          name: "checkmark",
          size: "14",
          color: "#33c26d"
        }),
        M: common_vendor.t(savingCarePlan.value ? "保存中" : "保存计划"),
        N: common_vendor.o(onSaveCarePlan),
        O: carePlanConfig.enabled && carePlanConfig.seasonalMode
      }, carePlanConfig.enabled && carePlanConfig.seasonalMode ? {
        P: common_vendor.o(onSeasonTabChange),
        Q: common_vendor.p({
          list: common_vendor.unref(seasonTabList),
          current: activeSeasonIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eefbf3"
        })
      } : {}, {
        R: carePlanConfig.enabled
      }, carePlanConfig.enabled ? {
        S: common_vendor.f(careTaskOptions, (task, k0, i0) => {
          return {
            a: "b13b633e-16-" + i0 + ",b13b633e-12",
            b: common_vendor.p({
              name: task.icon,
              size: "16",
              color: "#33c26d"
            }),
            c: common_vendor.t(task.label),
            d: "b13b633e-17-" + i0 + ",b13b633e-12",
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
            h: "b13b633e-18-" + i0 + ",b13b633e-12",
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
        })
      } : {}, {
        T: carePlanConfig.enabled && carePlanConfig.seasonalMode
      }, carePlanConfig.enabled && carePlanConfig.seasonalMode ? {} : {}, {
        U: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        })
      }) : common_vendor.e({
        V: common_vendor.t(statsSummary.value.totalCareCount),
        W: common_vendor.t(statsSummary.value.photoCount),
        X: common_vendor.t(statsSummary.value.waterCount),
        Y: common_vendor.t(statsSummary.value.lastCareGap),
        Z: common_vendor.t(statsSummary.value.weekCareCount),
        aa: common_vendor.f(monthlyStats.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.count),
            b: `${Math.max(8, Math.round(item.count / monthlyBarMax.value * 100))}%`,
            c: common_vendor.t(item.label),
            d: item.month
          };
        }),
        ab: common_vendor.f(wateringTimeDistribution.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.t(item.count),
            c: `${Math.max(8, Math.round(item.count / wateringTimeMax.value * 100))}%`,
            d: item.segment
          };
        }),
        ac: statsSummary.value.wateringOutsideRecommendedCount > 0
      }, statsSummary.value.wateringOutsideRecommendedCount > 0 ? {
        ad: common_vendor.t(statsSummary.value.wateringOutsideRecommendedCount)
      } : {
        ae: common_vendor.t(statsSummary.value.wateringTimeTip || "浇水时间分布良好。")
      }, {
        af: common_vendor.f(healthStatusDistribution.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.status),
            b: common_vendor.t(item.daysText),
            c: common_vendor.t(item.ratioText),
            d: common_vendor.n(`health-status-bar--${item.key}`),
            e: `${item.ratio}`,
            f: item.status
          };
        }),
        ag: isAlwaysHealthyTimeline.value
      }, isAlwaysHealthyTimeline.value ? {} : {}, {
        ah: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        })
      }), {
        B: activeTabIndex.value === 1,
        I: activeTabIndex.value === 2,
        ai: common_vendor.o(($event) => showFocusPopup.value = false),
        aj: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        ak: focusForm.photo
      }, focusForm.photo ? {
        al: focusForm.photo
      } : {
        am: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        an: common_vendor.o(onPickFocusPhoto),
        ao: common_vendor.p({
          label: "图片"
        }),
        ap: common_vendor.o(($event) => focusForm.reason = $event),
        aq: common_vendor.p({
          placeholder: "请输入备注",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: focusForm.reason
        }),
        ar: common_vendor.p({
          label: "备注"
        }),
        as: common_vendor.p({
          model: focusForm,
          labelPosition: "top"
        }),
        at: common_vendor.o(onSubmitFocus),
        av: common_vendor.p({
          type: "primary",
          text: "确认关注",
          color: "#33c26d",
          shape: "circle"
        }),
        aw: common_vendor.o(($event) => showFocusPopup.value = false),
        ax: common_vendor.p({
          show: showFocusPopup.value,
          mode: "bottom",
          round: "18"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b13b633e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/plant/detail.js.map
