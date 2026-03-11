"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const _sfc_main = {
  __name: "favorites",
  setup(__props) {
    const favorites = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const actionId = common_vendor.ref("");
    const pickImage = (item) => `${(item == null ? void 0 : item.imageUrl) || (item == null ? void 0 : item.recognizedImageUrl) || "/static/flower/857f855fcea81e07d1c315589d5d5a30.jpg"}`;
    const loadFavorites = () => {
      loading.value = true;
      api_index.listAiCollections().then((rows) => {
        favorites.value = rows || [];
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加载收藏失败",
          icon: "none"
        });
        favorites.value = [];
      }).finally(() => {
        loading.value = false;
      });
    };
    const onDelete = (item) => {
      const id = `${(item == null ? void 0 : item.id) || ""}`.trim();
      if (!id)
        return;
      common_vendor.index.showModal({
        title: "提示",
        content: "确认删除这条收藏吗？",
        success: (res) => {
          if (!res.confirm)
            return;
          actionId.value = id;
          api_index.deleteAiCollection(id).then(() => {
            common_vendor.index.showToast({
              title: "已删除",
              icon: "none"
            });
            favorites.value = favorites.value.filter((row) => `${(row == null ? void 0 : row.id) || ""}` !== id);
          }).catch((err) => {
            common_vendor.index.showToast({
              title: (err == null ? void 0 : err.message) || "删除失败",
              icon: "none"
            });
          }).finally(() => {
            actionId.value = "";
          });
        }
      });
    };
    const onAddToGarden = (item) => {
      const id = `${(item == null ? void 0 : item.id) || ""}`.trim();
      if (!id || actionId.value === id)
        return;
      actionId.value = id;
      api_index.addAiCollectionToGarden(id).then(() => {
        common_vendor.index.showToast({
          title: "已加入花园",
          icon: "none"
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加入花园失败",
          icon: "none"
        });
      }).finally(() => {
        actionId.value = "";
      });
    };
    common_vendor.onShow(() => {
      loadFavorites();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {} : !favorites.value.length ? {} : {
        c: common_vendor.f(favorites.value, (item, k0, i0) => {
          return {
            a: pickImage(item),
            b: common_vendor.t(item.name || "未知植物"),
            c: common_vendor.t(item.description || "暂无描述"),
            d: common_vendor.t(item.createdAt || "-"),
            e: common_vendor.o(($event) => onDelete(item), item.id),
            f: common_vendor.o(($event) => onAddToGarden(item), item.id),
            g: item.id
          };
        })
      }, {
        b: !favorites.value.length
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0fea3ff1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mime/favorites.js.map
