"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_form_item2 = common_vendor.resolveComponent("up-form-item");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_textarea2 = common_vendor.resolveComponent("up-textarea");
  const _easycom_up_form2 = common_vendor.resolveComponent("up-form");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_up_action_sheet2 = common_vendor.resolveComponent("up-action-sheet");
  const _easycom_up_datetime_picker2 = common_vendor.resolveComponent("up-datetime-picker");
  (_easycom_up_icon2 + _easycom_up_form_item2 + _easycom_up_input2 + _easycom_up_textarea2 + _easycom_up_form2 + _easycom_up_button2 + _easycom_up_action_sheet2 + _easycom_up_datetime_picker2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_textarea = () => "../../uni_modules/uview-plus/components/u-textarea/u-textarea.js";
const _easycom_up_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_action_sheet = () => "../../uni_modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
const _easycom_up_datetime_picker = () => "../../uni_modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_form_item + _easycom_up_input + _easycom_up_textarea + _easycom_up_form + _easycom_up_button + _easycom_up_action_sheet + _easycom_up_datetime_picker)();
}
const _sfc_main = {
  __name: "garden-create",
  setup(__props) {
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, "0");
      const day = `${date.getDate()}`.padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const getTodayStartTimestamp = () => {
      const now = /* @__PURE__ */ new Date();
      now.setHours(0, 0, 0, 0);
      return now.getTime();
    };
    const todayTimestamp = getTodayStartTimestamp();
    const form = common_vendor.reactive({
      title: "",
      subTitle: formatDate(todayTimestamp),
      thumb: "",
      image: "",
      description: ""
    });
    const imageTargetField = common_vendor.ref("thumb");
    const showImageSourceSheet = common_vendor.ref(false);
    const imageSourceActions = [
      { name: "拍照", sourceType: ["camera"] },
      { name: "从相册选择", sourceType: ["album"] }
    ];
    const showDatePicker = common_vendor.ref(false);
    const datePickerValue = common_vendor.ref(todayTimestamp);
    const datePickerKey = common_vendor.ref(0);
    const openImageSourceSheet = (field) => {
      imageTargetField.value = field;
      showImageSourceSheet.value = true;
    };
    const onImageSourceSelect = (action) => {
      showImageSourceSheet.value = false;
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: action.sourceType,
        success: (res) => {
          var _a;
          const imageUrl = ((_a = res.tempFilePaths) == null ? void 0 : _a[0]) || "";
          if (!imageUrl)
            return;
          form[imageTargetField.value] = imageUrl;
        }
      });
    };
    const openDatePicker = () => {
      datePickerValue.value = getTodayStartTimestamp();
      datePickerKey.value += 1;
      showDatePicker.value = true;
    };
    const onDateConfirm = (payload) => {
      const ts = (payload == null ? void 0 : payload.value) || Date.now();
      datePickerValue.value = ts;
      form.subTitle = formatDate(ts);
      showDatePicker.value = false;
    };
    const saveGardenInfo = () => {
      if (!form.title.trim()) {
        common_vendor.index.showToast({
          title: "请输入花园名称",
          icon: "none"
        });
        return;
      }
      if (!form.subTitle) {
        common_vendor.index.showToast({
          title: "请选择花园建立时间",
          icon: "none"
        });
        return;
      }
      api_index.createGarden({
        name: form.title.trim(),
        establishedDate: form.subTitle,
        thumbUrl: form.thumb,
        coverUrl: form.image,
        description: form.description.trim()
      }).then(() => {
        common_vendor.index.showToast({
          title: "创建成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 400);
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "创建失败",
          icon: "none"
        });
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: form.thumb
      }, form.thumb ? {
        b: form.thumb
      } : {
        c: common_vendor.p({
          name: "camera-fill",
          size: "24",
          color: "#33c26d"
        })
      }, {
        d: common_vendor.o(($event) => openImageSourceSheet("thumb")),
        e: common_vendor.p({
          label: "花园缩略图"
        }),
        f: form.image
      }, form.image ? {
        g: form.image
      } : {
        h: common_vendor.p({
          name: "camera-fill",
          size: "24",
          color: "#33c26d"
        })
      }, {
        i: common_vendor.o(($event) => openImageSourceSheet("image")),
        j: common_vendor.p({
          label: "花园封面"
        }),
        k: common_vendor.o(($event) => form.title = $event),
        l: common_vendor.p({
          placeholder: "请输入花园名称",
          border: "surround",
          clearable: true,
          maxlength: "20",
          modelValue: form.title
        }),
        m: common_vendor.p({
          label: "花园名称"
        }),
        n: common_vendor.t(form.subTitle || "请选择建立时间"),
        o: common_vendor.n(form.subTitle ? "date-text" : "date-placeholder"),
        p: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#7bc59a"
        }),
        q: common_vendor.o(openDatePicker),
        r: common_vendor.p({
          label: "花园建立时间"
        }),
        s: common_vendor.o(($event) => form.description = $event),
        t: common_vendor.p({
          placeholder: "记录花园故事、风格与期待",
          border: "surround",
          height: "120",
          maxlength: "120",
          count: true,
          modelValue: form.description
        }),
        v: common_vendor.p({
          label: "花园描述"
        }),
        w: common_vendor.p({
          model: form,
          labelPosition: "top",
          labelWidth: "220rpx"
        }),
        x: common_vendor.o(saveGardenInfo),
        y: common_vendor.p({
          type: "primary",
          text: "创建花园",
          color: "#33c26d",
          shape: "circle"
        }),
        z: common_vendor.o(onImageSourceSelect),
        A: common_vendor.o(($event) => showImageSourceSheet.value = false),
        B: common_vendor.p({
          show: showImageSourceSheet.value,
          actions: imageSourceActions,
          cancelText: "取消"
        }),
        C: datePickerKey.value,
        D: common_vendor.o(onDateConfirm),
        E: common_vendor.o(($event) => showDatePicker.value = false),
        F: common_vendor.o(($event) => showDatePicker.value = false),
        G: common_vendor.p({
          show: showDatePicker.value,
          value: datePickerValue.value,
          mode: "date"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2417d330"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/garden-create.js.map
