"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const uni_modules_uviewPlus_index = require("./uni_modules/uview-plus/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/auth/wechat-entry.js";
  "./pages/care/care.js";
  "./pages/calendar/calendar.js";
  "./pages/mime/mime.js";
  "./pages/plant/plant.js";
  "./pages/plant/add.js";
  "./pages/plant/detail.js";
  "./pages/index/garden-edit.js";
  "./pages/index/garden-create.js";
  "./pages/mime/push-setting.js";
  "./pages/mime/coin.js";
  "./pages/mime/profile.js";
  "./pages/mime/about.js";
  "./pages/mime/version.js";
  "./pages/mime/feedback.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(uni_modules_uviewPlus_index.uviewPlus);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
