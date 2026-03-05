"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_card2 = common_vendor.resolveComponent("up-card");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  (_easycom_up_icon2 + _easycom_up_card2 + _easycom_up_popup2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_card = () => "../../uni_modules/uview-plus/components/u-card/u-card.js";
const _easycom_up_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_card + _easycom_up_popup)();
}
const SELECTED_GARDEN_KEY = "selectedGardenId";
const _sfc_main = {
  __name: "calendar",
  setup(__props) {
    const navMetrics = common_vendor.ref(resolveNavMetrics());
    function resolveNavMetrics() {
      const systemInfo = common_vendor.index.getSystemInfoSync ? common_vendor.index.getSystemInfoSync() : {};
      const statusBarHeight = Number(systemInfo.statusBarHeight || 20);
      let capsuleHeight = 32;
      let gap = 6;
      try {
        const menu = common_vendor.index.getMenuButtonBoundingClientRect ? common_vendor.index.getMenuButtonBoundingClientRect() : null;
        if (menu && menu.top && menu.height && menu.left) {
          capsuleHeight = menu.height;
          gap = Math.max(4, menu.top - statusBarHeight);
        }
      } catch (e) {
      }
      const navBarHeight = Math.max(statusBarHeight + capsuleHeight + gap * 2, statusBarHeight + 44);
      return {
        statusBarHeight,
        navBarHeight,
        contentBarHeight: navBarHeight - statusBarHeight
      };
    }
    const weekList = ["日", "一", "二", "三", "四", "五", "六"];
    const today = /* @__PURE__ */ new Date();
    const todayKey = formatDate(today);
    const selectedDate = common_vendor.ref(todayKey);
    const currentMonthDate = common_vendor.ref(new Date(today.getFullYear(), today.getMonth(), 1));
    const careActivityList = common_vendor.ref([]);
    const selectedGardenId = common_vendor.ref("");
    const readSelectedGardenId = () => `${common_vendor.index.getStorageSync(SELECTED_GARDEN_KEY) || ""}`.trim();
    const monthLabel = common_vendor.computed(() => {
      const year = currentMonthDate.value.getFullYear();
      const month = currentMonthDate.value.getMonth() + 1;
      return `${year}年${month}月`;
    });
    const selectedDateLabel = common_vendor.computed(() => selectedDate.value || "未选择日期");
    const calendarDays = common_vendor.computed(() => {
      const year = currentMonthDate.value.getFullYear();
      const month = currentMonthDate.value.getMonth();
      const firstWeekDay = new Date(year, month, 1).getDay();
      const monthDays = new Date(year, month + 1, 0).getDate();
      const prevMonthDays = new Date(year, month, 0).getDate();
      const list = [];
      for (let i = firstWeekDay - 1; i >= 0; i--) {
        const day = prevMonthDays - i;
        const date = new Date(year, month - 1, day);
        list.push(buildDayCell(date, false));
      }
      for (let day = 1; day <= monthDays; day++) {
        const date = new Date(year, month, day);
        list.push(buildDayCell(date, true));
      }
      const remain = (7 - list.length % 7) % 7;
      for (let day = 1; day <= remain; day++) {
        const date = new Date(year, month + 1, day);
        list.push(buildDayCell(date, false));
      }
      return list;
    });
    const selectedActivities = common_vendor.computed(() => {
      return careActivityList.value.filter((item) => item.date === selectedDate.value).sort((a, b) => (a.time || "").localeCompare(b.time || ""));
    });
    const showRecordPopup = common_vendor.ref(false);
    const currentRecordActivity = common_vendor.ref(null);
    const currentRecordRows = common_vendor.computed(() => {
      var _a;
      if (!((_a = currentRecordActivity.value) == null ? void 0 : _a.record))
        return [];
      const { name, record } = currentRecordActivity.value;
      switch (name) {
        case "浇水":
          return buildRows([
            { label: "水量（ml）", value: record.amount },
            { label: "浇水方式", value: record.method }
          ]);
        case "施肥":
          return buildRows([{ label: "施肥用料", value: record.material }]);
        case "修剪":
          return buildRows([{ label: "修剪部位", value: record.part }]);
        case "换盆":
          return buildRows([{ label: "新盆尺寸（直径）", value: record.potSize }]);
        case "测量":
          return buildRows([
            { label: "重量（含花盆）", value: record.weight },
            { label: "高度", value: record.height }
          ]);
        case "病虫害":
          return buildRows([
            { label: "病虫害类型", value: record.type },
            { label: "处理方式", value: record.treatment }
          ]);
        default:
          return [];
      }
    });
    const currentRecordPhoto = common_vendor.computed(() => {
      var _a, _b;
      return ((_b = (_a = currentRecordActivity.value) == null ? void 0 : _a.record) == null ? void 0 : _b.photo) || "";
    });
    const currentRecordNote = common_vendor.computed(() => {
      var _a, _b;
      return ((_b = (_a = currentRecordActivity.value) == null ? void 0 : _a.record) == null ? void 0 : _b.note) || "";
    });
    function buildRows(rows) {
      return rows.filter((item) => item.value !== void 0 && item.value !== null && `${item.value}`.trim() !== "");
    }
    function buildDayCell(date, isCurrentMonth) {
      const dateKey = formatDate(date);
      const dayActivities = careActivityList.value.filter((item) => item.date === dateKey);
      const hasOverdue = dayActivities.some((item) => !item.completed && item.date < todayKey);
      return {
        key: `${dateKey}-${isCurrentMonth ? "current" : "other"}`,
        dateKey,
        day: date.getDate(),
        isCurrentMonth,
        isToday: dateKey === todayKey,
        activityCount: dayActivities.length,
        hasOverdue
      };
    }
    function formatDate(date) {
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, "0");
      const day = `${date.getDate()}`.padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    const goPrevMonth = () => {
      const current = currentMonthDate.value;
      currentMonthDate.value = new Date(current.getFullYear(), current.getMonth() - 1, 1);
      loadMonthActivities();
    };
    const goNextMonth = () => {
      const current = currentMonthDate.value;
      currentMonthDate.value = new Date(current.getFullYear(), current.getMonth() + 1, 1);
      loadMonthActivities();
    };
    const selectDay = (day) => {
      selectedDate.value = day.dateKey;
      loadDateActivities(day.dateKey);
    };
    const openCompletedRecord = (activity) => {
      if (!activity.completed)
        return;
      if (!activity.record) {
        common_vendor.index.showToast({
          title: "暂无填写记录",
          icon: "none"
        });
        return;
      }
      currentRecordActivity.value = activity;
      showRecordPopup.value = true;
    };
    const getStatusText = (activity) => {
      if (activity.completed)
        return "已呵护";
      return "未呵护";
    };
    const getStatusClass = (activity) => {
      if (activity.completed)
        return "status-done";
      return "status-pending";
    };
    const getCurrentMonth = () => {
      const year = currentMonthDate.value.getFullYear();
      const month = `${currentMonthDate.value.getMonth() + 1}`.padStart(2, "0");
      return `${year}-${month}`;
    };
    const loadMonthActivities = () => {
      api_index.listCareActivitiesByMonth(getCurrentMonth(), selectedGardenId.value || void 0).then((activities) => {
        careActivityList.value = activities || [];
      }).catch((err) => {
        common_vendor.index.showToast({
          title: (err == null ? void 0 : err.message) || "加载月活动失败",
          icon: "none"
        });
      });
    };
    const loadDateActivities = (date) => {
      api_index.listCareActivitiesByDate(date, selectedGardenId.value || void 0).then((activities) => {
        const map = new Map((careActivityList.value || []).map((item) => [item.id, item]));
        (activities || []).forEach((item) => map.set(item.id, item));
        careActivityList.value = Array.from(map.values());
      }).catch(() => {
      });
    };
    const goIndexPage = () => {
      common_vendor.index.reLaunch({
        url: "/pages/index/index",
        fail: () => {
          common_vendor.index.redirectTo({
            url: "/pages/index/index"
          });
        }
      });
    };
    common_vendor.onShow(() => {
      selectedGardenId.value = readSelectedGardenId();
      loadMonthActivities();
      loadDateActivities(selectedDate.value);
    });
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.p({
          name: "home",
          size: "14",
          color: "#33c26d"
        }),
        b: common_vendor.o(goIndexPage),
        c: `${navMetrics.value.statusBarHeight}px`,
        d: `${navMetrics.value.contentBarHeight}px`,
        e: common_vendor.p({
          name: "arrow-left",
          size: "14",
          color: "#5a6b60"
        }),
        f: common_vendor.o(goPrevMonth),
        g: common_vendor.t(monthLabel.value),
        h: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#5a6b60"
        }),
        i: common_vendor.o(goNextMonth),
        j: common_vendor.f(weekList, (week, k0, i0) => {
          return {
            a: common_vendor.t(week),
            b: week
          };
        }),
        k: common_vendor.f(calendarDays.value, (day, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(day.day),
            b: day.activityCount
          }, day.activityCount ? {
            c: day.hasOverdue ? 1 : ""
          } : {}, {
            d: day.key,
            e: day.isCurrentMonth ? 1 : "",
            f: day.dateKey === selectedDate.value ? 1 : "",
            g: day.isToday ? 1 : "",
            h: common_vendor.o(($event) => selectDay(day), day.key)
          });
        }),
        l: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        m: common_vendor.t(selectedDateLabel.value),
        n: common_vendor.t(selectedActivities.value.length),
        o: selectedActivities.value.length
      }, selectedActivities.value.length ? {
        p: common_vendor.f(selectedActivities.value, (activity, k0, i0) => {
          return {
            a: "6e8913ab-5-" + i0 + ",6e8913ab-4",
            b: common_vendor.p({
              name: activity.icon,
              size: "30",
              color: "#33c26d"
            }),
            c: common_vendor.t(activity.name),
            d: common_vendor.t(activity.plantName),
            e: common_vendor.t(activity.time),
            f: common_vendor.t(getStatusText(activity)),
            g: common_vendor.n(getStatusClass(activity)),
            h: activity.id,
            i: activity.completed ? 1 : "",
            j: activity.completed ? 1 : "",
            k: common_vendor.o(($event) => openCompletedRecord(activity), activity.id)
          };
        })
      } : {}, {
        q: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        r: common_vendor.t(((_a = currentRecordActivity.value) == null ? void 0 : _a.name) || "养护"),
        s: common_vendor.o(($event) => showRecordPopup.value = false),
        t: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        v: currentRecordRows.value.length
      }, currentRecordRows.value.length ? {
        w: common_vendor.f(currentRecordRows.value, (row, k0, i0) => {
          return {
            a: common_vendor.t(row.label),
            b: common_vendor.t(row.value),
            c: row.label
          };
        })
      } : {}, {
        x: currentRecordPhoto.value
      }, currentRecordPhoto.value ? {
        y: currentRecordPhoto.value
      } : {}, {
        z: currentRecordNote.value
      }, currentRecordNote.value ? {
        A: common_vendor.t(currentRecordNote.value)
      } : {}, {
        B: common_vendor.o(($event) => showRecordPopup.value = false),
        C: common_vendor.p({
          show: showRecordPopup.value,
          mode: "bottom",
          round: "18"
        }),
        D: `${navMetrics.value.navBarHeight + 12}px`
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6e8913ab"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/calendar/calendar.js.map
