"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_auth = require("../../utils/auth.js");
const utils_privacy = require("../../utils/privacy.js");
if (!Array) {
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_card2 = common_vendor.resolveComponent("up-card");
  (_easycom_up_button2 + _easycom_up_popup2 + _easycom_up_icon2 + _easycom_up_card2)();
}
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_card = () => "../../uni_modules/uview-plus/components/u-card/u-card.js";
if (!Math) {
  (_easycom_up_button + _easycom_up_popup + _easycom_up_icon + _easycom_up_card)();
}
const SELECTED_GARDEN_KEY = "selectedGardenId";
const SELECTED_PLANT_FILTER_KEY = "selectedPlantFilter";
const AI_RESULT_STORAGE_KEY = "aiRecognizeResult";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const defaultGardenInfo = {
      title: "我的莫奈花园",
      subTitle: "2020-05-15",
      thumb: "https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg",
      image: "https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg",
      description: "釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放"
    };
    const gardenCards = common_vendor.ref([]);
    const recognizeLoading = common_vendor.ref(false);
    const showPrivacyPopup = common_vendor.ref(false);
    const syncWechatProfileIfNeeded = (nextAction) => {
      proceedWechatAuth(nextAction);
      return;
    };
    const proceedWechatAuth = (nextAction) => {
      const cached = utils_auth.readCachedWxProfile();
      if ((cached == null ? void 0 : cached.name) && (cached == null ? void 0 : cached.avatar)) {
        nextAction();
        return;
      }
      common_vendor.index.getUserProfile({
        desc: "用于更新头像和昵称",
        success: (res) => {
          const userInfo = (res == null ? void 0 : res.userInfo) || {};
          const payload = {
            avatar: userInfo.avatarUrl || "",
            name: userInfo.nickName || "",
            gender: userInfo.gender === 1 ? "male" : userInfo.gender === 2 ? "female" : "unknown"
          };
          api_index.updateUserProfile(payload).then(() => {
            utils_auth.saveWxAuthProfile(payload);
          }).catch(() => {
            utils_auth.saveWxAuthProfile(payload);
          }).finally(() => {
            nextAction();
          });
        },
        fail: () => {
          nextAction();
        }
      });
      return;
    };
    const createFooterStats = (garden) => [
      {
        key: "plant",
        icon: "grid-fill",
        color: "#33c26d",
        label: `绿植 ${(garden == null ? void 0 : garden.plantCount) || 0}`,
        path: "/pages/plant/plant",
        mode: "switchTab",
        gardenId: (garden == null ? void 0 : garden.id) ?? "",
        plantFilter: "all"
      },
      {
        key: "care",
        icon: "heart-fill",
        color: "#33c26d",
        label: `今日养护 ${(garden == null ? void 0 : garden.todayCareCount) || 0}`,
        path: "/pages/care/care",
        mode: "switchTab",
        gardenId: (garden == null ? void 0 : garden.id) ?? "",
        plantFilter: "todo"
      },
      {
        key: "focus",
        icon: "warning-fill",
        color: "#33c26d",
        label: `需关注 ${(garden == null ? void 0 : garden.focusCount) || 0}`,
        path: "/pages/plant/plant",
        mode: "switchTab",
        gardenId: (garden == null ? void 0 : garden.id) ?? "",
        plantFilter: "focus"
      }
    ];
    const onCardClick = (garden) => {
      const gardenId = `${(garden == null ? void 0 : garden.id) ?? ""}`.trim();
      if (gardenId) {
        common_vendor.index.setStorageSync(SELECTED_GARDEN_KEY, gardenId);
      }
      common_vendor.index.setStorageSync(SELECTED_PLANT_FILTER_KEY, "all");
      common_vendor.index.switchTab({
        url: "/pages/plant/plant",
        fail: (err) => {
          common_vendor.index.showToast({
            title: (err == null ? void 0 : err.errMsg) || "跳转失败",
            icon: "none"
          });
        }
      });
    };
    const onEditGardenInfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/garden-edit"
      });
    };
    const onAddGarden = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/garden-create"
      });
    };
    const gotoMinePage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mime/mime",
        fail: () => {
          common_vendor.index.reLaunch({
            url: "/pages/mime/mime"
          });
        }
      });
    };
    const onGoMine = () => {
      if (showPrivacyPopup.value)
        return;
      syncWechatProfileIfNeeded(gotoMinePage);
    };
    const gotoRecognizeResult = ({ filePath, result }) => {
      const imageUrl = `${(result == null ? void 0 : result.imageUrl) || ""}`.trim();
      const images = [filePath, imageUrl].map((item) => `${item || ""}`.trim()).filter((item, index, arr) => item && arr.indexOf(item) === index);
      const payload = {
        name: `${(result == null ? void 0 : result.name) || "未知植物"}`.trim() || "未知植物",
        description: `${(result == null ? void 0 : result.description) || ""}`.trim(),
        score: Number((result == null ? void 0 : result.score) || 0),
        imageUrl,
        recognizedImageUrl: filePath || "",
        images
      };
      common_vendor.index.setStorageSync(AI_RESULT_STORAGE_KEY, payload);
      common_vendor.index.navigateTo({
        url: "/pages/ai/ai",
        fail: (err) => {
          common_vendor.index.showToast({
            title: (err == null ? void 0 : err.errMsg) || "打开识别结果页失败",
            icon: "none"
          });
        }
      });
    };
    const startRecognize = () => {
      if (recognizeLoading.value)
        return;
      common_vendor.index.showActionSheet({
        itemList: ["拍照识别", "从相册识别"],
        success: (res) => {
          const sourceType = res.tapIndex === 0 ? ["camera"] : ["album"];
          common_vendor.index.chooseImage({
            count: 1,
            sizeType: ["compressed"],
            sourceType,
            success: (chooseRes) => {
              var _a;
              const filePath = `${((_a = chooseRes == null ? void 0 : chooseRes.tempFilePaths) == null ? void 0 : _a[0]) || ""}`.trim();
              if (!filePath) {
                common_vendor.index.showToast({
                  title: "未获取到图片",
                  icon: "none"
                });
                return;
              }
              recognizeLoading.value = true;
              common_vendor.index.showLoading({
                title: "识别中..."
              });
              api_index.recognizePlantByImage({ filePath }).then((result) => {
                gotoRecognizeResult({ filePath, result });
                api_index.uploadImageResource({ filePath, fileName: "recognize.jpg" }).then((uploadedPath) => {
                  const raw = common_vendor.index.getStorageSync(AI_RESULT_STORAGE_KEY);
                  const payload = raw && typeof raw === "object" ? { ...raw } : {};
                  const currentRecognized = `${(payload == null ? void 0 : payload.recognizedImageUrl) || ""}`.trim();
                  if (currentRecognized && currentRecognized !== filePath)
                    return;
                  const safeUploaded = `${uploadedPath || ""}`.trim();
                  if (!safeUploaded)
                    return;
                  const mergedImages = [safeUploaded, `${(payload == null ? void 0 : payload.imageUrl) || ""}`.trim()].filter((item, index, arr) => item && arr.indexOf(item) === index);
                  payload.recognizedImageUrl = safeUploaded;
                  payload.images = mergedImages;
                  common_vendor.index.setStorageSync(AI_RESULT_STORAGE_KEY, payload);
                  common_vendor.index.$emit("ai:recognized-image-updated", safeUploaded);
                }).catch(() => {
                });
              }).catch((err) => {
                common_vendor.index.showToast({
                  title: (err == null ? void 0 : err.message) || "识别失败，请稍后再试",
                  icon: "none"
                });
              }).finally(() => {
                recognizeLoading.value = false;
                common_vendor.index.hideLoading();
              });
            }
          });
        }
      });
    };
    const onRecognize = () => {
      if (showPrivacyPopup.value)
        return;
      syncWechatProfileIfNeeded(startRecognize);
    };
    const onOpenUserAgreement = () => {
      utils_privacy.openUserAgreement();
    };
    const onOpenPrivacyPolicy = () => {
      utils_privacy.openPrivacyPolicy();
    };
    const onRejectPrivacy = () => {
      common_vendor.index.showToast({
        title: "需同意协议后才能使用",
        icon: "none"
      });
    };
    const onAgreePrivacy = () => {
      utils_privacy.setUserPrivacyAccepted(true);
      showPrivacyPopup.value = false;
      loadGardenInfo();
    };
    const loadCountsByGarden = () => {
      if (!gardenCards.value.length)
        return Promise.resolve();
      return Promise.all(
        gardenCards.value.map(
          (garden) => Promise.all([
            api_index.listPlants(void 0, garden.id),
            api_index.listCareTasks(garden.id),
            api_index.listPlants("focus", garden.id)
          ]).then(([plants, tasks, focusedPlants]) => ({
            id: garden.id,
            plantCount: (plants || []).length,
            todayCareCount: (tasks || []).filter((task) => (task == null ? void 0 : task.offset) === 0 && !(task == null ? void 0 : task.completed)).length,
            focusCount: (focusedPlants || []).length
          })).catch(() => ({
            id: garden.id,
            plantCount: 0,
            todayCareCount: 0,
            focusCount: 0
          }))
        )
      ).then((rows) => {
        const map = new Map(rows.map((item) => [item.id, item]));
        gardenCards.value = gardenCards.value.map((garden) => {
          var _a, _b, _c;
          return {
            ...garden,
            plantCount: ((_a = map.get(garden.id)) == null ? void 0 : _a.plantCount) || 0,
            todayCareCount: ((_b = map.get(garden.id)) == null ? void 0 : _b.todayCareCount) || 0,
            focusCount: ((_c = map.get(garden.id)) == null ? void 0 : _c.focusCount) || 0
          };
        });
      });
    };
    const loadGardenInfo = () => {
      api_index.listGardens().then((rows) => {
        gardenCards.value = (rows || []).map((item, index) => ({
          id: (item == null ? void 0 : item.id) || `${index}`,
          title: (item == null ? void 0 : item.name) || defaultGardenInfo.title,
          subTitle: (item == null ? void 0 : item.establishedDate) || defaultGardenInfo.subTitle,
          thumb: (item == null ? void 0 : item.thumbUrl) || defaultGardenInfo.thumb,
          image: (item == null ? void 0 : item.coverUrl) || defaultGardenInfo.image,
          description: (item == null ? void 0 : item.description) || defaultGardenInfo.description,
          isDefault: !!(item == null ? void 0 : item.isDefault),
          plantCount: 0,
          todayCareCount: 0,
          focusCount: 0
        }));
        return loadCountsByGarden();
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加载花园信息失败",
          icon: "none"
        });
        gardenCards.value = [];
      });
    };
    common_vendor.onShow(() => {
      if (!utils_privacy.hasUserPrivacyAccepted()) {
        showPrivacyPopup.value = true;
        return;
      }
      showPrivacyPopup.value = false;
      loadGardenInfo();
    });
    const onFooterAction = (item) => {
      const gardenId = `${(item == null ? void 0 : item.gardenId) ?? ""}`.trim();
      if (gardenId) {
        common_vendor.index.setStorageSync(SELECTED_GARDEN_KEY, gardenId);
      }
      if (item == null ? void 0 : item.plantFilter) {
        common_vendor.index.setStorageSync(SELECTED_PLANT_FILTER_KEY, item.plantFilter);
      }
      if (item.mode === "switchTab") {
        common_vendor.index.switchTab({
          url: item.path,
          fail: (err) => {
            common_vendor.index.showToast({
              title: (err == null ? void 0 : err.errMsg) || "tab 跳转失败",
              icon: "none"
            });
          }
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: item.path,
        fail: (err) => {
          common_vendor.index.showToast({
            title: (err == null ? void 0 : err.errMsg) || "页面跳转失败",
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onOpenUserAgreement),
        b: common_vendor.o(onOpenPrivacyPolicy),
        c: common_vendor.o(onRejectPrivacy),
        d: common_vendor.p({
          text: "不同意",
          color: "#d5ddd8",
          shape: "circle"
        }),
        e: common_vendor.o(onAgreePrivacy),
        f: common_vendor.p({
          text: "同意并进入",
          color: "#33c26d",
          shape: "circle"
        }),
        g: common_vendor.p({
          show: showPrivacyPopup.value,
          mode: "center",
          closeOnClickOverlay: false,
          safeAreaInsetBottom: false,
          round: 12
        }),
        h: common_vendor.p({
          name: "account-fill",
          size: "16",
          color: "#2f8f56"
        }),
        i: common_vendor.o(onGoMine),
        j: common_vendor.p({
          name: "plus",
          size: "16",
          color: "#2f8f56"
        }),
        k: common_vendor.o(onAddGarden),
        l: common_vendor.p({
          name: "camera-fill",
          size: "18",
          color: "#ffffff"
        }),
        m: common_vendor.t(recognizeLoading.value ? "识别中..." : "AI识别"),
        n: recognizeLoading.value ? 1 : "",
        o: common_vendor.o(onRecognize),
        p: gardenCards.value.length
      }, gardenCards.value.length ? {
        q: common_vendor.f(gardenCards.value, (garden, k0, i0) => {
          return common_vendor.e({
            a: garden.thumb,
            b: common_vendor.t(garden.title),
            c: garden.isDefault
          }, garden.isDefault ? {} : {}, {
            d: "1cf27b2a-7-" + i0 + "," + ("1cf27b2a-6-" + i0),
            e: common_vendor.o(onEditGardenInfo, garden.id),
            f: common_vendor.t(garden.subTitle),
            g: garden.image,
            h: common_vendor.t(garden.description),
            i: common_vendor.f(createFooterStats(garden), (item, k1, i1) => {
              return {
                a: "1cf27b2a-8-" + i0 + "-" + i1 + "," + ("1cf27b2a-6-" + i0),
                b: common_vendor.p({
                  name: item.icon,
                  size: "16",
                  color: item.color
                }),
                c: common_vendor.t(item.label),
                d: "1cf27b2a-9-" + i0 + "-" + i1 + "," + ("1cf27b2a-6-" + i0),
                e: item.key,
                f: common_vendor.o(($event) => onFooterAction(item), item.key)
              };
            }),
            j: garden.id,
            k: common_vendor.o(($event) => onCardClick(garden), garden.id),
            l: "1cf27b2a-6-" + i0
          });
        }),
        r: common_vendor.p({
          name: "edit-pen",
          size: "16",
          color: "#33c26d"
        }),
        s: common_vendor.p({
          name: "arrow-right",
          size: "12",
          color: "#7bc59a"
        }),
        t: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
