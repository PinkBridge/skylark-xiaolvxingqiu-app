"use strict";
const common_vendor = require("../common/vendor.js");
let BASE_URL = "http://localhost:8080";
BASE_URL = "https://tasia-unreputed-veda.ngrok-free.dev";
const customBaseUrl = `${common_vendor.index.getStorageSync("customBaseUrl") || ""}`.trim();
if (customBaseUrl) {
  BASE_URL = customBaseUrl;
}
const USER_ID_STORAGE_KEY = "currentUserId";
let resolvingUserIdPromise = null;
const normalizePayload = (raw) => {
  if (raw && typeof raw === "object")
    return raw;
  if (typeof raw === "string") {
    if (raw.indexOf("ERR_NGROK_6024") >= 0 || raw.indexOf("<!DOCTYPE html>") >= 0) {
      return { code: -1, message: "当前 ngrok 地址返回了告警页，请稍后重试或更换可直连域名" };
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return {};
    }
  }
  return {};
};
const readCachedUserId = () => {
  const raw = `${common_vendor.index.getStorageSync(USER_ID_STORAGE_KEY) || ""}`.trim();
  return raw || "";
};
const saveUserId = (userId) => {
  const normalized = `${userId || ""}`.trim();
  if (!normalized)
    return;
  common_vendor.index.setStorageSync(USER_ID_STORAGE_KEY, normalized);
};
const shouldAddNgrokSkipHeader = () => BASE_URL.indexOf("ngrok-free.dev") >= 0;
const buildHeaders = ({ header = {}, userId = "" } = {}) => {
  const mergedHeader = {
    "Content-Type": "application/json",
    ...header
  };
  if (userId) {
    mergedHeader["X-User-Id"] = userId;
  }
  if (shouldAddNgrokSkipHeader()) {
    mergedHeader["ngrok-skip-browser-warning"] = "true";
  }
  return mergedHeader;
};
const silentLogin = () => new Promise((resolve, reject) => {
  common_vendor.index.login({
    provider: "weixin",
    success: (loginRes) => {
      const code = `${(loginRes == null ? void 0 : loginRes.code) || ""}`.trim();
      if (!code) {
        reject(new Error("silent login failed: empty code"));
        return;
      }
      common_vendor.index.request({
        url: `${BASE_URL}/api/xiaolvxingqiu/auth/wechat/silent-login`,
        method: "POST",
        data: { code },
        header: buildHeaders(),
        success: (res) => {
          var _a;
          const payload = normalizePayload(res == null ? void 0 : res.data);
          if (res.statusCode >= 200 && res.statusCode < 300 && payload.code === 0 && ((_a = payload.data) == null ? void 0 : _a.userId)) {
            const userId = `${payload.data.userId}`.trim();
            saveUserId(userId);
            resolve(userId);
            return;
          }
          reject(new Error(payload.message || `silent login failed: ${res.statusCode}`));
        },
        fail: (err) => {
          reject(new Error((err == null ? void 0 : err.errMsg) || "silent login network error"));
        }
      });
    },
    fail: () => {
      reject(new Error("wechat login failed"));
    }
  });
});
const ensureUserId = ({ url } = {}) => {
  const cachedUserId = readCachedUserId();
  if (cachedUserId)
    return Promise.resolve(cachedUserId);
  if (url && url.indexOf("/auth/wechat/silent-login") >= 0)
    return Promise.resolve("");
  if (!resolvingUserIdPromise) {
    resolvingUserIdPromise = silentLogin().finally(() => {
      resolvingUserIdPromise = null;
    });
  }
  return resolvingUserIdPromise;
};
const getHttpBaseUrl = () => BASE_URL;
const ensureCurrentUserId = () => ensureUserId({ url: "" }).then((userId) => userId || readCachedUserId());
const http = ({ url, method = "GET", data, header = {} }) => {
  return ensureUserId({ url }).then((userId) => new Promise((resolve, reject) => {
    const mergedHeader = buildHeaders({ header, userId });
    common_vendor.index.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: mergedHeader,
      success: (res) => {
        const payload = normalizePayload(res == null ? void 0 : res.data);
        if (res.statusCode >= 200 && res.statusCode < 300 && payload.code === 0) {
          resolve(payload.data);
          return;
        }
        reject(new Error(payload.message || `request failed: ${res.statusCode}`));
      },
      fail: (err) => {
        reject(new Error((err == null ? void 0 : err.errMsg) || "network error"));
      }
    });
  }));
};
exports.ensureCurrentUserId = ensureCurrentUserId;
exports.getHttpBaseUrl = getHttpBaseUrl;
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/http.js.map
