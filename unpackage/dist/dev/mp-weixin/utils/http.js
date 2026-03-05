"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://localhost:8086/xiaolvxingqiu";
const http = ({ url, method = "GET", data, header = {} }) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: {
        "Content-Type": "application/json",
        ...header
      },
      success: (res) => {
        const payload = res.data || {};
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
  });
};
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/http.js.map
