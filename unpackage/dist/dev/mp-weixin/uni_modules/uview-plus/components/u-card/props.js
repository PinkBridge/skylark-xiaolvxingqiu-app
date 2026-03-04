"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const propsCard = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 与屏幕两侧是否留空隙
    full: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.full
    },
    // 标题
    title: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.title
    },
    // 标题颜色
    titleColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.titleColor
    },
    // 标题字体大小
    titleSize: {
      type: [Number, String],
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.titleSize
    },
    // 副标题
    subTitle: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.subTitle
    },
    // 副标题颜色
    subTitleColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.subTitleColor
    },
    // 副标题字体大小
    subTitleSize: {
      type: [Number, String],
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.subTitleSize
    },
    // 是否显示外部边框，只对full=false时有效(卡片与边框有空隙时)
    border: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.border
    },
    // 用于标识点击了第几个
    index: {
      type: [Number, String, Object],
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.index
    },
    // 用于隔开上下左右的边距，带单位的写法，如："30px 30px"，"20px 20px 30px 30px"
    margin: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.margin
    },
    // card卡片的圆角
    borderRadius: {
      type: [Number, String],
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.borderRadius
    },
    // 头部自定义样式，对象形式
    headStyle: {
      type: Object,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.headStyle
    },
    // 主体自定义样式，对象形式
    bodyStyle: {
      type: Object,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.bodyStyle
    },
    // 底部自定义样式，对象形式
    footStyle: {
      type: Object,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.footStyle
    },
    // 头部是否下边框
    headBorderBottom: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.headBorderBottom
    },
    // 底部是否有上边框
    footBorderTop: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.footBorderTop
    },
    // 标题左边的缩略图
    thumb: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.thumb
    },
    // 缩略图宽高
    thumbWidth: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.thumbWidth
    },
    // 缩略图是否为圆形
    thumbCircle: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.thumbCircle
    },
    // 给head，body，foot的内边距
    padding: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.padding
    },
    paddingHead: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.paddingHead
    },
    paddingBody: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.paddingBody
    },
    paddingFoot: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.paddingFoot
    },
    // 是否显示头部
    showHead: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.showHead
    },
    // 是否显示尾部
    showFoot: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.showFoot
    },
    // 卡片外围阴影，字符串形式
    boxShadow: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.card.boxShadow
    }
  }
});
exports.propsCard = propsCard;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-card/props.js.map
