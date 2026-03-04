"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_card2 = common_vendor.resolveComponent("up-card");
  (_easycom_up_icon2 + _easycom_up_card2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_card = () => "../../uni_modules/uview-plus/components/u-card/u-card.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_card)();
}
const gardenStorageKey = "gardenInfo";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const defaultGardenInfo = {
      title: "我的莫奈花园",
      subTitle: "2020-05-15",
      thumb: "https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg",
      image: "https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg",
      description: "釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放"
    };
    const cardData = common_vendor.ref({
      ...defaultGardenInfo
    });
    const footerStats = [
      { key: "plant", icon: "grid-fill", color: "#33c26d", label: "绿植 20", path: "/pages/plant/plant", mode: "navigateTo" },
      { key: "focus", icon: "heart-fill", color: "#33c26d", label: "需关注 2", path: "/pages/care/care", mode: "switchTab" },
      { key: "care", icon: "clock-fill", color: "#33c26d", label: "今日呵护 10", path: "/pages/mime/mime", mode: "switchTab" }
    ];
    const onCardClick = () => {
      common_vendor.index.showToast({
        title: "可在这里跳转花园详情页",
        icon: "none"
      });
    };
    const onEditGardenInfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/garden-edit"
      });
    };
    const onAddGarden = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/garden-create"
      });
    };
    const loadGardenInfo = () => {
      const saved = common_vendor.index.getStorageSync(gardenStorageKey);
      if (!saved || typeof saved !== "object")
        return;
      cardData.value = {
        ...defaultGardenInfo,
        ...saved
      };
    };
    common_vendor.onShow(() => {
      loadGardenInfo();
    });
    const onFooterAction = (item) => {
      const currentPage = getCurrentPages().slice(-1)[0];
      if ((currentPage == null ? void 0 : currentPage.route) && `/${currentPage.route}` === item.path) {
        common_vendor.index.showToast({
          title: `${item.label} 当前页`,
          icon: "none"
        });
        return;
      }
      if (item.mode === "switchTab") {
        common_vendor.index.switchTab({
          url: item.path,
          fail: (err) => {
            common_vendor.index.showToast({
              title: (err == null ? void 0 : err.errMsg) || "tab 跳转失败",
              icon: "none"
            });
          }
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: item.path,
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
        a: cardData.value.thumb,
        b: common_vendor.t(cardData.value.title),
        c: common_vendor.p({
          name: "edit-pen",
          size: "16",
          color: "#33c26d"
        }),
        d: common_vendor.o(onEditGardenInfo),
        e: common_vendor.t(cardData.value.subTitle),
        f: cardData.value.image,
        g: common_vendor.t(cardData.value.description),
        h: common_vendor.f(footerStats, (item, k0, i0) => {
          return {
            a: "1cf27b2a-2-" + i0 + ",1cf27b2a-0",
            b: common_vendor.p({
              name: item.icon,
              size: "16",
              color: item.color
            }),
            c: common_vendor.t(item.label),
            d: "1cf27b2a-3-" + i0 + ",1cf27b2a-0",
            e: item.key,
            f: common_vendor.o(($event) => onFooterAction(item), item.key)
          };
        }),
        i: common_vendor.p({
          name: "arrow-right",
          size: "12",
          color: "#7bc59a"
        }),
        j: common_vendor.o(onCardClick),
        k: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        l: common_vendor.p({
          name: "plus",
          size: "20",
          color: "#ffffff"
        }),
        m: common_vendor.o(onAddGarden)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
