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
  const _easycom_up_action_sheet2 = common_vendor.resolveComponent("up-action-sheet");
  const _easycom_up_datetime_picker2 = common_vendor.resolveComponent("up-datetime-picker");
  (_easycom_up_icon2 + _easycom_up_form_item2 + _easycom_up_input2 + _easycom_up_subsection2 + _easycom_up_textarea2 + _easycom_up_form2 + _easycom_up_button2 + _easycom_up_action_sheet2 + _easycom_up_datetime_picker2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_subsection = () => "../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
const _easycom_up_textarea = () => "../../uni_modules/uview-plus/components/u-textarea/u-textarea.js";
const _easycom_up_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_action_sheet = () => "../../uni_modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
const _easycom_up_datetime_picker = () => "../../uni_modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_form_item + _easycom_up_input + _easycom_up_subsection + _easycom_up_textarea + _easycom_up_form + _easycom_up_button + _easycom_up_action_sheet + _easycom_up_datetime_picker)();
}
const _sfc_main = {
  __name: "add",
  setup(__props) {
    const cultivationOptions = ["土培", "水培"];
    const cultivationIndex = common_vendor.ref(0);
    const editPlantId = common_vendor.ref("");
    const plantForm = common_vendor.reactive({
      image: "",
      name: "",
      species: "",
      cultivationType: "soil",
      plantingDate: "",
      note: ""
    });
    const showImageSourceSheet = common_vendor.ref(false);
    const imageSourceActions = [
      { name: "拍照", sourceType: ["camera"] },
      { name: "从相册选择", sourceType: ["album"] }
    ];
    const showDatePicker = common_vendor.ref(false);
    const datePickerValue = common_vendor.ref(Date.now());
    const resetPlantForm = () => {
      editPlantId.value = "";
      plantForm.image = "";
      plantForm.name = "";
      plantForm.species = "";
      plantForm.cultivationType = "soil";
      plantForm.plantingDate = "";
      plantForm.note = "";
      cultivationIndex.value = 0;
      datePickerValue.value = Date.now();
    };
    const onCultivationChange = (index) => {
      cultivationIndex.value = index;
      plantForm.cultivationType = index === 0 ? "soil" : "water";
    };
    const openImageSourceSheet = () => {
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
          plantForm.image = ((_a = res.tempFilePaths) == null ? void 0 : _a[0]) || "";
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
      plantForm.plantingDate = formatDate(ts);
      showDatePicker.value = false;
    };
    const onSubmitPlant = () => {
      if (!plantForm.image || !plantForm.name || !plantForm.plantingDate) {
        common_vendor.index.showToast({
          title: "请完善必填信息",
          icon: "none"
        });
        return;
      }
      const payload = {
        image: plantForm.image,
        name: plantForm.name,
        species: plantForm.species,
        cultivationType: plantForm.cultivationType,
        plantingDate: plantForm.plantingDate,
        note: plantForm.note
      };
      const req = editPlantId.value ? api_index.updatePlant(editPlantId.value, payload) : api_index.createPlant(payload);
      req.then(() => {
        common_vendor.index.showToast({
          title: "绿植信息已保存",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/plant/plant"
          });
        }, 500);
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "保存失败",
          icon: "none"
        });
      });
    };
    common_vendor.onLoad((query) => {
      resetPlantForm();
      const id = query == null ? void 0 : query.id;
      if (!id)
        return;
      editPlantId.value = id;
      api_index.getPlantById(id).then((data) => {
        plantForm.image = (data == null ? void 0 : data.image) || "";
        plantForm.name = (data == null ? void 0 : data.name) || "";
        plantForm.species = (data == null ? void 0 : data.species) || "";
        plantForm.cultivationType = (data == null ? void 0 : data.cultivationType) || "soil";
        plantForm.plantingDate = (data == null ? void 0 : data.plantingDate) || "";
        plantForm.note = (data == null ? void 0 : data.note) || "";
        cultivationIndex.value = plantForm.cultivationType === "water" ? 1 : 0;
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加载绿植失败",
          icon: "none"
        });
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: plantForm.image
      }, plantForm.image ? {
        b: plantForm.image
      } : {
        c: common_vendor.p({
          name: "camera-fill",
          size: "24",
          color: "#33c26d"
        })
      }, {
        d: common_vendor.o(openImageSourceSheet),
        e: common_vendor.p({
          label: "植物图片"
        }),
        f: common_vendor.o(($event) => plantForm.name = $event),
        g: common_vendor.p({
          placeholder: "请输入植物名称",
          border: "surround",
          clearable: true,
          modelValue: plantForm.name
        }),
        h: common_vendor.p({
          label: "植物名称"
        }),
        i: common_vendor.o(($event) => plantForm.species = $event),
        j: common_vendor.p({
          placeholder: "请输入植物品种",
          border: "surround",
          clearable: true,
          modelValue: plantForm.species
        }),
        k: common_vendor.p({
          label: "植物品种"
        }),
        l: common_vendor.o(onCultivationChange),
        m: common_vendor.p({
          list: cultivationOptions,
          current: cultivationIndex.value,
          mode: "button",
          activeColor: "#33c26d",
          inactiveColor: "#5a6b60",
          bgColor: "#eaf9f0"
        }),
        n: common_vendor.p({
          label: "栽培方式"
        }),
        o: common_vendor.t(plantForm.plantingDate || "请选择种植日期"),
        p: common_vendor.n(plantForm.plantingDate ? "date-text" : "date-placeholder"),
        q: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#7bc59a"
        }),
        r: common_vendor.o(openDatePicker),
        s: common_vendor.p({
          label: "种植日期"
        }),
        t: common_vendor.o(($event) => plantForm.note = $event),
        v: common_vendor.p({
          placeholder: "记录当前状态、环境、养护习惯等",
          border: "surround",
          height: "120",
          maxlength: "200",
          count: true,
          modelValue: plantForm.note
        }),
        w: common_vendor.p({
          label: "备注"
        }),
        x: common_vendor.p({
          model: plantForm,
          labelPosition: "top",
          labelWidth: "220rpx"
        }),
        y: common_vendor.o(onSubmitPlant),
        z: common_vendor.p({
          type: "primary",
          text: "保存绿植",
          color: "#33c26d",
          shape: "circle"
        }),
        A: common_vendor.o(onImageSourceSelect),
        B: common_vendor.o(($event) => showImageSourceSheet.value = false),
        C: common_vendor.p({
          show: showImageSourceSheet.value,
          actions: imageSourceActions,
          cancelText: "取消"
        }),
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2986bdf3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/plant/add.js.map
