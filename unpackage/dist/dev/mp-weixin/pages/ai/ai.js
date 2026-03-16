"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const AI_RESULT_STORAGE_KEY = "aiRecognizeResult";
const officialIconUrl = "/static/icon/flower-selected.png";
const officialAccountOriginalId = "gh_3341cd93a42e";
const _sfc_main = {
  __name: "ai",
  setup(__props) {
    const plantName = common_vendor.ref("未知植物");
    const description = common_vendor.ref("暂无植物描述，建议更换更清晰的植物照片重新识别。");
    const score = common_vendor.ref(0);
    const imageUrl = common_vendor.ref("");
    const recognizedImageUrl = common_vendor.ref("");
    const showOfficialAccountCard = common_vendor.ref(false);
    const collecting = common_vendor.ref(false);
    const addingGarden = common_vendor.ref(false);
    const images = common_vendor.ref([
      "https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
    ]);
    const loadResult = () => {
      const raw = common_vendor.index.getStorageSync(AI_RESULT_STORAGE_KEY);
      const data = raw && typeof raw === "object" ? raw : {};
      plantName.value = `${(data == null ? void 0 : data.name) || "未知植物"}`.trim() || "未知植物";
      description.value = `${(data == null ? void 0 : data.description) || ""}`.trim() || "暂无植物描述，建议更换更清晰的植物照片重新识别。";
      score.value = Number((data == null ? void 0 : data.score) || 0);
      imageUrl.value = `${(data == null ? void 0 : data.imageUrl) || ""}`.trim();
      recognizedImageUrl.value = `${(data == null ? void 0 : data.recognizedImageUrl) || ""}`.trim();
      const cacheImages = Array.isArray(data == null ? void 0 : data.images) ? data.images : [];
      const imgList = [...cacheImages, imageUrl.value, recognizedImageUrl.value].map((item) => `${item || ""}`.trim()).filter((item, index, arr) => item && arr.indexOf(item) === index);
      if (imgList.length) {
        images.value = imgList;
      }
    };
    const buildPayload = () => ({
      name: plantName.value,
      description: description.value,
      score: score.value,
      imageUrl: imageUrl.value,
      recognizedImageUrl: recognizedImageUrl.value,
      source: "baidu_ai"
    });
    const ensureAiImagesUploaded = async () => {
      if (recognizedImageUrl.value) {
        recognizedImageUrl.value = await api_index.uploadImageResource({
          filePath: recognizedImageUrl.value,
          fileName: "recognized.jpg"
        });
      }
      if (imageUrl.value) {
        imageUrl.value = await api_index.uploadImageResource({
          filePath: imageUrl.value,
          fileName: "baidu.jpg"
        });
      }
      const imgList = [recognizedImageUrl.value, imageUrl.value].map((item) => `${item || ""}`.trim()).filter((item, index, arr) => item && arr.indexOf(item) === index);
      if (imgList.length) {
        images.value = imgList;
      }
    };
    const gotoAddPlantPage = (gardenId) => {
      const payload = encodeURIComponent(JSON.stringify(buildPayload()));
      const selectedGardenId = `${gardenId || ""}`.trim();
      const query = selectedGardenId ? `?gardenId=${encodeURIComponent(selectedGardenId)}&prefill=${payload}` : `?prefill=${payload}`;
      common_vendor.index.navigateTo({
        url: `/pages/plant/add${query}`,
        fail: (err) => {
          common_vendor.index.showToast({
            title: (err == null ? void 0 : err.errMsg) || "打开添加绿植页失败",
            icon: "none"
          });
        }
      });
    };
    const gotoCreateGardenPage = () => {
      const payload = encodeURIComponent(JSON.stringify(buildPayload()));
      common_vendor.index.navigateTo({
        url: `/pages/index/garden-create?fromAi=1&prefill=${payload}`,
        fail: (err) => {
          common_vendor.index.showToast({
            title: (err == null ? void 0 : err.errMsg) || "打开创建花园页失败",
            icon: "none"
          });
        }
      });
    };
    common_vendor.onLoad(() => {
      loadResult();
    });
    common_vendor.onShow(() => {
      loadResult();
    });
    const onRecognizedImageUpdated = (uploadedUrl) => {
      const url = `${uploadedUrl || ""}`.trim();
      if (!url)
        return;
      recognizedImageUrl.value = url;
      const merged = [recognizedImageUrl.value, imageUrl.value].map((item) => `${item || ""}`.trim()).filter((item, index, arr) => item && arr.indexOf(item) === index);
      if (merged.length) {
        images.value = merged;
      }
    };
    common_vendor.index.$on("ai:recognized-image-updated", onRecognizedImageUpdated);
    common_vendor.onUnload(() => {
      common_vendor.index.$off("ai:recognized-image-updated", onRecognizedImageUpdated);
    });
    const onCollect = () => {
      if (collecting.value)
        return;
      collecting.value = true;
      Promise.resolve().then(() => ensureAiImagesUploaded()).then(() => api_index.createAiCollection(buildPayload())).then(() => {
        common_vendor.index.showToast({
          title: "已加入收藏",
          icon: "none"
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加入收藏失败",
          icon: "none"
        });
      }).finally(() => {
        collecting.value = false;
      });
    };
    const onAddGarden = () => {
      if (addingGarden.value)
        return;
      addingGarden.value = true;
      Promise.resolve().then(() => ensureAiImagesUploaded()).then(() => api_index.listGardens()).then((rows) => {
        const gardens = rows || [];
        if (!gardens.length) {
          common_vendor.index.showModal({
            title: "暂无花园",
            content: "你还没有花园，是否去创建花园？",
            success: (modalRes) => {
              if (modalRes.confirm) {
                gotoCreateGardenPage();
              }
            }
          });
          return;
        }
        const itemList = gardens.map((item) => `${(item == null ? void 0 : item.name) || "未命名花园"}${(item == null ? void 0 : item.isDefault) ? "（默认）" : ""}`);
        common_vendor.index.showActionSheet({
          itemList,
          success: (sheetRes) => {
            const selected = gardens[sheetRes.tapIndex];
            const gardenId = `${(selected == null ? void 0 : selected.id) || ""}`.trim();
            if (!gardenId) {
              common_vendor.index.showToast({
                title: "花园信息无效",
                icon: "none"
              });
              return;
            }
            gotoAddPlantPage(gardenId);
          }
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加入花园失败",
          icon: "none"
        });
      }).finally(() => {
        addingGarden.value = false;
      });
    };
    const onOpenOfficialAccount = () => {
      const revealOfficialCard = () => {
        showOfficialAccountCard.value = true;
        common_vendor.index.showToast({
          title: "请在下方卡片中点击关注",
          icon: "none"
        });
      };
      if (typeof common_vendor.wx$1 !== "undefined" && typeof common_vendor.wx$1.openOfficialAccountProfile === "function" && /^gh_[0-9a-zA-Z]+$/.test(officialAccountOriginalId)) {
        common_vendor.wx$1.openOfficialAccountProfile({
          username: officialAccountOriginalId,
          fail: () => {
            revealOfficialCard();
          }
        });
        return;
      }
      revealOfficialCard();
      return;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(plantName.value),
        b: common_vendor.f(images.value, (img, idx, i0) => {
          return {
            a: img,
            b: idx
          };
        }),
        c: officialIconUrl,
        d: common_vendor.o(onOpenOfficialAccount),
        e: showOfficialAccountCard.value
      }, showOfficialAccountCard.value ? {} : {}, {
        f: common_vendor.t(description.value),
        g: common_vendor.o(onCollect),
        h: common_vendor.o(onAddGarden)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fdb58938"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/ai/ai.js.map
