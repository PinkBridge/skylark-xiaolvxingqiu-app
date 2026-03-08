"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_auth = require("../../utils/auth.js");
const WX_AUTH_NEXT_ACTION_KEY = "wxAuthNextAction";
const _sfc_main = {
  __name: "wechat-entry",
  setup(__props) {
    const submitting = common_vendor.ref(false);
    const nextAction = common_vendor.ref("");
    const profile = common_vendor.ref({
      avatar: "",
      name: "",
      gender: "unknown",
      phone: ""
    });
    const hasProfile = common_vendor.computed(() => !!profile.value.name);
    const hasPhone = common_vendor.computed(() => !!profile.value.phone);
    const normalizeGender = (value) => {
      if (value === 1 || value === "1")
        return "male";
      if (value === 2 || value === "2")
        return "female";
      return "unknown";
    };
    const ensureUserProfile = () => new Promise((resolve, reject) => {
      if (profile.value.name) {
        resolve();
        return;
      }
      common_vendor.index.getUserProfile({
        desc: "用于展示头像和昵称",
        success: (res) => {
          const info = (res == null ? void 0 : res.userInfo) || {};
          profile.value.avatar = info.avatarUrl || profile.value.avatar;
          profile.value.name = info.nickName || profile.value.name;
          profile.value.gender = normalizeGender(info.gender);
          resolve();
        },
        fail: () => {
          reject(new Error("请先授权头像昵称"));
        }
      });
    });
    const onAuthorizePhone = (event) => {
      if (submitting.value)
        return;
      const detail = (event == null ? void 0 : event.detail) || {};
      if (detail.errMsg && detail.errMsg.indexOf(":ok") === -1) {
        common_vendor.index.showToast({
          title: "需要手机号授权才能继续",
          icon: "none"
        });
        return;
      }
      submitting.value = true;
      ensureUserProfile().then(() => {
        common_vendor.index.login({
          provider: "weixin",
          success: (loginRes) => {
            api_index.authWechatPhone({
              code: (loginRes == null ? void 0 : loginRes.code) || "",
              encryptedData: detail.encryptedData || "",
              iv: detail.iv || "",
              avatar: profile.value.avatar || "",
              name: profile.value.name || "",
              gender: profile.value.gender || "unknown"
            }).then((data) => {
              profile.value.phone = (data == null ? void 0 : data.phone) || "";
              utils_auth.saveWxAuthProfile({
                ...profile.value,
                phone: (data == null ? void 0 : data.phone) || ""
              });
              if (nextAction.value === "mine") {
                common_vendor.index.redirectTo({
                  url: "/pages/mime/mime",
                  fail: () => {
                    common_vendor.index.reLaunch({
                      url: "/pages/mime/mime"
                    });
                  }
                });
                return;
              }
              if (nextAction.value === "recognize") {
                common_vendor.index.setStorageSync(WX_AUTH_NEXT_ACTION_KEY, "recognize");
              }
              common_vendor.index.reLaunch({
                url: "/pages/index/index"
              });
            }).catch((err) => {
              common_vendor.index.showToast({
                title: (err == null ? void 0 : err.message) || "手机号授权失败",
                icon: "none"
              });
            }).finally(() => {
              submitting.value = false;
            });
          },
          fail: () => {
            submitting.value = false;
            common_vendor.index.showToast({
              title: "微信登录失败",
              icon: "none"
            });
          }
        });
      }).catch((err) => {
        submitting.value = false;
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "请先完成头像授权",
          icon: "none"
        });
      });
    };
    common_vendor.onLoad((query) => {
      nextAction.value = `${(query == null ? void 0 : query.next) || ""}`.trim().toLowerCase();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(hasProfile.value ? "已授权" : "未授权"),
        b: common_vendor.t(hasPhone.value ? "已授权" : "未授权"),
        c: common_vendor.t(submitting.value ? "授权中..." : "授权手机号并进入"),
        d: common_vendor.o(onAuthorizePhone),
        e: submitting.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-11809136"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/auth/wechat-entry.js.map
