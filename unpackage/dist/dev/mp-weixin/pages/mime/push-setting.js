"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
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
    const authStatus = common_vendor.ref("UNKNOWN");
    const subscribeTemplateId = common_vendor.ref("");
    const updatingSwitch = common_vendor.ref(false);
    const saving = common_vendor.ref(false);
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
    const loadPushSetting = () => {
      api_index.getSubscribeSetting().then((data) => {
        updatingSwitch.value = true;
        pushEnabled.value = !!(data == null ? void 0 : data.enabled);
        pushTime.value = `${(data == null ? void 0 : data.pushTime) || "09:00"}`.trim() || "09:00";
        timePickerValue.value = pushTime.value;
        authStatus.value = `${(data == null ? void 0 : data.authStatus) || "UNKNOWN"}`.trim().toUpperCase();
        subscribeTemplateId.value = `${(data == null ? void 0 : data.templateId) || ""}`.trim();
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加载推送设置失败",
          icon: "none"
        });
      }).finally(() => {
        updatingSwitch.value = false;
      });
    };
    const persistSetting = ({ enabled, auth = authStatus.value, silent = false } = {}) => {
      if (saving.value)
        return Promise.resolve();
      saving.value = true;
      return api_index.saveSubscribeSetting({
        enabled: !!enabled,
        pushTime: pushTime.value,
        authStatus: auth
      }).then((data) => {
        authStatus.value = `${(data == null ? void 0 : data.authStatus) || auth || "UNKNOWN"}`.trim().toUpperCase();
        if (!silent) {
          common_vendor.index.showToast({
            title: "推送设置已保存",
            icon: "success"
          });
        }
      }).catch((err) => {
        if (!silent) {
          common_vendor.index.showToast({
            title: (err == null ? void 0 : err.message) || "保存失败",
            icon: "none"
          });
        }
        throw err;
      }).finally(() => {
        saving.value = false;
      });
    };
    const onPushEnableChange = (value) => {
      var _a;
      if (updatingSwitch.value)
        return;
      const nextEnabled = typeof value === "object" ? !!((value == null ? void 0 : value.value) ?? ((_a = value == null ? void 0 : value.detail) == null ? void 0 : _a.value)) : !!value;
      if (!nextEnabled) {
        authStatus.value = "UNKNOWN";
        persistSetting({ enabled: false, auth: authStatus.value, silent: true }).catch(() => {
        });
        return;
      }
      const tmplId = `${subscribeTemplateId.value || ""}`.trim();
      if (!tmplId) {
        updatingSwitch.value = true;
        pushEnabled.value = false;
        updatingSwitch.value = false;
        common_vendor.index.showToast({
          title: "订阅模板未配置",
          icon: "none"
        });
        return;
      }
      common_vendor.index.requestSubscribeMessage({
        tmplIds: [tmplId],
        success: (res) => {
          const status = `${(res == null ? void 0 : res[tmplId]) || ""}`.trim().toLowerCase();
          if (status === "accept") {
            authStatus.value = "ACCEPT";
            persistSetting({ enabled: true, auth: "ACCEPT", silent: true }).then(() => {
              common_vendor.index.showToast({
                title: "订阅已开启",
                icon: "success"
              });
            }).catch(() => {
              updatingSwitch.value = true;
              pushEnabled.value = false;
              updatingSwitch.value = false;
            });
            return;
          }
          authStatus.value = status === "ban" ? "BAN" : "REJECT";
          updatingSwitch.value = true;
          pushEnabled.value = false;
          updatingSwitch.value = false;
          persistSetting({ enabled: false, auth: authStatus.value, silent: true }).catch(() => {
          });
          common_vendor.index.showToast({
            title: "未授权订阅，无法开启",
            icon: "none"
          });
        },
        fail: () => {
          authStatus.value = "REJECT";
          updatingSwitch.value = true;
          pushEnabled.value = false;
          updatingSwitch.value = false;
          persistSetting({ enabled: false, auth: authStatus.value, silent: true }).catch(() => {
          });
          common_vendor.index.showToast({
            title: "订阅授权失败",
            icon: "none"
          });
        }
      });
      return;
    };
    const savePushSetting = () => {
      persistSetting({
        enabled: pushEnabled.value,
        auth: authStatus.value
      }).catch(() => {
      });
    };
    common_vendor.onShow(() => {
      loadPushSetting();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onPushEnableChange),
        b: common_vendor.o(($event) => pushEnabled.value = $event),
        c: common_vendor.p({
          size: "20",
          activeColor: "#33c26d",
          modelValue: pushEnabled.value
        }),
        d: common_vendor.t(pushTime.value),
        e: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#7bc59a"
        }),
        f: !pushEnabled.value ? 1 : "",
        g: common_vendor.o(openTimePicker),
        h: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        i: common_vendor.o(savePushSetting),
        j: common_vendor.p({
          type: "primary",
          text: "保存设置",
          color: "#33c26d",
          shape: "circle",
          customStyle: "margin-top: 24rpx;"
        }),
        k: common_vendor.o(onTimeConfirm),
        l: common_vendor.o(($event) => showTimePicker.value = false),
        m: common_vendor.o(($event) => showTimePicker.value = false),
        n: common_vendor.p({
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
