"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_switch2 = common_vendor.resolveComponent("up-switch");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_card2 = common_vendor.resolveComponent("up-card");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_up_datetime_picker2 = common_vendor.resolveComponent("up-datetime-picker");
  (_easycom_up_switch2 + _easycom_up_icon2 + _easycom_up_card2 + _easycom_up_button2 + _easycom_up_datetime_picker2)();
}
const _easycom_up_switch = () => "../../uni_modules/uview-plus/components/u-switch/u-switch.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_card = () => "../../uni_modules/uview-plus/components/u-card/u-card.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_datetime_picker = () => "../../uni_modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
if (!Math) {
  (_easycom_up_switch + _easycom_up_icon + _easycom_up_card + _easycom_up_button + _easycom_up_datetime_picker)();
}
const _sfc_main = {
  __name: "push-setting",
  setup(__props) {
    const pushEnabled = common_vendor.ref(false);
    const pushTime = common_vendor.ref("09:00");
    const showTimePicker = common_vendor.ref(false);
    const timePickerValue = common_vendor.ref("09:00");
    const openTimePicker = () => {
      if (!pushEnabled.value)
        return;
      showTimePicker.value = true;
    };
    const onTimeConfirm = (payload) => {
      const value = (payload == null ? void 0 : payload.value) || "09:00";
      pushTime.value = value;
      timePickerValue.value = value;
      showTimePicker.value = false;
    };
    const savePushSetting = () => {
      common_vendor.index.showToast({
        title: "推送设置已保存",
        icon: "success"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => pushEnabled.value = $event),
        b: common_vendor.p({
          size: "20",
          activeColor: "#33c26d",
          modelValue: pushEnabled.value
        }),
        c: common_vendor.t(pushTime.value),
        d: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#7bc59a"
        }),
        e: !pushEnabled.value ? 1 : "",
        f: common_vendor.o(openTimePicker),
        g: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        h: common_vendor.o(savePushSetting),
        i: common_vendor.p({
          type: "primary",
          text: "保存设置",
          color: "#33c26d",
          shape: "circle",
          customStyle: "margin-top: 24rpx;"
        }),
        j: common_vendor.o(onTimeConfirm),
        k: common_vendor.o(($event) => showTimePicker.value = false),
        l: common_vendor.o(($event) => showTimePicker.value = false),
        m: common_vendor.p({
          show: showTimePicker.value,
          value: timePickerValue.value,
          mode: "time"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b1a7c7f1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mime/push-setting.js.map
