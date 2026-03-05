"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_form_item2 = common_vendor.resolveComponent("up-form-item");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_subsection2 = common_vendor.resolveComponent("up-subsection");
  const _easycom_up_textarea2 = common_vendor.resolveComponent("up-textarea");
  const _easycom_up_form2 = common_vendor.resolveComponent("up-form");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_up_datetime_picker2 = common_vendor.resolveComponent("up-datetime-picker");
  (_easycom_up_icon2 + _easycom_up_form_item2 + _easycom_up_input2 + _easycom_up_subsection2 + _easycom_up_textarea2 + _easycom_up_form2 + _easycom_up_button2 + _easycom_up_datetime_picker2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_subsection = () => "../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
const _easycom_up_textarea = () => "../../uni_modules/uview-plus/components/u-textarea/u-textarea.js";
const _easycom_up_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_datetime_picker = () => "../../uni_modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_form_item + _easycom_up_input + _easycom_up_subsection + _easycom_up_textarea + _easycom_up_form + _easycom_up_button + _easycom_up_datetime_picker)();
}
const defaultAvatar = "https://cdn.uviewui.com/uview/example/button.png";
const _sfc_main = {
  __name: "profile",
  setup(__props) {
    const genderOptions = ["男", "女", "保密"];
    const genderValues = ["male", "female", "unknown"];
    const form = common_vendor.reactive({
      avatar: defaultAvatar,
      name: "",
      gender: "male",
      birthday: "",
      motto: "每一份生命都值得尊重和呵护!"
    });
    const genderIndex = common_vendor.ref(0);
    const showDatePicker = common_vendor.ref(false);
    const datePickerValue = common_vendor.ref(Date.now());
    const loadProfile = () => {
      api_index.getUserProfile().then((savedProfile) => {
        form.avatar = (savedProfile == null ? void 0 : savedProfile.avatar) || defaultAvatar;
        form.name = (savedProfile == null ? void 0 : savedProfile.name) || "";
        form.gender = (savedProfile == null ? void 0 : savedProfile.gender) || "male";
        form.birthday = (savedProfile == null ? void 0 : savedProfile.birthday) || "";
        form.motto = (savedProfile == null ? void 0 : savedProfile.motto) || form.motto;
        const index = genderValues.findIndex((item) => item === form.gender);
        genderIndex.value = index > -1 ? index : 0;
      }).catch(() => {
      });
    };
    loadProfile();
    const chooseAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["camera", "album"],
        success: (res) => {
          var _a;
          form.avatar = ((_a = res.tempFilePaths) == null ? void 0 : _a[0]) || form.avatar;
        }
      });
    };
    const onGenderChange = (index) => {
      genderIndex.value = index;
      form.gender = genderValues[index] || "unknown";
    };
    const openDatePicker = () => {
      showDatePicker.value = true;
    };
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, "0");
      const day = `${date.getDate()}`.padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const onDateConfirm = (payload) => {
      const ts = (payload == null ? void 0 : payload.value) || Date.now();
      datePickerValue.value = ts;
      form.birthday = formatDate(ts);
      showDatePicker.value = false;
    };
    const saveProfile = () => {
      if (!form.name.trim()) {
        common_vendor.index.showToast({
          title: "请输入昵称",
          icon: "none"
        });
        return;
      }
      api_index.updateUserProfile({
        avatar: form.avatar || defaultAvatar,
        name: form.name.trim(),
        gender: form.gender,
        birthday: form.birthday,
        motto: form.motto.trim() || "每一份生命都值得尊重和呵护!"
      }).then(() => {
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 400);
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "保存失败",
          icon: "none"
        });
      });
    };
    return (_ctx, _cache) => {
      return {
        a: form.avatar,
        b: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#7bc59a"
        }),
        c: common_vendor.o(chooseAvatar),
        d: common_vendor.p({
          label: "头像",
          borderBottom: true
        }),
        e: common_vendor.o(($event) => form.name = $event),
        f: common_vendor.p({
          placeholder: "请输入昵称",
          border: "none",
          clearable: true,
          maxlength: "16",
          modelValue: form.name
        }),
        g: common_vendor.p({
          label: "昵称",
          borderBottom: true
        }),
        h: common_vendor.o(onGenderChange),
        i: common_vendor.p({
          list: genderOptions,
          current: genderIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eaf9f0"
        }),
        j: common_vendor.p({
          label: "性别",
          borderBottom: true
        }),
        k: common_vendor.t(form.birthday || "请选择生日"),
        l: common_vendor.n(form.birthday ? "date-text" : "date-placeholder"),
        m: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#7bc59a"
        }),
        n: common_vendor.o(openDatePicker),
        o: common_vendor.p({
          label: "生日",
          borderBottom: true
        }),
        p: common_vendor.o(($event) => form.motto = $event),
        q: common_vendor.p({
          placeholder: "写点和绿植有关的小心情吧",
          border: "surround",
          height: "100",
          maxlength: "60",
          count: true,
          modelValue: form.motto
        }),
        r: common_vendor.p({
          label: "签名",
          borderBottom: true
        }),
        s: common_vendor.p({
          model: form,
          labelPosition: "left",
          labelWidth: "140rpx"
        }),
        t: common_vendor.o(saveProfile),
        v: common_vendor.p({
          type: "primary",
          text: "保存信息",
          color: "#33c26d",
          shape: "circle"
        }),
        w: common_vendor.o(onDateConfirm),
        x: common_vendor.o(($event) => showDatePicker.value = false),
        y: common_vendor.o(($event) => showDatePicker.value = false),
        z: common_vendor.p({
          show: showDatePicker.value,
          value: datePickerValue.value,
          mode: "date"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83b067b5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mime/profile.js.map
