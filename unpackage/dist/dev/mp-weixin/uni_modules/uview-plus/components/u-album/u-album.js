"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_components_uAlbum_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const uni_modules_uviewPlus_libs_function_test = require("../../libs/function/test.js");
const _sfc_main = {
  name: "u-album",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uAlbum_props.props],
  data() {
    return {
      // 单图的宽度
      singleWidth: 0,
      // 单图的高度
      singleHeight: 0,
      // 单图时，如果无法获取图片的尺寸信息，让图片宽度默认为容器的一定百分比
      singlePercent: 0.6
    };
  },
  watch: {
    urls: {
      immediate: true,
      handler(newVal) {
        if (newVal.length === 1) {
          this.getImageRect();
        }
      }
    }
  },
  computed: {
    /**
     * 计算图片样式
     * @param {Number} index1 - 行索引
     * @param {Number} index2 - 列索引
     * @returns {Object} 图片样式对象
     */
    imageStyle() {
      return (index1, index2) => {
        const { space, rowCount, multipleSize, urls } = this, rowLen = this.showUrls.length;
        this.urls.length;
        const style = {
          marginRight: uni_modules_uviewPlus_libs_function_index.addUnit(space),
          marginBottom: uni_modules_uviewPlus_libs_function_index.addUnit(space)
        };
        if (index1 === rowLen && !this.autoWrap)
          style.marginBottom = 0;
        if (!this.autoWrap) {
          if (index2 === rowCount || index1 === rowLen && index2 === this.showUrls[index1 - 1].length)
            style.marginRight = 0;
        }
        return style;
      };
    },
    /**
     * 将图片地址数组划分为二维数组，用于按行显示
     * @returns {Array} 二维数组，每个子数组代表一行图片
     */
    showUrls() {
      if (this.autoWrap) {
        return [this.urls.slice(0, this.maxCount)];
      } else {
        const arr = [];
        this.urls.map((item, index) => {
          if (index + 1 <= this.maxCount) {
            const itemIndex = Math.floor(index / this.rowCount);
            if (!arr[itemIndex]) {
              arr[itemIndex] = [];
            }
            arr[itemIndex].push(item);
          }
        });
        return arr;
      }
    },
    /**
     * 计算图片宽度
     * @returns {String} 图片宽度样式值
     */
    imageWidth() {
      return uni_modules_uviewPlus_libs_function_index.addUnit(
        this.urls.length === 1 ? this.singleWidth : this.multipleSize,
        this.unit
      );
    },
    /**
     * 计算图片高度
     * @returns {String} 图片高度样式值
     */
    imageHeight() {
      return uni_modules_uviewPlus_libs_function_index.addUnit(
        this.urls.length === 1 ? this.singleHeight : this.multipleSize,
        this.unit
      );
    },
    /**
     * 计算相册总宽度，用于外部组件对齐
     * 此变量无实际用途，仅仅是为了利用computed特性，让其在urls长度等变化时，重新计算图片的宽度
     * @returns {Number} 相册宽度
     */
    albumWidth() {
      let width = 0;
      if (this.urls.length === 1) {
        width = this.singleWidth;
      } else {
        width = this.showUrls[0].length * this.multipleSize + this.space * (this.showUrls[0].length - 1);
      }
      this.$emit("albumWidth", width);
      return width;
    }
  },
  emits: ["preview", "albumWidth"],
  methods: {
    addUnit: uni_modules_uviewPlus_libs_function_index.addUnit,
    /**
     * 点击图片预览
     * @param {Event} e - 点击事件对象
     * @param {String} url - 当前点击图片的地址
     */
    onPreviewTap(e, url) {
      const urls = this.urls.map((item) => {
        return this.getSrc(item);
      });
      if (this.previewFullImage) {
        common_vendor.index.previewImage({
          current: url,
          urls
        });
        this.stop && this.preventEvent(e);
      } else {
        this.$emit("preview", {
          urls,
          currentIndex: urls.indexOf(url)
        });
      }
    },
    /**
     * 获取图片地址
     * @param {String|Object} item - 图片项，可以是字符串或对象
     * @returns {String} 图片地址
     */
    getSrc(item) {
      return uni_modules_uviewPlus_libs_function_test.test.object(item) ? this.keyName && item[this.keyName] || item.src : item;
    },
    /**
     * 单图时，获取图片的尺寸
     * 在小程序中，需要将网络图片的的域名添加到小程序的download域名才可能获取尺寸
     * 在没有添加的情况下，让单图宽度默认为盒子的一定宽度(singlePercent)
     */
    getImageRect() {
      const src = this.getSrc(this.urls[0]);
      common_vendor.index.getImageInfo({
        src,
        success: (res) => {
          let singleSize = this.singleSize;
          let unit = "";
          if (Number.isNaN(Number(this.singleSize))) {
            unit = this.singleSize.replace(/\d+/g, "");
            singleSize = Number(this.singleSize.replace(/\D+/g, ""), 10);
          }
          const isHorizotal = res.width >= res.height;
          this.singleWidth = isHorizotal ? singleSize : res.width / res.height * singleSize;
          this.singleHeight = !isHorizotal ? singleSize : res.height / res.width * this.singleWidth;
          if (unit != null && unit !== "") {
            this.singleWidth = this.singleWidth + unit;
            this.singleHeight = this.singleHeight + unit;
          }
        },
        fail: () => {
          this.getComponentWidth();
        }
      });
    },
    /**
     * 获取组件的宽度，用于计算单图显示尺寸
     */
    async getComponentWidth() {
      await uni_modules_uviewPlus_libs_function_index.sleep(30);
      this.$uGetRect(".u-album__row").then((size) => {
        this.singleWidth = size.width * this.singlePercent;
      });
    }
  }
};
if (!Array) {
  const _easycom_up_text2 = common_vendor.resolveComponent("up-text");
  _easycom_up_text2();
}
const _easycom_up_text = () => "../u-text/u-text.js";
if (!Math) {
  _easycom_up_text();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.showUrls, (arr, index, i0) => {
      return {
        a: common_vendor.f(arr, (item, index1, i1) => {
          return common_vendor.e({
            a: $options.getSrc(item),
            b: _ctx.showMore && _ctx.urls.length > _ctx.rowCount * $options.showUrls.length && index === $options.showUrls.length - 1 && index1 === $options.showUrls[$options.showUrls.length - 1].length - 1
          }, _ctx.showMore && _ctx.urls.length > _ctx.rowCount * $options.showUrls.length && index === $options.showUrls.length - 1 && index1 === $options.showUrls[$options.showUrls.length - 1].length - 1 ? {
            c: "96d28356-0-" + i0 + "-" + i1,
            d: common_vendor.p({
              text: `+${_ctx.urls.length - _ctx.maxCount}`,
              color: "#fff",
              size: _ctx.multipleSize * 0.3,
              align: "center",
              customStyle: "justify-content: center"
            }),
            e: _ctx.shape == "circle" ? "50%" : $options.addUnit(_ctx.radius)
          } : {}, {
            f: index1,
            g: common_vendor.s($options.imageStyle(index + 1, index1 + 1)),
            h: common_vendor.o(($event) => $options.onPreviewTap($event, $options.getSrc(item)), index1)
          });
        }),
        b: index
      };
    }),
    b: _ctx.urls.length === 1 ? $options.imageHeight > 0 ? _ctx.singleMode : "widthFix" : _ctx.multipleMode,
    c: common_vendor.s({
      width: $options.imageWidth,
      height: $options.imageHeight,
      borderRadius: _ctx.shape == "circle" ? "10000px" : $options.addUnit(_ctx.radius)
    }),
    d: $options.albumWidth,
    e: _ctx.autoWrap ? "wrap" : "nowrap"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-96d28356"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-album/u-album.js.map
