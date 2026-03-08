"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_up_textarea2 = common_vendor.resolveComponent("up-textarea");
  const _easycom_up_form_item2 = common_vendor.resolveComponent("up-form-item");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_form2 = common_vendor.resolveComponent("up-form");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  (_easycom_up_textarea2 + _easycom_up_form_item2 + _easycom_up_input2 + _easycom_up_form2 + _easycom_up_button2)();
}
const _easycom_up_textarea = () => "../../uni_modules/uview-plus/components/u-textarea/u-textarea.js";
const _easycom_up_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_up_textarea + _easycom_up_form_item + _easycom_up_input + _easycom_up_form + _easycom_up_button)();
}
const _sfc_main = {
  __name: "feedback",
  setup(__props) {
    const form = common_vendor.reactive({
      content: "",
      contact: ""
    });
    const submitFeedback = () => {
      if (!form.content.trim()) {
        common_vendor.index.showToast({
          title: "请先填写反馈内容",
          icon: "none"
        });
        return;
      }
      api_index.submitFeedbackApi({
        content: form.content.trim(),
        contact: form.contact.trim()
      }).then(() => {
        common_vendor.index.showToast({
          title: "提交成功",
          icon: "success"
        });
        common_vendor.index.showModal({
          title: "感谢反馈",
          content: "感谢反馈，我们会持续优化。",
          showCancel: false
        });
        form.content = "";
        form.contact = "";
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "提交失败",
          icon: "none"
        });
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => form.content = $event),
        b: common_vendor.p({
          placeholder: "欢迎告诉我们你的建议或遇到的问题",
          border: "surround",
          height: "120",
          maxlength: "300",
          count: true,
          modelValue: form.content
        }),
        c: common_vendor.p({
          label: "反馈内容"
        }),
        d: common_vendor.o(($event) => form.contact = $event),
        e: common_vendor.p({
          placeholder: "选填：手机号或邮箱",
          border: "surround",
          clearable: true,
          modelValue: form.contact
        }),
        f: common_vendor.p({
          label: "联系方式"
        }),
        g: common_vendor.p({
          model: form,
          labelPosition: "top",
          labelWidth: "220rpx"
        }),
        h: common_vendor.o(submitFeedback),
        i: common_vendor.p({
          type: "primary",
          text: "提交反馈",
          color: "#33c26d",
          shape: "circle"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-620adbfd"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mime/feedback.js.map
