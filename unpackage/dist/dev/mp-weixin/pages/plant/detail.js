"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_card2 = common_vendor.resolveComponent("up-card");
  const _easycom_up_subsection2 = common_vendor.resolveComponent("up-subsection");
  const _easycom_up_album2 = common_vendor.resolveComponent("up-album");
  const _easycom_up_switch2 = common_vendor.resolveComponent("up-switch");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  (_easycom_up_icon2 + _easycom_up_card2 + _easycom_up_subsection2 + _easycom_up_album2 + _easycom_up_switch2 + _easycom_up_input2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_card = () => "../../uni_modules/uview-plus/components/u-card/u-card.js";
const _easycom_up_subsection = () => "../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
const _easycom_up_album = () => "../../uni_modules/uview-plus/components/u-album/u-album.js";
const _easycom_up_switch = () => "../../uni_modules/uview-plus/components/u-switch/u-switch.js";
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_card + _easycom_up_subsection + _easycom_up_album + _easycom_up_switch + _easycom_up_input)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const detailTabs = ["生长记录", "植物相册", "养护计划", "统计分析"];
    const activeTabIndex = common_vendor.ref(0);
    const currentPlantId = common_vendor.ref(1);
    const plantBaseList = common_vendor.ref([
      { id: 1, name: "常春藤", statusLabel: "健康", days: 28, cultivationLabel: "土培", image: "/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg", isFavorite: true },
      { id: 2, name: "龟背竹", statusLabel: "生病", days: 13, cultivationLabel: "水培", image: "/static/flower/b22cd3cf854015e988176e17dab8a554.jpg", isFavorite: false },
      { id: 3, name: "多肉白牡丹", statusLabel: "健康", days: 41, cultivationLabel: "土培", image: "/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg", isFavorite: true },
      { id: 4, name: "发财树", statusLabel: "休眠", days: 6, cultivationLabel: "土培", image: "/static/flower/e0c65131708dbcea21fdb5a99a157ac4.jpg", isFavorite: false },
      { id: 5, name: "绿萝", statusLabel: "健康", days: 17, cultivationLabel: "水培", image: "/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg", isFavorite: true },
      { id: 6, name: "虎皮兰", statusLabel: "健康", days: 52, cultivationLabel: "土培", image: "/static/flower/b22cd3cf854015e988176e17dab8a554.jpg", isFavorite: false },
      { id: 7, name: "琴叶榕", statusLabel: "死亡", days: 9, cultivationLabel: "土培", image: "/static/flower/4f068b19d4225040f35079b570587bfe.jpg", isFavorite: false },
      { id: 8, name: "吊兰", statusLabel: "健康", days: 35, cultivationLabel: "水培", image: "/static/flower/b22cd3cf854015e988176e17dab8a554.jpg", isFavorite: true }
    ]);
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
    const createTaskConfig = (defaultDays) => {
      return careTaskOptions.reduce((acc, task) => {
        acc[task.key] = { enabled: true, intervalDays: defaultDays };
        return acc;
      }, {});
    };
    const carePlanConfig = common_vendor.reactive({
      enabled: true,
      intervalDays: "3",
      seasonalMode: false,
      tasks: createTaskConfig("3"),
      seasonTasks: {
        spring: createTaskConfig("3"),
        summer: createTaskConfig("2"),
        autumn: createTaskConfig("3"),
        winter: createTaskConfig("5")
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
    const currentPlant = common_vendor.computed(() => {
      return plantBaseList.value.find((item) => item.id === currentPlantId.value) || plantBaseList.value[0];
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
    const onShareToMoments = () => {
      common_vendor.index.showShareMenu({
        menus: ["shareAppMessage", "shareTimeline"]
      });
      common_vendor.index.showToast({
        title: "请点击右上角分享到朋友圈",
        icon: "none"
      });
    };
    const onToggleFavorite = () => {
      currentPlant.value.isFavorite = !currentPlant.value.isFavorite;
      common_vendor.index.showToast({
        title: currentPlant.value.isFavorite ? "已关注该绿植" : "已取消关注",
        icon: "none"
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
          common_vendor.index.showToast({
            title: "已删除",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 400);
        }
      });
    };
    common_vendor.onLoad((query) => {
      const id = Number((query == null ? void 0 : query.id) || 1);
      currentPlantId.value = Number.isNaN(id) ? 1 : id;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentPlant.value.image,
        b: common_vendor.t(currentPlant.value.name),
        c: common_vendor.p({
          name: currentPlant.value.isFavorite ? "star-fill" : "star",
          size: "18",
          color: currentPlant.value.isFavorite ? "#f5b301" : "#b8c2bd"
        }),
        d: common_vendor.o(onToggleFavorite),
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
          size: "20",
          activeColor: "#33c26d",
          modelValue: carePlanConfig.seasonalMode
        }),
        x: carePlanConfig.enabled && carePlanConfig.seasonalMode
      }, carePlanConfig.enabled && carePlanConfig.seasonalMode ? {
        y: common_vendor.o(onSeasonTabChange),
        z: common_vendor.p({
          list: common_vendor.unref(seasonTabList),
          current: activeSeasonIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eefbf3"
        })
      } : {}, {
        A: carePlanConfig.enabled
      }, carePlanConfig.enabled ? {
        B: common_vendor.f(careTaskOptions, (task, k0, i0) => {
          return {
            a: "b13b633e-14-" + i0 + ",b13b633e-11",
            b: common_vendor.p({
              name: task.icon,
              size: "16",
              color: "#33c26d"
            }),
            c: common_vendor.t(task.label),
            d: "b13b633e-15-" + i0 + ",b13b633e-11",
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
            h: "b13b633e-16-" + i0 + ",b13b633e-11",
            i: common_vendor.o(($event) => currentTaskPlanMap.value[task.key].enabled = $event, task.key),
            j: common_vendor.p({
              size: "20",
              activeColor: "#33c26d",
              modelValue: currentTaskPlanMap.value[task.key].enabled
            }),
            k: task.key
          };
        })
      } : {}, {
        C: carePlanConfig.enabled && carePlanConfig.seasonalMode
      }, carePlanConfig.enabled && carePlanConfig.seasonalMode ? {} : {}, {
        D: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        })
      }) : {
        E: common_vendor.t(statsSummary.value.totalCareCount),
        F: common_vendor.t(statsSummary.value.photoCount),
        G: common_vendor.t(statsSummary.value.lastCareGap),
        H: common_vendor.t(statsSummary.value.healthScore),
        I: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        })
      }, {
        p: activeTabIndex.value === 1,
        t: activeTabIndex.value === 2
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b13b633e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/plant/detail.js.map
