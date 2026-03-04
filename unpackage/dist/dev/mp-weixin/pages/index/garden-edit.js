"use strict";
const common_vendor = require("../../common/vendor.js");
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
const gardenStorageKey = "gardenInfo";
const _sfc_main = {
  __name: "garden-edit",
  setup(__props) {
    const defaultGardenInfo = {
      title: "我的莫奈花园",
      subTitle: "2020-05-15",
      thumb: "https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg",
      image: "https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg",
      description: "釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放"
    };
    const form = common_vendor.reactive({
      ...defaultGardenInfo
    });
    const imageTargetField = common_vendor.ref("thumb");
    const showImageSourceSheet = common_vendor.ref(false);
    const imageSourceActions = [
      { name: "拍照", sourceType: ["camera"] },
      { name: "从相册选择", sourceType: ["album"] }
    ];
    const showDatePicker = common_vendor.ref(false);
    const datePickerValue = common_vendor.ref(Date.now());
    const applyForm = (payload) => {
      form.title = payload.title || "";
      form.subTitle = payload.subTitle || "";
      form.thumb = payload.thumb || "";
      form.image = payload.image || "";
      form.description = payload.description || "";
    };
    const loadGardenInfo = () => {
      const saved = common_vendor.index.getStorageSync(gardenStorageKey);
      if (!saved || typeof saved !== "object") {
        applyForm(defaultGardenInfo);
        return;
      }
      applyForm({
        ...defaultGardenInfo,
        ...saved
      });
    };
    loadGardenInfo();
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
      common_vendor.index.setStorageSync(gardenStorageKey, {
        title: form.title.trim(),
        subTitle: form.subTitle,
        thumb: form.thumb,
        image: form.image,
        description: form.description.trim()
      });
      common_vendor.index.showToast({
        title: "保存成功",
        icon: "success"
      });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 400);
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
          text: "保存花园信息",
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
        C: common_vendor.o(onDateConfirm),
        D: common_vendor.o(($event) => showDatePicker.value = false),
        E: common_vendor.o(($event) => showDatePicker.value = false),
        F: common_vendor.p({
          show: showDatePicker.value,
          value: datePickerValue.value,
          mode: "date"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2ba6fda6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/garden-edit.js.map
