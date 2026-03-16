"use strict";
const common_vendor = require("../common/vendor.js");
const USER_PRIVACY_ACCEPTED_KEY = "userPrivacyAccepted";
const hasUserPrivacyAccepted = () => !!common_vendor.index.getStorageSync(USER_PRIVACY_ACCEPTED_KEY);
const setUserPrivacyAccepted = (accepted = true) => {
  common_vendor.index.setStorageSync(USER_PRIVACY_ACCEPTED_KEY, !!accepted);
};
const openUserAgreement = () => {
  common_vendor.index.navigateTo({
    url: "/pages/mime/user-agreement",
    fail: () => {
      common_vendor.index.showToast({
        title: "打开用户协议失败",
        icon: "none"
      });
    }
  });
};
const openPrivacyPolicy = () => {
  common_vendor.index.navigateTo({
    url: "/pages/mime/privacy-policy",
    fail: () => {
      common_vendor.index.showToast({
        title: "打开隐私政策失败",
        icon: "none"
      });
    }
  });
};
exports.hasUserPrivacyAccepted = hasUserPrivacyAccepted;
exports.openPrivacyPolicy = openPrivacyPolicy;
exports.openUserAgreement = openUserAgreement;
exports.setUserPrivacyAccepted = setUserPrivacyAccepted;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/privacy.js.map
