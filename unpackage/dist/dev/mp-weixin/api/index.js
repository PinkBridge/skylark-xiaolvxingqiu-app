"use strict";
const common_vendor = require("../common/vendor.js");
const utils_http = require("../utils/http.js");
const BIZ_PREFIX = "/api/xiaolvxingqiu";
const bizUrl = (path) => `${BIZ_PREFIX}${path}`;
const getGardenInfo = () => utils_http.http({ url: bizUrl("/garden") });
const updateGardenInfo = (data) => utils_http.http({ url: bizUrl("/garden"), method: "PUT", data });
const createGarden = (data) => utils_http.http({ url: bizUrl("/gardens"), method: "POST", data });
const listGardens = () => utils_http.http({ url: bizUrl("/gardens") });
const getUserProfile = () => utils_http.http({ url: bizUrl("/profile") });
const updateUserProfile = (data) => utils_http.http({ url: bizUrl("/profile"), method: "PUT", data });
const listPlants = (filter, gardenId) => {
  const params = [];
  if (filter)
    params.push(`filter=${encodeURIComponent(filter)}`);
  if (gardenId !== void 0 && gardenId !== null && `${gardenId}` !== "") {
    params.push(`gardenId=${encodeURIComponent(gardenId)}`);
  }
  const query = params.length ? `?${params.join("&")}` : "";
  return utils_http.http({
    url: bizUrl(`/plants${query}`)
  });
};
const getPlantById = (id) => utils_http.http({ url: bizUrl(`/plants/${id}`) });
const createPlant = (data) => utils_http.http({ url: bizUrl("/plants"), method: "POST", data });
const updatePlant = (id, data) => utils_http.http({ url: bizUrl(`/plants/${id}`), method: "PUT", data });
const deletePlant = (id) => utils_http.http({ url: bizUrl(`/plants/${id}`), method: "DELETE" });
const setPlantFocus = (id, data) => utils_http.http({ url: bizUrl(`/plants/${id}/focus`), method: "PUT", data });
const clearPlantFocus = (id) => utils_http.http({ url: bizUrl(`/plants/${id}/focus`), method: "DELETE" });
const listCareTasks = (gardenId) => {
  const query = gardenId !== void 0 && gardenId !== null && `${gardenId}` !== "" ? `?gardenId=${encodeURIComponent(gardenId)}` : "";
  return utils_http.http({ url: bizUrl(`/care/tasks${query}`) });
};
const completeCareTask = (taskId, data) => utils_http.http({ url: bizUrl(`/care/tasks/${taskId}/complete`), method: "POST", data });
const listCareActivitiesByDate = (date, gardenId) => {
  const params = [`date=${encodeURIComponent(date)}`];
  if (gardenId !== void 0 && gardenId !== null && `${gardenId}` !== "") {
    params.push(`gardenId=${encodeURIComponent(gardenId)}`);
  }
  return utils_http.http({ url: bizUrl(`/care/activities?${params.join("&")}`) });
};
const listCareActivitiesByMonth = (month, gardenId) => {
  const params = [`month=${encodeURIComponent(month)}`];
  if (gardenId !== void 0 && gardenId !== null && `${gardenId}` !== "") {
    params.push(`gardenId=${encodeURIComponent(gardenId)}`);
  }
  return utils_http.http({ url: bizUrl(`/care/activities?${params.join("&")}`) });
};
const listPlantGrowthRecords = (plantId, pageNo = 1, pageSize = 10) => utils_http.http({ url: bizUrl(`/care/records?plantId=${encodeURIComponent(plantId)}&pageNo=${encodeURIComponent(pageNo)}&pageSize=${encodeURIComponent(pageSize)}`) });
const listPlantAlbumRecords = (plantId, pageNo = 1, pageSize = 10) => utils_http.http({ url: bizUrl(`/care/albums?plantId=${encodeURIComponent(plantId)}&pageNo=${encodeURIComponent(pageNo)}&pageSize=${encodeURIComponent(pageSize)}`) });
const getPlantCareStats = (plantId) => utils_http.http({ url: bizUrl(`/care/stats?plantId=${encodeURIComponent(plantId)}`) });
const getPlantMonthlyStats = (plantId, months = 6) => utils_http.http({ url: bizUrl(`/care/stats/monthly?plantId=${encodeURIComponent(plantId)}&months=${encodeURIComponent(months)}`) });
const getCarePlanConfig = (plantId) => utils_http.http({ url: bizUrl(`/care/plans/${plantId}`) });
const saveCarePlanConfig = (plantId, data) => utils_http.http({ url: bizUrl(`/care/plans/${plantId}`), method: "PUT", data });
const getCoinAccount = () => utils_http.http({ url: bizUrl("/coin/account") });
const submitFeedbackApi = (data) => utils_http.http({ url: bizUrl("/feedback"), method: "POST", data });
const createAiCollection = (data) => utils_http.http({ url: bizUrl("/ai/collections"), method: "POST", data });
const listAiCollections = () => utils_http.http({ url: bizUrl("/ai/collections") });
const deleteAiCollection = (id) => utils_http.http({ url: bizUrl(`/ai/collections/${id}`), method: "DELETE" });
const addAiCollectionToGarden = (id) => utils_http.http({ url: bizUrl(`/ai/collections/${id}/add-to-garden`), method: "POST" });
const recognizePlantByImage = ({ filePath, fileName = "plant.jpg" }) => new Promise((resolve, reject) => {
  const normalizedPath = `${filePath || ""}`.trim();
  if (!normalizedPath) {
    reject(new Error("请选择要识别的图片"));
    return;
  }
  const userId = utils_http.getCurrentUserId();
  const header = userId ? { "X-User-Id": userId } : {};
  if (utils_http.getHttpBaseUrl().indexOf("ngrok-free.dev") >= 0) {
    header["ngrok-skip-browser-warning"] = "true";
  }
  common_vendor.index.uploadFile({
    url: `${utils_http.getHttpBaseUrl()}${bizUrl("/ai/plant/recognize")}`,
    filePath: normalizedPath,
    name: "file",
    formData: {
      fileName
    },
    header,
    success: (res) => {
      let payload = {};
      if (typeof (res == null ? void 0 : res.data) === "string") {
        try {
          payload = JSON.parse(res.data || "{}");
        } catch (e) {
          reject(new Error("识别服务返回解析失败"));
          return;
        }
      } else if ((res == null ? void 0 : res.data) && typeof res.data === "object") {
        payload = res.data;
      }
      if (res.statusCode >= 200 && res.statusCode < 300 && payload.code === 0) {
        resolve(payload.data);
        return;
      }
      reject(new Error(payload.message || `识别失败: ${res.statusCode}`));
    },
    fail: (err) => {
      reject(new Error((err == null ? void 0 : err.errMsg) || "上传图片失败"));
    }
  });
});
exports.addAiCollectionToGarden = addAiCollectionToGarden;
exports.clearPlantFocus = clearPlantFocus;
exports.completeCareTask = completeCareTask;
exports.createAiCollection = createAiCollection;
exports.createGarden = createGarden;
exports.createPlant = createPlant;
exports.deleteAiCollection = deleteAiCollection;
exports.deletePlant = deletePlant;
exports.getCarePlanConfig = getCarePlanConfig;
exports.getCoinAccount = getCoinAccount;
exports.getGardenInfo = getGardenInfo;
exports.getPlantById = getPlantById;
exports.getPlantCareStats = getPlantCareStats;
exports.getPlantMonthlyStats = getPlantMonthlyStats;
exports.getUserProfile = getUserProfile;
exports.listAiCollections = listAiCollections;
exports.listCareActivitiesByDate = listCareActivitiesByDate;
exports.listCareActivitiesByMonth = listCareActivitiesByMonth;
exports.listCareTasks = listCareTasks;
exports.listGardens = listGardens;
exports.listPlantAlbumRecords = listPlantAlbumRecords;
exports.listPlantGrowthRecords = listPlantGrowthRecords;
exports.listPlants = listPlants;
exports.recognizePlantByImage = recognizePlantByImage;
exports.saveCarePlanConfig = saveCarePlanConfig;
exports.setPlantFocus = setPlantFocus;
exports.submitFeedbackApi = submitFeedbackApi;
exports.updateGardenInfo = updateGardenInfo;
exports.updatePlant = updatePlant;
exports.updateUserProfile = updateUserProfile;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/index.js.map
