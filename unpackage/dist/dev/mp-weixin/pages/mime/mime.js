"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_gap2 = common_vendor.resolveComponent("up-gap");
  const _easycom_up_cell2 = common_vendor.resolveComponent("up-cell");
  const _easycom_up_cell_group2 = common_vendor.resolveComponent("up-cell-group");
  (_easycom_up_icon2 + _easycom_up_gap2 + _easycom_up_cell2 + _easycom_up_cell_group2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_gap = () => "../../uni_modules/uview-plus/components/u-gap/u-gap.js";
const _easycom_up_cell = () => "../../uni_modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_up_cell_group = () => "../../uni_modules/uview-plus/components/u-cell-group/u-cell-group.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_gap + _easycom_up_cell + _easycom_up_cell_group)();
}
const profileStorageKey = "userProfile";
const defaultAvatar = "https://cdn.uviewui.com/uview/example/button.png";
const _sfc_main = {
  __name: "mime",
  setup(__props) {
    const iconColor = common_vendor.ref("#33c26d");
    const bgColor = common_vendor.ref("#F8F8F8");
    const profile = common_vendor.ref({
      name: "姚 棉伟",
      gender: "male",
      motto: "每一份生命都值得尊重和呵护!",
      avatar: defaultAvatar
    });
    const genderIcon = common_vendor.computed(() => profile.value.gender === "female" ? "woman" : "man");
    const loadProfile = () => {
      const savedProfile = common_vendor.index.getStorageSync(profileStorageKey);
      if (!savedProfile || typeof savedProfile !== "object")
        return;
      profile.value = {
        name: savedProfile.name || profile.value.name,
        gender: savedProfile.gender || profile.value.gender,
        motto: savedProfile.motto || profile.value.motto,
        avatar: savedProfile.avatar || defaultAvatar
      };
    };
    common_vendor.onShow(() => {
      loadProfile();
    });
    const goPushSetting = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mime/push-setting"
      });
    };
    const showStarCoinInfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mime/coin"
      });
    };
    const goAbout = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mime/about"
      });
    };
    const goVersion = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mime/version"
      });
    };
    const goFeedback = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mime/feedback"
      });
    };
    const goProfile = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mime/profile"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: profile.value.avatar,
        b: common_vendor.t(profile.value.name),
        c: common_vendor.p({
          size: "14",
          name: genderIcon.value,
          color: iconColor.value
        }),
        d: common_vendor.t(profile.value.motto),
        e: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#7bc59a"
        }),
        f: common_vendor.o(goProfile),
        g: common_vendor.p({
          height: "5",
          bgColor: bgColor.value
        }),
        h: common_vendor.p({
          size: "18",
          name: "bell-fill",
          color: iconColor.value
        }),
        i: common_vendor.o(goPushSetting),
        j: common_vendor.p({
          title: "推送设置",
          clickable: true,
          isLink: true
        }),
        k: common_vendor.p({
          size: "18",
          name: "red-packet-fill",
          color: iconColor.value
        }),
        l: common_vendor.o(showStarCoinInfo),
        m: common_vendor.p({
          title: "我的星币",
          clickable: true,
          isLink: true
        }),
        n: common_vendor.p({
          height: "3",
          bgColor: bgColor.value
        }),
        o: common_vendor.p({
          size: "16",
          name: "info-circle-fill",
          color: iconColor.value
        }),
        p: common_vendor.o(goAbout),
        q: common_vendor.p({
          title: "关于我们",
          clickable: true,
          isLink: true
        }),
        r: common_vendor.p({
          size: "16",
          name: "setting-fill",
          color: iconColor.value
        }),
        s: common_vendor.o(goVersion),
        t: common_vendor.p({
          title: "软件版本",
          clickable: true,
          isLink: true
        }),
        v: common_vendor.p({
          size: "16",
          name: "question-circle-fill",
          color: iconColor.value
        }),
        w: common_vendor.o(goFeedback),
        x: common_vendor.p({
          title: "反馈和建议",
          clickable: true,
          isLink: true
        }),
        y: common_vendor.p({
          height: "3",
          bgColor: bgColor.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a476c669"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mime/mime.js.map
