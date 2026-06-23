# 專案結構與修改指南（STRUCTURE.md）

> 給**人與 agent** 共用的 repo 地圖。先看樹狀圖定位檔案，再看「修改方式」決定動哪裡、會牽動什麼。
> 安裝 / 整合 / 發版細節請看 [README.md](README.md)；class 對照（給 AI）看 [docs/ai-guide.md](docs/ai-guide.md)；對話規則看 [CLAUDE.md](CLAUDE.md)。

---

## 1. 檔案樹狀圖

```text
Pi-Design-System/
├── src/                      ★ 真實設計系統原始碼（SCSS，單一真相源）
│   ├── index.scss            #   總入口：@forward tokens + base + components
│   ├── tokens/               #   設計 token（值的來源，禁自創）
│   │   ├── index.scss
│   │   ├── _colors.scss      #     顏色（$cl-* / --cl-* + 語意 alias $fg/$bg/$border）
│   │   ├── _typography.scss  #     字級 / 行高 / 字重 / 字體
│   │   ├── _spacing.scss     #     間距
│   │   ├── _radius.scss      #     圓角（$radius-xs…pill）
│   │   ├── _shadow.scss      #     陰影（$shadow-*）
│   │   ├── _motion.scss      #     動態（時長 / 緩動）
│   │   └── _breakpoints.scss #     RWD 斷點
│   ├── base/                 #   全域基礎
│   │   ├── _reset.scss       #     CSS reset
│   │   ├── _fonts.scss       #     @font-face（對應 fonts/）
│   │   └── _utilities.scss   #     工具 class（flex-*、fz-* 等）
│   └── components/           #   元件：每元件一檔，class 前綴 gl_
│       ├── index.scss        #     @forward 全部元件（新增元件要在此登記）
│       ├── _button.scss  _form.scss  _checkbox.scss  _radio.scss  _toggle.scss
│       ├── _alert.scss  _callout.scss  _content-switcher.scss  _dropdown.scss
│       ├── _pagination.scss  _notification.scss  _loading.scss  _modal.scss
│       └── _border.scss  _shadow.scss
├── assets/                   ★ 靜態資源（隨套件散佈）
│   ├── symicon.css           #   icon 字體 class（icon-*）
│   ├── components.css        #   編譯後元件 CSS（給純 CSS 消費端）
│   ├── icon-names.json / icon-cp-map.json / icons-preview.html
│   └── noise.svg
├── fonts/                    ★ 字型檔（woff/woff2）
├── preview/                  ☆ 開發預覽頁（Vite，吃 /src/index.scss，不散佈邏輯）
│   ├── index.html            #   殼層：左目錄 + 右 iframe
│   ├── color/type/shadow/tokens/icons.html        # foundation 對照頁
│   └── button/form/alert/callout/content-switcher/ # 元件對照頁（拆自舊 components）
│       dropdown/pagination/notification/loading/modal.html
├── docs/ai-guide.md          ☆ 給 AI：Figma 名稱 ↔ class 對照表
├── scripts/check-build.mjs   ☆ build 後 smoke 檢查
├── colors_and_type.css       ⚠ 【散佈產物】色彩+字體 CSS（非 SCSS 消費端用）
├── styles.css                ⚠ 【散佈產物】整合 CSS 入口（@import 三份）
├── vite.config.js            ☆ 預覽用 Vite 設定
├── package.json              ⚠ exports 定義對外散佈接口（改動 = breaking）
├── README.md  CHANGELOG.md  TODO.md
├── CLAUDE.md  SKILL.md       # agent 規則
├── docs/ai-guide.md
├── .claude/skills/           # 專案 skill（如 figma-to-pi-ds）
└── dist/  dist-preview/      # build 產物（gitignore，勿手改/commit）

★ 核心可改  ☆ 開發輔助  ⚠ 動到會影響下游，需謹慎
```

---

## 2. 修改方式（要做什麼 → 動哪裡）

| 目的 | 動哪裡 | 連帶要做 / 注意 |
|---|---|---|
| 改 token（色/字/間距/圓角…） | `src/tokens/_*.scss` | 牽動所有引用該 token 的元件；**只改既有 token 值，禁自創新 token** |
| 改 / 新增元件樣式 | `src/components/_<元件>.scss` | 新元件要在 `components/index.scss` 加 `@forward`；同步 `preview/<元件>.html` 與 `docs/ai-guide.md` |
| 依 Figma 重做元件 | 同上 | 走 skill **figma-to-pi-ds** 流程（讀 Figma→映射既有 token→確認範圍→改 SCSS→同步 preview/docs→build） |
| 改字型 | `fonts/` + `src/base/_fonts.scss` | 詳見 README「字型管理」章節 |
| 看視覺預覽 | 改完直接 `npm run dev` | 預覽吃 `src/index.scss`，HMR 即時；不用先 build |
| 產 CSS 產物 | `npm run build` / `build:min` / `build:tokens` | 產物進 `dist/`（gitignore） |
| 改對外散佈接口 | `package.json` 的 `exports`、根 `colors_and_type.css`/`styles.css` | **breaking change**：下游 7 專案引用路徑會變，需同步並寫 CHANGELOG |

### 最高原則
- **禁自創 token / class**：不確定先 `grep src/` 或讀 `src/tokens`、`src/components` 確認，絕不憑記憶發明。
- **小範圍修改**：只動該處，不順手改其他。
- **breaking change**（改 class 命名 / 結構 / exports）：先確認，並同步所有引用處（preview、docs、README、下游）。

---

## 3. 散佈模型（為何根目錄有產物 CSS）

下游 7 專案因 SEO 要求 CSS 體積小，**不 link 整包**，而是 vendored `.scss` + `@use` 選擇性引用 `src/`。
根 `styles.css` / `colors_and_type.css` 是給**純 CSS / 舊專案**的整合入口（`package.json` exports `./styles.css`、`./css`）。
因此這兩支與 `package.json` exports 是「對外契約」，搬動或改名都屬 breaking。
