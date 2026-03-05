"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_subsection2 = common_vendor.resolveComponent("up-subsection");
  const _easycom_up_waterfall2 = common_vendor.resolveComponent("up-waterfall");
  (_easycom_up_icon2 + _easycom_up_subsection2 + _easycom_up_waterfall2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_subsection = () => "../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
const _easycom_up_waterfall = () => "../../uni_modules/uview-plus/components/u-waterfall/u-waterfall.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_subsection + _easycom_up_waterfall)();
}
const SELECTED_GARDEN_KEY = "selectedGardenId";
const SELECTED_PLANT_FILTER_KEY = "selectedPlantFilter";
const _sfc_main = {
  __name: "plant",
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
    const plantFilterTabs = ["全部", "健康", "异常", "今日待呵护", "关注"];
    const activePlantFilterIndex = common_vendor.ref(0);
    const greenPlantList = common_vendor.ref([]);
    const waterfallKey = common_vendor.ref(0);
    const scopedGardenId = common_vendor.ref("");
    const filterMap = {
      0: "all",
      1: "healthy",
      2: "abnormal",
      3: "todo",
      4: "focus"
    };
    const reverseFilterMap = {
      all: 0,
      healthy: 1,
      abnormal: 2,
      todo: 3,
      focus: 4
    };
    const readSelectedGardenId = () => `${common_vendor.index.getStorageSync(SELECTED_GARDEN_KEY) || ""}`.trim();
    const readSelectedPlantFilter = () => `${common_vendor.index.getStorageSync(SELECTED_PLANT_FILTER_KEY) || ""}`.trim().toLowerCase();
    const toCard = (item, index) => ({
      ...item,
      coverHeight: 190 + index % 4 * 20,
      focused: !!item.focused,
      focusReason: item.focusReason || "",
      todayCareTasks: item.todayCareTasks || [],
      image: item.image || "/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg",
      statusLabel: item.statusLabel || "健康",
      healthStatus: item.healthStatus || "healthy",
      days: item.days || 1
    });
    const filteredPlantList = common_vendor.computed(() => greenPlantList.value);
    const loadPlants = () => {
      const filter = filterMap[activePlantFilterIndex.value] || "all";
      api_index.listPlants(filter, scopedGardenId.value || void 0).then((list) => {
        greenPlantList.value = [];
        greenPlantList.value = (list || []).map((item, index) => toCard(item, index));
        waterfallKey.value += 1;
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加载绿植失败",
          icon: "none"
        });
      });
    };
    const onPlantFilterChange = (index) => {
      activePlantFilterIndex.value = index;
      loadPlants();
    };
    const onPlantCardClick = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/plant/detail?id=${item.id}`,
        events: {
          plantDeleted: (payload) => {
            handlePlantDeleted(payload);
          }
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: (err == null ? void 0 : err.errMsg) || "页面跳转失败",
            icon: "none"
          });
        }
      });
    };
    const onAddPlant = () => {
      common_vendor.index.navigateTo({
        url: "/pages/plant/add",
        fail: (err) => {
          common_vendor.index.showToast({
            title: (err == null ? void 0 : err.errMsg) || "页面跳转失败",
            icon: "none"
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
    const handlePlantDeleted = (payload) => {
      const deletedId = Number((payload == null ? void 0 : payload.id) || 0);
      if (deletedId) {
        greenPlantList.value = greenPlantList.value.filter((item) => Number(item.id) !== deletedId);
        waterfallKey.value += 1;
      }
      loadPlants();
    };
    common_vendor.onShow(() => {
      common_vendor.index.$off("plant:deleted", handlePlantDeleted);
      common_vendor.index.$on("plant:deleted", handlePlantDeleted);
      const selectedGardenId = readSelectedGardenId();
      if (selectedGardenId || !scopedGardenId.value) {
        scopedGardenId.value = selectedGardenId;
      }
      const selectedFilter = readSelectedPlantFilter();
      if (reverseFilterMap[selectedFilter] !== void 0) {
        activePlantFilterIndex.value = reverseFilterMap[selectedFilter];
        common_vendor.index.removeStorageSync(SELECTED_PLANT_FILTER_KEY);
      }
      loadPlants();
    });
    common_vendor.onLoad((query) => {
      const filterKey = `${(query == null ? void 0 : query.filter) || ""}`.toLowerCase();
      if (reverseFilterMap[filterKey] !== void 0) {
        activePlantFilterIndex.value = reverseFilterMap[filterKey];
      }
      const gardenId = `${(query == null ? void 0 : query.gardenId) || ""}`.trim();
      if (gardenId) {
        scopedGardenId.value = gardenId;
        common_vendor.index.setStorageSync(SELECTED_GARDEN_KEY, gardenId);
      } else {
        scopedGardenId.value = readSelectedGardenId();
      }
    });
    common_vendor.onUnload(() => {
      common_vendor.index.$off("plant:deleted", handlePlantDeleted);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "home",
          size: "14",
          color: "#33c26d"
        }),
        b: common_vendor.o(goIndexPage),
        c: `${navMetrics.value.statusBarHeight}px`,
        d: `${navMetrics.value.contentBarHeight}px`,
        e: common_vendor.p({
          name: "plus",
          size: "16",
          color: "#33c26d"
        }),
        f: common_vendor.o(onAddPlant),
        g: common_vendor.o(onPlantFilterChange),
        h: common_vendor.p({
          list: plantFilterTabs,
          current: activePlantFilterIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eaf9f0"
        }),
        i: common_vendor.w(({
          colList
        }, s0, i0) => {
          return {
            a: common_vendor.f(colList, (item, k1, i1) => {
              return common_vendor.e({
                a: item.image,
                b: common_vendor.t(item.statusLabel),
                c: common_vendor.n(`status-${item.healthStatus}`),
                d: common_vendor.t(item.days),
                e: `${item.coverHeight}rpx`,
                f: item.todayCareTasks.length
              }, item.todayCareTasks.length ? common_vendor.e({
                g: common_vendor.f(item.todayCareTasks.slice(0, 3), (task, k2, i2) => {
                  return {
                    a: common_vendor.t(task),
                    b: `${item.id}-${task}`
                  };
                }),
                h: item.todayCareTasks.length > 3
              }, item.todayCareTasks.length > 3 ? {
                i: common_vendor.t(item.todayCareTasks.length - 3)
              } : {}) : {}, {
                j: common_vendor.t(item.name),
                k: item.focused
              }, item.focused ? {
                l: "beaff5d6-4-" + i0 + "-" + i1 + ",beaff5d6-3",
                m: common_vendor.p({
                  name: "star-fill",
                  size: "15",
                  color: "#f5b301"
                })
              } : {}, {
                n: item.focused && item.focusReason
              }, item.focused && item.focusReason ? {
                o: common_vendor.t(item.focusReason)
              } : {}, {
                p: item.id,
                q: common_vendor.o(($event) => onPlantCardClick(item), item.id)
              });
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "column",
          path: "i",
          vueId: "beaff5d6-3"
        }),
        j: waterfallKey.value,
        k: common_vendor.p({
          modelValue: filteredPlantList.value,
          idKey: "id",
          addTime: 80
        }),
        l: `${navMetrics.value.navBarHeight + 12}px`
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-beaff5d6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/plant/plant.js.map
