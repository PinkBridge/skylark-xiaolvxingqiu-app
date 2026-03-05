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
    const growthRecordMap = {
      1: [
        {
          id: "1-1",
          icon: "/static/icon/water.png",
          name: "浇水",
          day: 28,
          content: "土壤偏干，补水约 180ml。"
        },
        {
          id: "1-2",
          icon: "/static/icon/prune.png",
          name: "修剪",
          day: 25,
          content: "修剪底部老叶，促进新芽生长。"
        },
        {
          id: "1-3",
          icon: "/static/icon/fertilize.png",
          name: "施肥",
          day: 21,
          content: "补充一次稀释营养液。"
        },
        {
          id: "1-4",
          icon: "/static/icon/loosen.png",
          name: "松土",
          day: 18,
          content: "疏松土壤，促进根系呼吸。"
        },
        {
          id: "1-5",
          icon: "/static/icon/repot.png",
          name: "换盆",
          day: 15,
          content: "更换新的盆土，促进生长。"
        },
        {
          id: "1-6",
          icon: "/static/icon/pest.png",
          name: "病虫害",
          day: 12,
          content: "发现蚜虫，喷洒杀虫剂。"
        },
        {
          id: "1-7",
          icon: "/static/icon/measure.png",
          name: "测量",
          day: 9,
          content: "测量植株高度，调整光照。"
        },
        {
          id: "1-8",
          icon: "/static/icon/photo.png",
          name: "拍照",
          day: 6,
          content: "拍摄植株照片，记录生长状态。"
        }
      ]
    };
    const photoRecordMap = {
      1: [
        {
          id: "1-p1",
          date: "2026-02-25",
          desc: "新芽冒出与叶片状态记录",
          images: [
            "/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg",
            "/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg",
            "/static/flower/b22cd3cf854015e988176e17dab8a554.jpg",
            "/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg",
            "/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg",
            "/static/flower/b22cd3cf854015e988176e17dab8a554.jpg",
            "/static/flower/e0c65131708dbcea21fdb5a99a157ac4.jpg",
            "/static/flower/4f068b19d4225040f35079b570587bfe.jpg",
            "/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg",
            "/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg",
            "/static/flower/b22cd3cf854015e988176e17dab8a554.jpg"
          ]
        },
        {
          id: "1-p3",
          date: "2026-02-25",
          desc: "新芽冒出与叶片状态记录",
          images: [
            "/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg",
            "/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg",
            "/static/flower/b22cd3cf854015e988176e17dab8a554.jpg",
            "/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg",
            "/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg",
            "/static/flower/b22cd3cf854015e988176e17dab8a554.jpg",
            "/static/flower/e0c65131708dbcea21fdb5a99a157ac4.jpg",
            "/static/flower/4f068b19d4225040f35079b570587bfe.jpg",
            "/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg",
            "/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg",
            "/static/flower/b22cd3cf854015e988176e17dab8a554.jpg"
          ]
        },
        {
          id: "1-p2",
          date: "2026-02-19",
          desc: "叶片展开过程对比",
          images: [
            "/static/flower/e0c65131708dbcea21fdb5a99a157ac4.jpg",
            "/static/flower/4f068b19d4225040f35079b570587bfe.jpg"
          ]
        }
      ]
    };
    const statsMap = {
      1: { totalCareCount: 36, photoCount: 12, lastCareGap: 1, healthScore: "92" }
    };
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
        { key: "days", icon: "clock-fill", value: `第 ${currentPlant.value.days} 天` },
        { key: "cultivation", icon: "grid-fill", value: currentPlant.value.cultivationLabel },
        { key: "status", icon: "checkmark-circle-fill", value: currentPlant.value.statusLabel }
      ];
    });
    const growthRecords = common_vendor.computed(() => {
      return growthRecordMap[currentPlantId.value] || growthRecordMap[1];
    });
    const photoRecords = common_vendor.computed(() => {
      return photoRecordMap[currentPlantId.value] || photoRecordMap[1];
    });
    const statsSummary = common_vendor.computed(() => {
      return statsMap[currentPlantId.value] || statsMap[1];
    });
    const currentTaskPlanMap = common_vendor.computed(() => {
      if (!carePlanConfig.seasonalMode)
        return carePlanConfig.tasks;
      return carePlanConfig.seasonTasks[currentSeasonKey.value];
    });
    const onTabChange = (index) => {
      activeTabIndex.value = index;
    };
    const onSeasonTabChange = (index) => {
      activeSeasonIndex.value = index;
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
    const onPickFocusPhoto = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["camera", "album"],
        success: (res) => {
          var _a;
          focusForm.photo = ((_a = res.tempFilePaths) == null ? void 0 : _a[0]) || "";
        }
      });
    };
    const onSubmitFocus = () => {
      if (!focusForm.photo) {
        common_vendor.index.showToast({
          title: "请先上传关注照片",
          icon: "none"
        });
        return;
      }
      if (!focusForm.reason.trim()) {
        common_vendor.index.showToast({
          title: "请填写关注原因",
          icon: "none"
        });
        return;
      }
      api_index.setPlantFocus(currentPlant.value.id, {
        photoUrl: focusForm.photo,
        reason: focusForm.reason.trim()
      }).then((data) => {
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
            const eventChannel = getOpenerEventChannel && getOpenerEventChannel();
            if (eventChannel) {
              eventChannel.emit("plantDeleted", payload);
            }
            setTimeout(() => {
              common_vendor.index.navigateBack();
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
    common_vendor.onLoad((query) => {
      const id = Number((query == null ? void 0 : query.id) || 1);
      currentPlantId.value = Number.isNaN(id) ? 1 : id;
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
          name: currentPlant.value.focused ? "star-fill" : "star",
          size: "18",
          color: currentPlant.value.focused ? "#f5b301" : "#b8c2bd"
        }),
        d: common_vendor.o(onToggleFocus),
        e: common_vendor.p({
          name: "edit-pen",
          size: "16",
          color: "#33c26d"
        }),
        f: common_vendor.o(onEditPlant),
        g: common_vendor.p({
          name: "trash",
          size: "16",
          color: "#f56c6c"
        }),
        h: common_vendor.o(onDeletePlant),
        i: common_vendor.f(basicInfoItems.value, (infoItem, k0, i0) => {
          return {
            a: "b13b633e-4-" + i0 + ",b13b633e-0",
            b: common_vendor.p({
              name: infoItem.icon,
              size: "14",
              color: "#33c26d"
            }),
            c: common_vendor.t(infoItem.value),
            d: infoItem.key,
            e: common_vendor.n(`basic-info-item--${infoItem.key}`)
          };
        }),
        j: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        k: common_vendor.o(onTabChange),
        l: common_vendor.p({
          list: detailTabs,
          current: activeTabIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eaf9f0"
        }),
        m: activeTabIndex.value === 0
      }, activeTabIndex.value === 0 ? {
        n: common_vendor.f(growthRecords.value, (record, k0, i0) => {
          return {
            a: "b13b633e-7-" + i0 + "," + ("b13b633e-6-" + i0),
            b: common_vendor.p({
              name: record.icon,
              size: "16",
              color: "#33c26d"
            }),
            c: common_vendor.t(record.name),
            d: common_vendor.t(record.day),
            e: common_vendor.t(record.content),
            f: record.id,
            g: "b13b633e-6-" + i0
          };
        }),
        o: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        })
      } : activeTabIndex.value === 1 ? {
        q: common_vendor.f(photoRecords.value, (photo, k0, i0) => {
          return {
            a: common_vendor.t(photo.desc),
            b: "b13b633e-9-" + i0 + "," + ("b13b633e-8-" + i0),
            c: common_vendor.p({
              urls: photo.images,
              multipleSize: "140rpx",
              rowCount: "3",
              space: "10rpx"
            }),
            d: common_vendor.t(photo.date),
            e: "b13b633e-10-" + i0 + "," + ("b13b633e-8-" + i0),
            f: common_vendor.o(($event) => onShareToMoments(), photo.id),
            g: photo.id,
            h: "b13b633e-8-" + i0
          };
        }),
        r: common_vendor.p({
          name: "share-fill",
          size: "16",
          color: "#33c26d"
        }),
        s: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        })
      } : activeTabIndex.value === 2 ? common_vendor.e({
        v: common_vendor.o(($event) => carePlanConfig.seasonalMode = $event),
        w: common_vendor.p({
          disabled: !carePlanConfig.enabled,
          activeValue: true,
          inactiveValue: false,
          size: "20",
          activeColor: "#33c26d",
          modelValue: carePlanConfig.seasonalMode
        }),
        x: common_vendor.p({
          name: "checkmark",
          size: "14",
          color: "#33c26d"
        }),
        y: common_vendor.t(savingCarePlan.value ? "保存中" : "保存计划"),
        z: common_vendor.o(onSaveCarePlan),
        A: carePlanConfig.enabled && carePlanConfig.seasonalMode
      }, carePlanConfig.enabled && carePlanConfig.seasonalMode ? {
        B: common_vendor.o(onSeasonTabChange),
        C: common_vendor.p({
          list: common_vendor.unref(seasonTabList),
          current: activeSeasonIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eefbf3"
        })
      } : {}, {
        D: carePlanConfig.enabled
      }, carePlanConfig.enabled ? {
        E: common_vendor.f(careTaskOptions, (task, k0, i0) => {
          return {
            a: "b13b633e-15-" + i0 + ",b13b633e-11",
            b: common_vendor.p({
              name: task.icon,
              size: "16",
              color: "#33c26d"
            }),
            c: common_vendor.t(task.label),
            d: "b13b633e-16-" + i0 + ",b13b633e-11",
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
            h: "b13b633e-17-" + i0 + ",b13b633e-11",
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
        F: carePlanConfig.enabled && carePlanConfig.seasonalMode
      }, carePlanConfig.enabled && carePlanConfig.seasonalMode ? {} : {}, {
        G: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        })
      }) : {
        H: common_vendor.t(statsSummary.value.totalCareCount),
        I: common_vendor.t(statsSummary.value.photoCount),
        J: common_vendor.t(statsSummary.value.lastCareGap),
        K: common_vendor.t(statsSummary.value.healthScore),
        L: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        })
      }, {
        p: activeTabIndex.value === 1,
        t: activeTabIndex.value === 2,
        M: common_vendor.o(($event) => showFocusPopup.value = false),
        N: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        O: focusForm.photo
      }, focusForm.photo ? {
        P: focusForm.photo
      } : {
        Q: common_vendor.p({
          name: "camera-fill",
          size: "20",
          color: "#33c26d"
        })
      }, {
        R: common_vendor.o(onPickFocusPhoto),
        S: common_vendor.p({
          label: "关注照片"
        }),
        T: common_vendor.o(($event) => focusForm.reason = $event),
        U: common_vendor.p({
          placeholder: "请输入需要重点关注的原因",
          border: "surround",
          height: "90",
          maxlength: "120",
          count: true,
          modelValue: focusForm.reason
        }),
        V: common_vendor.p({
          label: "关注原因"
        }),
        W: common_vendor.p({
          model: focusForm,
          labelPosition: "top"
        }),
        X: common_vendor.o(onSubmitFocus),
        Y: common_vendor.p({
          type: "primary",
          text: "确认关注",
          color: "#33c26d",
          shape: "circle"
        }),
        Z: common_vendor.o(($event) => showFocusPopup.value = false),
        aa: common_vendor.p({
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
