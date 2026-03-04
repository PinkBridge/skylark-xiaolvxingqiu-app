"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 操作菜单是否展示 （默认false）
    show: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.actionSheet.show
    },
    // 标题
    title: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.actionSheet.title
    },
    // 选项上方的描述信息
    description: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.actionSheet.description
    },
    // 数据
    actions: {
      type: Array,
      default: () => uni_modules_uviewPlus_libs_config_props.props.actionSheet.actions
    },
    // 选项名称key
    nameKey: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.actionSheet.nameKey
    },
    // 选项子名称key
    subnameKey: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.actionSheet.subnameKey
    },
    // 取消按钮的文字，不为空时显示按钮
    cancelText: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.actionSheet.cancelText
    },
    // 点击某个菜单项时是否关闭弹窗
    closeOnClickAction: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.actionSheet.closeOnClickAction
    },
    // 处理底部安全区（默认true）
    safeAreaInsetBottom: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.actionSheet.safeAreaInsetBottom
    },
    // 小程序的打开方式
    openType: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.actionSheet.openType
    },
    // 点击遮罩是否允许关闭 (默认true)
    closeOnClickOverlay: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.actionSheet.closeOnClickOverlay
    },
    // 圆角值
    round: {
      type: [Boolean, String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.actionSheet.round
    },
    // 选项区域最大高度
    wrapMaxHeight: {
      type: [String],
      default: () => uni_modules_uviewPlus_libs_config_props.props.actionSheet.wrapMaxHeight
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-action-sheet/props.js.map
