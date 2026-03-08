"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_auth = require("../../utils/auth.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_card2 = common_vendor.resolveComponent("up-card");
  (_easycom_up_icon2 + _easycom_up_card2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_card = () => "../../uni_modules/uview-plus/components/u-card/u-card.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_card)();
}
const SELECTED_GARDEN_KEY = "selectedGardenId";
const SELECTED_PLANT_FILTER_KEY = "selectedPlantFilter";
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
    const hasWechatPhone = common_vendor.ref(utils_auth.hasPhoneAuth());
    const wechatAuthLoading = common_vendor.ref(false);
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
        path: "/pages/plant/plant",
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
    const onCardClick = () => {
      common_vendor.index.showToast({
        title: "可在这里跳转花园详情页",
        icon: "none"
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
    const completeWechatPhoneAuth = (event, nextAction) => {
      if (wechatAuthLoading.value)
        return;
      const detail = (event == null ? void 0 : event.detail) || {};
      if (detail.errMsg && detail.errMsg.indexOf(":ok") === -1) {
        common_vendor.index.showToast({
          title: "需要手机号授权才能继续",
          icon: "none"
        });
        return;
      }
      wechatAuthLoading.value = true;
      common_vendor.index.login({
        provider: "weixin",
        success: (loginRes) => {
          api_index.authWechatPhone({
            code: (loginRes == null ? void 0 : loginRes.code) || "",
            encryptedData: detail.encryptedData || "",
            iv: detail.iv || ""
          }).then((data) => {
            utils_auth.saveWxAuthProfile({
              phone: (data == null ? void 0 : data.phone) || "",
              authDone: true
            });
            hasWechatPhone.value = utils_auth.hasPhoneAuth();
            nextAction();
          }).catch((err) => {
            common_vendor.index.showToast({
              title: (err == null ? void 0 : err.message) || "手机号授权失败",
              icon: "none"
            });
          }).finally(() => {
            wechatAuthLoading.value = false;
          });
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "微信登录失败",
            icon: "none"
          });
          wechatAuthLoading.value = false;
        }
      });
    };
    const onGoMine = () => {
      gotoMinePage();
    };
    const startRecognize = () => {
      common_vendor.index.showActionSheet({
        itemList: ["拍照识别", "从相册识别"],
        success: (res) => {
          const sourceType = res.tapIndex === 0 ? ["camera"] : ["album"];
          common_vendor.index.chooseImage({
            count: 1,
            sizeType: ["compressed"],
            sourceType,
            success: () => {
              common_vendor.index.showToast({
                title: "识别功能即将上线",
                icon: "none"
              });
            }
          });
        }
      });
    };
    const onRecognize = () => {
      startRecognize();
    };
    const onWechatPhoneMine = (event) => {
      completeWechatPhoneAuth(event, gotoMinePage);
    };
    const onWechatPhoneRecognize = (event) => {
      completeWechatPhoneAuth(event, startRecognize);
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
            todayCareCount: (tasks || []).filter((task) => (task == null ? void 0 : task.offset) === 0).length,
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
      loadGardenInfo();
      hasWechatPhone.value = utils_auth.hasPhoneAuth();
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
        a: !hasWechatPhone.value
      }, !hasWechatPhone.value ? {
        b: common_vendor.p({
          name: "account-fill",
          size: "14",
          color: "#2f8f56"
        }),
        c: common_vendor.o(onWechatPhoneMine),
        d: wechatAuthLoading.value
      } : {
        e: common_vendor.p({
          name: "account-fill",
          size: "14",
          color: "#2f8f56"
        }),
        f: common_vendor.o(onGoMine)
      }, {
        g: common_vendor.p({
          name: "plus",
          size: "14",
          color: "#2f8f56"
        }),
        h: common_vendor.o(onAddGarden),
        i: !hasWechatPhone.value
      }, !hasWechatPhone.value ? {
        j: common_vendor.p({
          name: "camera-fill",
          size: "18",
          color: "#ffffff"
        }),
        k: common_vendor.o(onWechatPhoneRecognize),
        l: wechatAuthLoading.value
      } : {
        m: common_vendor.p({
          name: "camera-fill",
          size: "18",
          color: "#ffffff"
        }),
        n: common_vendor.o(onRecognize)
      }, {
        o: gardenCards.value.length
      }, gardenCards.value.length ? {
        p: common_vendor.f(gardenCards.value, (garden, k0, i0) => {
          return common_vendor.e({
            a: garden.thumb,
            b: common_vendor.t(garden.title),
            c: garden.isDefault
          }, garden.isDefault ? {} : {}, {
            d: "1cf27b2a-6-" + i0 + "," + ("1cf27b2a-5-" + i0),
            e: common_vendor.o(onEditGardenInfo, garden.id),
            f: common_vendor.t(garden.subTitle),
            g: garden.image,
            h: common_vendor.t(garden.description),
            i: common_vendor.f(createFooterStats(garden), (item, k1, i1) => {
              return {
                a: "1cf27b2a-7-" + i0 + "-" + i1 + "," + ("1cf27b2a-5-" + i0),
                b: common_vendor.p({
                  name: item.icon,
                  size: "16",
                  color: item.color
                }),
                c: common_vendor.t(item.label),
                d: "1cf27b2a-8-" + i0 + "-" + i1 + "," + ("1cf27b2a-5-" + i0),
                e: item.key,
                f: common_vendor.o(($event) => onFooterAction(item), item.key)
              };
            }),
            j: garden.id,
            k: common_vendor.o(onCardClick, garden.id),
            l: "1cf27b2a-5-" + i0
          });
        }),
        q: common_vendor.p({
          name: "edit-pen",
          size: "16",
          color: "#33c26d"
        }),
        r: common_vendor.p({
          name: "arrow-right",
          size: "12",
          color: "#7bc59a"
        }),
        s: common_vendor.p({
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
