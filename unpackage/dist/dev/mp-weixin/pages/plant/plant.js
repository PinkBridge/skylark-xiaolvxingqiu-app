"use strict";
const common_vendor = require("../../common/vendor.js");
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
const _sfc_main = {
  __name: "plant",
  setup(__props) {
    const plantFilterTabs = ["全部", "健康", "异常", "今日待呵护", "关注"];
    const activePlantFilterIndex = common_vendor.ref(0);
    const greenPlantList = common_vendor.ref([
      {
        id: 1,
        name: "常春藤",
        healthStatus: "healthy",
        statusLabel: "健康",
        days: 28,
        coverHeight: 210,
        isFavorite: true,
        todayCareTasks: ["浇水", "拍照"],
        image: "/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg"
      },
      {
        id: 2,
        name: "龟背竹",
        healthStatus: "sick",
        statusLabel: "生病",
        days: 13,
        coverHeight: 260,
        isFavorite: false,
        todayCareTasks: ["施肥", "除虫害", "测量"],
        image: "/static/flower/b22cd3cf854015e988176e17dab8a554.jpg"
      },
      {
        id: 3,
        name: "多肉白牡丹",
        healthStatus: "healthy",
        statusLabel: "健康",
        days: 41,
        coverHeight: 190,
        isFavorite: true,
        todayCareTasks: [],
        image: "/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg"
      },
      {
        id: 4,
        name: "发财树",
        healthStatus: "dormant",
        statusLabel: "休眠",
        days: 6,
        coverHeight: 300,
        isFavorite: false,
        todayCareTasks: ["修剪", "笔记"],
        image: "/static/flower/e0c65131708dbcea21fdb5a99a157ac4.jpg"
      },
      {
        id: 5,
        name: "绿萝",
        healthStatus: "healthy",
        statusLabel: "健康",
        days: 17,
        coverHeight: 230,
        isFavorite: true,
        todayCareTasks: ["浇水", "施肥", "换盆", "测量"],
        image: "/static/flower/4c43268b47b31cfab3d434d474ad728c.jpg"
      },
      {
        id: 6,
        name: "虎皮兰",
        healthStatus: "healthy",
        statusLabel: "健康",
        days: 52,
        coverHeight: 270,
        isFavorite: false,
        todayCareTasks: [],
        image: "/static/flower/b22cd3cf854015e988176e17dab8a554.jpg"
      },
      {
        id: 7,
        name: "琴叶榕",
        healthStatus: "dead",
        statusLabel: "死亡",
        days: 9,
        coverHeight: 220,
        isFavorite: false,
        todayCareTasks: ["笔记"],
        image: "/static/flower/4f068b19d4225040f35079b570587bfe.jpg"
      },
      {
        id: 8,
        name: "吊兰",
        healthStatus: "healthy",
        statusLabel: "健康",
        days: 35,
        coverHeight: 250,
        isFavorite: true,
        todayCareTasks: ["拍照"],
        image: "/static/flower/b22cd3cf854015e988176e17dab8a554.jpg"
      }
    ]);
    const abnormalPlantStatuses = ["sick", "dormant", "dead"];
    const filteredPlantList = common_vendor.computed(() => {
      switch (activePlantFilterIndex.value) {
        case 1:
          return greenPlantList.value.filter((item) => item.healthStatus === "healthy");
        case 2:
          return greenPlantList.value.filter((item) => abnormalPlantStatuses.includes(item.healthStatus));
        case 3:
          return greenPlantList.value.filter((item) => item.todayCareTasks.length > 0);
        case 4:
          return greenPlantList.value.filter((item) => item.isFavorite);
        default:
          return greenPlantList.value;
      }
    });
    const onPlantFilterChange = (index) => {
      activePlantFilterIndex.value = index;
    };
    const onPlantCardClick = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/plant/detail?id=${item.id}`,
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
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "plus",
          size: "16",
          color: "#33c26d"
        }),
        b: common_vendor.o(onAddPlant),
        c: common_vendor.o(onPlantFilterChange),
        d: common_vendor.p({
          list: plantFilterTabs,
          current: activePlantFilterIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eaf9f0"
        }),
        e: common_vendor.w(({
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
                k: item.isFavorite
              }, item.isFavorite ? {
                l: "beaff5d6-3-" + i0 + "-" + i1 + ",beaff5d6-2",
                m: common_vendor.p({
                  name: "star-fill",
                  size: "15",
                  color: "#f5b301"
                })
              } : {}, {
                n: item.id,
                o: common_vendor.o(($event) => onPlantCardClick(item), item.id)
              });
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "column",
          path: "e",
          vueId: "beaff5d6-2"
        }),
        f: common_vendor.p({
          modelValue: filteredPlantList.value,
          idKey: "id",
          addTime: 80
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-beaff5d6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/plant/plant.js.map
