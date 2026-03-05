"use strict";
const utils_http = require("../utils/http.js");
const getGardenInfo = () => utils_http.http({ url: "/api/garden" });
const updateGardenInfo = (data) => utils_http.http({ url: "/api/garden", method: "PUT", data });
const createGarden = (data) => utils_http.http({ url: "/api/gardens", method: "POST", data });
const listGardens = () => utils_http.http({ url: "/api/gardens" });
const getUserProfile = () => utils_http.http({ url: "/api/profile" });
const updateUserProfile = (data) => utils_http.http({ url: "/api/profile", method: "PUT", data });
const listPlants = (filter, gardenId) => {
  const params = [];
  if (filter)
    params.push(`filter=${encodeURIComponent(filter)}`);
  if (gardenId !== void 0 && gardenId !== null && `${gardenId}` !== "") {
    params.push(`gardenId=${encodeURIComponent(gardenId)}`);
  }
  const query = params.length ? `?${params.join("&")}` : "";
  return utils_http.http({
    url: `/api/plants${query}`
  });
};
const getPlantById = (id) => utils_http.http({ url: `/api/plants/${id}` });
const createPlant = (data) => utils_http.http({ url: "/api/plants", method: "POST", data });
const updatePlant = (id, data) => utils_http.http({ url: `/api/plants/${id}`, method: "PUT", data });
const deletePlant = (id) => utils_http.http({ url: `/api/plants/${id}`, method: "DELETE" });
const setPlantFocus = (id, data) => utils_http.http({ url: `/api/plants/${id}/focus`, method: "PUT", data });
const clearPlantFocus = (id) => utils_http.http({ url: `/api/plants/${id}/focus`, method: "DELETE" });
const listCareTasks = (gardenId) => {
  const query = gardenId !== void 0 && gardenId !== null && `${gardenId}` !== "" ? `?gardenId=${encodeURIComponent(gardenId)}` : "";
  return utils_http.http({ url: `/api/care/tasks${query}` });
};
const completeCareTask = (taskId, data) => utils_http.http({ url: `/api/care/tasks/${taskId}/complete`, method: "POST", data });
const listCareActivitiesByDate = (date, gardenId) => {
  const params = [`date=${encodeURIComponent(date)}`];
  if (gardenId !== void 0 && gardenId !== null && `${gardenId}` !== "") {
    params.push(`gardenId=${encodeURIComponent(gardenId)}`);
  }
  return utils_http.http({ url: `/api/care/activities?${params.join("&")}` });
};
const listCareActivitiesByMonth = (month, gardenId) => {
  const params = [`month=${encodeURIComponent(month)}`];
  if (gardenId !== void 0 && gardenId !== null && `${gardenId}` !== "") {
    params.push(`gardenId=${encodeURIComponent(gardenId)}`);
  }
  return utils_http.http({ url: `/api/care/activities?${params.join("&")}` });
};
const getCarePlanConfig = (plantId) => utils_http.http({ url: `/api/care/plans/${plantId}` });
const saveCarePlanConfig = (plantId, data) => utils_http.http({ url: `/api/care/plans/${plantId}`, method: "PUT", data });
const submitFeedbackApi = (data) => utils_http.http({ url: "/api/feedback", method: "POST", data });
exports.clearPlantFocus = clearPlantFocus;
exports.completeCareTask = completeCareTask;
exports.createGarden = createGarden;
exports.createPlant = createPlant;
exports.deletePlant = deletePlant;
exports.getCarePlanConfig = getCarePlanConfig;
exports.getGardenInfo = getGardenInfo;
exports.getPlantById = getPlantById;
exports.getUserProfile = getUserProfile;
exports.listCareActivitiesByDate = listCareActivitiesByDate;
exports.listCareActivitiesByMonth = listCareActivitiesByMonth;
exports.listCareTasks = listCareTasks;
exports.listGardens = listGardens;
exports.listPlants = listPlants;
exports.saveCarePlanConfig = saveCarePlanConfig;
exports.setPlantFocus = setPlantFocus;
exports.submitFeedbackApi = submitFeedbackApi;
exports.updateGardenInfo = updateGardenInfo;
exports.updatePlant = updatePlant;
exports.updateUserProfile = updateUserProfile;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/index.js.map
