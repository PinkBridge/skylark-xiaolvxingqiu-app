"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_subsection2 = common_vendor.resolveComponent("up-subsection");
  (_easycom_up_icon2 + _easycom_up_subsection2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_subsection = () => "../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_subsection)();
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
    const latestLoadToken = common_vendor.ref(0);
    const scopedGardenId = common_vendor.ref("");
    const gardenTitle = common_vendor.ref("我的绿植花园");
    const gardenDescription = common_vendor.ref("记录每一株生命的成长状态");
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
    const leftColumnPlants = common_vendor.computed(() => filteredPlantList.value.filter((_, index) => index % 2 === 0));
    const rightColumnPlants = common_vendor.computed(() => filteredPlantList.value.filter((_, index) => index % 2 === 1));
    const isHealthyPlant = (plant) => {
      const status = `${(plant == null ? void 0 : plant.healthStatus) || ""}`.toLowerCase();
      if (status)
        return status === "healthy" || status === "健康";
      return `${(plant == null ? void 0 : plant.statusLabel) || ""}`.trim() === "健康";
    };
    const isAbnormalPlant = (plant) => {
      const status = `${(plant == null ? void 0 : plant.healthStatus) || ""}`.toLowerCase();
      if (status)
        return ["sick", "dormant", "生病", "休眠"].includes(status);
      const label = `${(plant == null ? void 0 : plant.statusLabel) || ""}`.trim();
      return label === "生病" || label === "休眠";
    };
    const filterPlantCardsByKey = (cards, filterKey) => {
      if (!Array.isArray(cards))
        return [];
      if (filterKey === "healthy")
        return cards.filter((item) => isHealthyPlant(item));
      if (filterKey === "abnormal")
        return cards.filter((item) => isAbnormalPlant(item));
      if (filterKey === "todo")
        return cards.filter((item) => ((item == null ? void 0 : item.todayCareTasks) || []).length > 0);
      if (filterKey === "focus")
        return cards.filter((item) => !!(item == null ? void 0 : item.focused));
      return cards;
    };
    const buildTodayCareTaskMap = (tasks) => {
      const map = {};
      (tasks || []).forEach((task) => {
        const plantName = `${(task == null ? void 0 : task.plantName) || ""}`.trim();
        if (!plantName)
          return;
        const isToday = Number(task == null ? void 0 : task.offset) === 0;
        const pending = !(task == null ? void 0 : task.completed);
        if (!isToday || !pending)
          return;
        if (!map[plantName])
          map[plantName] = [];
        const label = `${(task == null ? void 0 : task.name) || ""}`.trim() || "待养护";
        map[plantName].push(label);
      });
      return map;
    };
    const loadPlants = async () => {
      const token = ++latestLoadToken.value;
      const filter = filterMap[activePlantFilterIndex.value] || "all";
      const requestFilter = filter === "todo" || filter === "all" ? void 0 : filter;
      greenPlantList.value = [];
      Promise.all([
        api_index.listPlants(requestFilter, scopedGardenId.value || void 0),
        api_index.listCareTasks(scopedGardenId.value || void 0).catch(() => [])
      ]).then(([list, tasks]) => {
        if (token !== latestLoadToken.value)
          return;
        const todayTaskMap = buildTodayCareTaskMap(tasks || []);
        const cards = (list || []).map((item, index) => {
          const card = toCard(item, index);
          const taskByName = todayTaskMap[`${(card == null ? void 0 : card.name) || ""}`.trim()] || [];
          card.todayCareTasks = taskByName.length ? taskByName : card.todayCareTasks || [];
          return card;
        });
        greenPlantList.value = filterPlantCardsByKey(cards, filter);
      }).catch((err) => {
        if (token !== latestLoadToken.value)
          return;
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加载绿植失败",
          icon: "none"
        });
      });
    };
    const loadCurrentGardenMeta = () => {
      return api_index.listGardens().then((rows) => {
        const gardens = rows || [];
        if (!gardens.length) {
          gardenTitle.value = "我的绿植花园";
          gardenDescription.value = "记录每一株生命的成长状态";
          return;
        }
        const selectedId = `${scopedGardenId.value || readSelectedGardenId()}`.trim();
        const selectedGarden = gardens.find((item) => `${(item == null ? void 0 : item.id) ?? ""}` === selectedId);
        const defaultGarden = gardens.find((item) => !!(item == null ? void 0 : item.isDefault));
        const targetGarden = selectedGarden || defaultGarden || gardens[0];
        const targetId = `${(targetGarden == null ? void 0 : targetGarden.id) ?? ""}`.trim();
        if (targetId) {
          scopedGardenId.value = targetId;
          common_vendor.index.setStorageSync(SELECTED_GARDEN_KEY, targetId);
        }
        gardenTitle.value = (targetGarden == null ? void 0 : targetGarden.name) || "我的绿植花园";
        gardenDescription.value = (targetGarden == null ? void 0 : targetGarden.description) || "记录每一株生命的成长状态";
      }).catch(() => {
        gardenTitle.value = "我的绿植花园";
        gardenDescription.value = "记录每一株生命的成长状态";
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
      loadCurrentGardenMeta().finally(() => {
        loadPlants();
      });
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
      return common_vendor.e({
        a: common_vendor.p({
          name: "home",
          size: "14",
          color: "#33c26d"
        }),
        b: common_vendor.o(goIndexPage),
        c: `${navMetrics.value.statusBarHeight}px`,
        d: `${navMetrics.value.contentBarHeight}px`,
        e: common_vendor.t(gardenTitle.value),
        f: common_vendor.p({
          name: "plus",
          size: "16",
          color: "#33c26d"
        }),
        g: common_vendor.o(onAddPlant),
        h: common_vendor.t(gardenDescription.value),
        i: common_vendor.o(onPlantFilterChange),
        j: common_vendor.p({
          list: plantFilterTabs,
          current: activePlantFilterIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eaf9f0"
        }),
        k: filteredPlantList.value.length
      }, filteredPlantList.value.length ? {
        l: common_vendor.f(leftColumnPlants.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.image,
            b: common_vendor.t(item.statusLabel),
            c: common_vendor.n(`status-${item.healthStatus}`),
            d: common_vendor.t(item.days),
            e: `${item.coverHeight}rpx`,
            f: item.todayCareTasks.length
          }, item.todayCareTasks.length ? common_vendor.e({
            g: common_vendor.f(item.todayCareTasks.slice(0, 3), (task, k1, i1) => {
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
            l: "beaff5d6-3-" + i0,
            m: common_vendor.p({
              name: "warning-fill",
              size: "15",
              color: "#f5b301"
            })
          } : {}, {
            n: item.id,
            o: common_vendor.o(($event) => onPlantCardClick(item), item.id)
          });
        }),
        m: common_vendor.f(rightColumnPlants.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.image,
            b: common_vendor.t(item.statusLabel),
            c: common_vendor.n(`status-${item.healthStatus}`),
            d: common_vendor.t(item.days),
            e: `${item.coverHeight}rpx`,
            f: item.todayCareTasks.length
          }, item.todayCareTasks.length ? common_vendor.e({
            g: common_vendor.f(item.todayCareTasks.slice(0, 3), (task, k1, i1) => {
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
            l: "beaff5d6-4-" + i0,
            m: common_vendor.p({
              name: "warning-fill",
              size: "15",
              color: "#f5b301"
            })
          } : {}, {
            n: item.id,
            o: common_vendor.o(($event) => onPlantCardClick(item), item.id)
          });
        })
      } : {}, {
        n: `${navMetrics.value.navBarHeight + 12}px`
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-beaff5d6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/plant/plant.js.map
