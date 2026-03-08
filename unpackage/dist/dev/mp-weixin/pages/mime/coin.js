"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_up_card2 = common_vendor.resolveComponent("up-card");
  _easycom_up_card2();
}
const _easycom_up_card = () => "../../uni_modules/uview-plus/components/u-card/u-card.js";
if (!Math) {
  _easycom_up_card();
}
const _sfc_main = {
  __name: "coin",
  setup(__props) {
    const starCoinAmount = common_vendor.ref(0);
    const nextCoinNeed = common_vendor.ref(20);
    const completedActivityTotal = common_vendor.ref(0);
    const loadCoinAccount = () => {
      api_index.getCoinAccount().then((data) => {
        starCoinAmount.value = Number((data == null ? void 0 : data.coinBalance) || 0);
        nextCoinNeed.value = Number((data == null ? void 0 : data.nextCoinNeed) || 20);
        completedActivityTotal.value = Number((data == null ? void 0 : data.completedActivityTotal) || 0);
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加载星币失败",
          icon: "none"
        });
      });
    };
    common_vendor.onShow(() => {
      loadCoinAccount();
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(starCoinAmount.value),
        c: common_vendor.t(nextCoinNeed.value),
        d: common_vendor.t(completedActivityTotal.value),
        e: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-43fedd15"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mime/coin.js.map
