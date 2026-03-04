# 小绿星球（xiaolvxingqiu-app）

基于 `uni-app + Vue3 + uview-plus` 的绿植养护小程序示例项目，围绕「花园管理、绿植档案、养护任务、养护日历、个人中心」构建完整前端交互流程。

## 项目定位

小绿星球用于帮助用户记录绿植状态并管理日常养护：

- 花园信息创建与编辑
- 绿植列表浏览、筛选、详情查看
- 多类型养护任务记录（浇水/施肥/修剪/换盆/病虫害/拍照/测量/松土）
- 月历视图查看当日任务与已完成记录
- 个人资料、推送设置、版本/关于/反馈等个人中心模块

## 技术栈

- `uni-app`（Vue3 版本）
- `Vue 3`（`<script setup>` 组合式 API）
- `uview-plus`（当前仓库版本 `3.7.18`）
- `SCSS`

## 页面结构

页面路由定义见 `pages.json`，包含以下核心页面：

- 首页花园：`pages/index/index`
- 养护任务：`pages/care/care`
- 养护日历：`pages/calendar/calendar`
- 我的：`pages/mime/mime`
- 绿植列表：`pages/plant/plant`
- 添加绿植：`pages/plant/add`
- 绿植详情：`pages/plant/detail`
- 花园编辑/创建：`pages/index/garden-edit`、`pages/index/garden-create`
- 我的子页面：`pages/mime/push-setting`、`pages/mime/coin`、`pages/mime/profile`、`pages/mime/about`、`pages/mime/version`、`pages/mime/feedback`

## 当前实现说明

### 1) 数据来源

当前代码以前端静态数据 + 本地缓存为主，未接入后端 API：

- 花园信息：使用 `uni.setStorageSync('gardenInfo', ...)`
- 用户信息：使用 `uni.setStorageSync('userProfile', ...)`
- 养护任务、日历活动、绿植列表等：页面内 mock 数据

### 2) 主要交互能力

- 支持通过 `uni.chooseImage` 选择/拍摄图片
- 支持 `up-datetime-picker` 选择日期/时间
- 支持 `up-action-sheet`、`up-popup` 表单弹层交互
- 支持在任务页将养护任务标记为已完成并更新显示状态

### 3) 平台配置

`manifest.json` 已配置微信小程序 `appid`，并包含多端基础配置（H5/App/各小程序平台）。

## 目录说明（精简）

```text
xiaolvxingqiu-app/
├─ App.vue
├─ main.js
├─ manifest.json
├─ pages.json
├─ pages/
│  ├─ index/
│  ├─ plant/
│  ├─ care/
│  ├─ calendar/
│  └─ mime/
├─ static/                 # 图标与示例图片
├─ uni_modules/uview-plus/ # UI 组件库
└─ unpackage/              # uni-app 构建产物（当前仓库已提交）
```

## 本地开发

> 当前仓库未包含项目级 `package.json`，推荐使用 HBuilderX 打开运行。

### 方式一：HBuilderX（推荐）

1. 使用 HBuilderX 打开项目根目录 `xiaolvxingqiu-app`
2. 运行到对应平台（例如：微信开发者工具 / H5）
3. 若运行微信小程序，请在 `manifest.json` 中确认 `mp-weixin.appid`

### 方式二：CLI（需自行补齐脚手架）

如果你希望改为纯 CLI 工作流，需要补充 `package.json` 与 uni-app 构建脚本后再执行 `npm install / npm run dev:*`。

## 打包发布

- 微信小程序：通过 HBuilderX 发布或导出到微信开发者工具上传
- 其他端：按 `manifest.json` 平台配置进行构建

## 已知边界与后续建议

- 当前多数业务数据仍为 mock，建议下一步接入统一 API 层（如 `services/` + `request` 封装）
- 可把 `gardenInfo`、`userProfile`、任务数据抽离到状态管理（如 Pinia）以减少页面内重复逻辑
- `unpackage/` 体积较大，若团队流程允许，建议通过 `.gitignore` 管理构建产物，减少仓库噪音