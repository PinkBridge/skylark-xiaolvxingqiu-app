"use strict";
const common_vendor = require("../../common/vendor.js");
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
const _sfc_main = {
  __name: "calendar",
  setup(__props) {
    const weekList = ["日", "一", "二", "三", "四", "五", "六"];
    const today = /* @__PURE__ */ new Date();
    const todayKey = formatDate(today);
    const selectedDate = common_vendor.ref(todayKey);
    const currentMonthDate = common_vendor.ref(new Date(today.getFullYear(), today.getMonth(), 1));
    const careActivityList = common_vendor.ref([
      {
        id: "a1",
        date: "2026-03-02",
        time: "08:30",
        name: "浇水",
        plantName: "常春藤",
        completed: true,
        icon: "/static/icon/water.png",
        record: {
          amount: "180",
          method: "喷雾",
          photo: "/static/flower/flower-1.jpg",
          note: "表土偏干，补水后叶片恢复挺立"
        }
      },
      {
        id: "a2",
        date: "2026-03-02",
        time: "09:20",
        name: "施肥",
        plantName: "龟背竹",
        completed: true,
        icon: "/static/icon/fertilize.png",
        record: {
          material: "花多多2号",
          photo: "/static/flower/flower-2.jpg",
          note: "按1:1000稀释后浇施"
        }
      },
      {
        id: "a3",
        date: "2026-03-02",
        time: "10:10",
        name: "修剪",
        plantName: "发财树",
        completed: true,
        icon: "/static/icon/prune.png",
        record: {
          part: "黄叶",
          photo: "/static/flower/flower-3.jpg",
          note: "去除老叶，保留新芽"
        }
      },
      {
        id: "a4",
        date: "2026-03-02",
        time: "11:00",
        name: "换盆",
        plantName: "多肉白牡丹",
        completed: true,
        icon: "/static/icon/repot.png",
        record: {
          potSize: "14cm",
          photo: "/static/flower/flower-4.jpg",
          note: "新盆透气性更好，底部垫陶粒"
        }
      },
      {
        id: "a5",
        date: "2026-03-02",
        time: "13:30",
        name: "病虫害",
        plantName: "吊兰",
        completed: true,
        icon: "/static/icon/pest.png",
        record: {
          type: "蚜虫",
          treatment: "肥皂水",
          photo: "/static/flower/flower-5.jpg",
          note: "喷洒后擦拭叶背，观察48小时"
        }
      },
      {
        id: "a6",
        date: "2026-03-02",
        time: "15:00",
        name: "测量",
        plantName: "虎皮兰",
        completed: true,
        icon: "/static/icon/measure.png",
        record: {
          weight: "2.6kg",
          height: "48cm",
          photo: "/static/flower/flower-6.jpg",
          note: "较上周增高约1cm"
        }
      },
      {
        id: "a7",
        date: "2026-03-02",
        time: "17:10",
        name: "拍照",
        plantName: "绿萝",
        completed: true,
        icon: "/static/icon/photo.png",
        record: {
          photo: "/static/flower/flower-7.jpg",
          note: "叶色饱满，记录当前长势"
        }
      },
      {
        id: "a8",
        date: "2026-03-02",
        time: "18:20",
        name: "松土",
        plantName: "琴叶榕",
        completed: true,
        icon: "/static/icon/loosen.png",
        record: {
          photo: "/static/flower/flower-8.jpg",
          note: "浅层松土，改善根部透气"
        }
      },
      { id: "a9", date: "2026-03-03", time: "10:00", name: "浇水", plantName: "常春藤", completed: false, icon: "/static/icon/water.png" }
    ]);
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
    const selectedActivities = common_vendor.computed(
      () => careActivityList.value.filter((item) => item.date === selectedDate.value).sort((a, b) => a.time.localeCompare(b.time))
    );
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
    };
    const goNextMonth = () => {
      const current = currentMonthDate.value;
      currentMonthDate.value = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    };
    const selectDay = (day) => {
      selectedDate.value = day.dateKey;
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
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.p({
          name: "arrow-left",
          size: "14",
          color: "#5a6b60"
        }),
        b: common_vendor.o(goPrevMonth),
        c: common_vendor.t(monthLabel.value),
        d: common_vendor.p({
          name: "arrow-right",
          size: "14",
          color: "#5a6b60"
        }),
        e: common_vendor.o(goNextMonth),
        f: common_vendor.f(weekList, (week, k0, i0) => {
          return {
            a: common_vendor.t(week),
            b: week
          };
        }),
        g: common_vendor.f(calendarDays.value, (day, k0, i0) => {
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
        h: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        i: common_vendor.t(selectedDateLabel.value),
        j: common_vendor.t(selectedActivities.value.length),
        k: selectedActivities.value.length
      }, selectedActivities.value.length ? {
        l: common_vendor.f(selectedActivities.value, (activity, k0, i0) => {
          return {
            a: "6e8913ab-4-" + i0 + ",6e8913ab-3",
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
        m: common_vendor.p({
          showHead: false,
          showFoot: false,
          border: false,
          margin: "0"
        }),
        n: common_vendor.t(((_a = currentRecordActivity.value) == null ? void 0 : _a.name) || "养护"),
        o: common_vendor.o(($event) => showRecordPopup.value = false),
        p: common_vendor.p({
          name: "close",
          size: "16",
          color: "#8ea096"
        }),
        q: currentRecordRows.value.length
      }, currentRecordRows.value.length ? {
        r: common_vendor.f(currentRecordRows.value, (row, k0, i0) => {
          return {
            a: common_vendor.t(row.label),
            b: common_vendor.t(row.value),
            c: row.label
          };
        })
      } : {}, {
        s: currentRecordPhoto.value
      }, currentRecordPhoto.value ? {
        t: currentRecordPhoto.value
      } : {}, {
        v: currentRecordNote.value
      }, currentRecordNote.value ? {
        w: common_vendor.t(currentRecordNote.value)
      } : {}, {
        x: common_vendor.o(($event) => showRecordPopup.value = false),
        y: common_vendor.p({
          show: showRecordPopup.value,
          mode: "bottom",
          round: "18"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6e8913ab"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/calendar/calendar.js.map
