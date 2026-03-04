"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
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
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      name: "/static/image/flower-selected.png",
      size: "28",
      color: "#33c26d"
    }),
    b: common_vendor.p({
      showHead: false,
      showFoot: false,
      border: false,
      margin: "0"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-239a5f37"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mime/version.js.map
