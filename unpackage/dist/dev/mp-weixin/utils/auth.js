"use strict";
const common_vendor = require("../common/vendor.js");
const WX_AUTH_DONE_KEY = "wxAuthDone";
const WX_USER_PROFILE_CACHE_KEY = "wxUserProfileCache";
const readCachedWxProfile = () => {
  const data = common_vendor.index.getStorageSync(WX_USER_PROFILE_CACHE_KEY);
  if (!data || typeof data !== "object")
    return null;
  return data;
};
const saveWxAuthProfile = (profile) => {
  const cached = readCachedWxProfile() || {};
  const normalizedPhone = `${(profile == null ? void 0 : profile.phone) ?? (cached == null ? void 0 : cached.phone) ?? ""}`.trim();
  const payload = {
    avatar: (profile == null ? void 0 : profile.avatar) ?? (cached == null ? void 0 : cached.avatar) ?? "",
    name: (profile == null ? void 0 : profile.name) ?? (cached == null ? void 0 : cached.name) ?? "",
    gender: (profile == null ? void 0 : profile.gender) ?? (cached == null ? void 0 : cached.gender) ?? "unknown",
    phone: normalizedPhone,
    updatedAt: Date.now()
  };
  common_vendor.index.setStorageSync(WX_USER_PROFILE_CACHE_KEY, payload);
  common_vendor.index.setStorageSync(WX_AUTH_DONE_KEY, (profile == null ? void 0 : profile.authDone) === true || !!payload.phone);
};
exports.readCachedWxProfile = readCachedWxProfile;
exports.saveWxAuthProfile = saveWxAuthProfile;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/auth.js.map
