# Changelog

本文件記錄 Pi Design System 的每一次發版。格式遵循 [Keep a Changelog](https://keepachangelog.com/)，版本號遵循 [SemVer](https://semver.org/)。

> **版本語意**
> - **major** — breaking：token 改名、component class 改名、刪除元件
> - **minor** — 新增：新 component、新 token、新 variant（不破壞既有 API）
> - **patch** — 修正：bug fix、視覺微調、文件更新

---

## [Unreleased]

### Added
- 待加入

### Changed
- 待加入

### Removed
- 待加入

---

## [0.1.0] — 2026-04-23

首次 npm 化發版。把原本散在各專案的 token + component 集中成可安裝的 package。

### Added
- `src/` SCSS 架構：`tokens/` + `base/` + `components/`
- 完整 tokens：`$cl-*`（7 色 × 12 階 + alpha overlay）、`$fz-*`、`$space-*`、`$radius-*`、`$shadow-*`、`$dur-*`、`$ease-*`
- 語意 aliases：`$fg`、`$bg`、`$surface`、`$border`、`$brand` 等
- Component：`.gl_btn`、`.gl_form-group` / `.gl_form-control`、`.gl_checkbox-layout`、`.gl_radio-layout`、`.gl_toggle`、`.gl_alert-body`、`.gl_callout-wrap`、`.gl_loading`、`.gl_dropdown-item`、`.gl_content-switcher`、`.gl_pagination`、`.gl_modal`、`.gl_notification-item`
- `package.json` 設定 subpath exports（`tokens` / `base` / `components` / `components/*`）
- `preview/tokens.html` — 單頁可搜尋 / 可複製的 token 對照表
- `docs/ai-guide.md` — 給 AI 切版 agent 的 cheatsheet

### Changed
- 顏色 token 改名：`danger` → `red`、`warning` → `yellow`、`success` → `green`、`info` → `blue`（語意別名保留，例如 `$brand` 仍指向 `$cl-green-500`）
- 移除 `primary` ramp（原 teal #009688），logo 色改用 `$cl-green-500`

### Migration from legacy `colors_and_type.css`

舊專案用 `<link rel="stylesheet" href=".../colors_and_type.css">` 的可繼續用；新專案請改成：

```scss
@use "@yourteam/design-system" as *;
```

之後會在 1.0.0 把 `colors_and_type.css` 標記為 deprecated。

---

<!--
版本紀錄範本（複製以下區塊到 [Unreleased] 上方）：

## [0.x.y] — YYYY-MM-DD

### Added
- ...

### Changed
- ...

### Deprecated
- ...

### Removed
- ...

### Fixed
- ...

### Security
- ...

### Breaking
- ...

-->
