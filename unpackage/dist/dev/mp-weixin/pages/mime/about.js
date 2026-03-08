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
const contactEmail = "xiaolvxingqiu@163.com";
const groupQrUrl = "/static/image/wechat-group-qr.png";
const _sfc_main = {
  __name: "about",
  setup(__props) {
    const copyEmail = () => {
      common_vendor.index.setClipboardData({
        data: contactEmail,
        success: () => {
          common_vendor.index.showToast({
            title: "邮箱已复制",
            icon: "success"
          });
        }
      });
    };
    const previewGroupQr = () => {
      common_vendor.index.previewImage({
        current: groupQrUrl,
        urls: [groupQrUrl]
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "/static/image/flower-selected.png",
          size: "28",
          color: "#33c26d"
        }),
        b: common_vendor.t(contactEmail),
        c: common_vendor.o(copyEmail),
        d: common_vendor.p({
          name: "file-text",
          size: "18",
          color: "#33c26d"
        }),
        e: groupQrUrl,
        f: common_vendor.o(previewGroupQr),
        g: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f535a5aa"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mime/about.js.map
