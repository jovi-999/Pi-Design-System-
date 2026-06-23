# Pi Design System

從 Pi 系列求職與職場產品（面試準備、薪資情報、兼職媒合）萃取出的「產品中立」設計系統。這個 repo 是 **token 與 component 的唯一真相來源** —— 所有產品線都應該從這裡 import，不要在各自專案內重新定義。

> **定位。** 功能優先、平易近人、能建立信任感。產品所處的場景跟錢與職涯決策有關，所以視覺語言優先考慮：清晰、易讀的數據、肯定且有自信的語氣，而非玩花樣。青綠色（teal-green）象徵信任與成長（不是俗氣的「新創藍」）；溫潤的中性色讓資訊密度高的畫面不會冷冰冰。

---

## 對象與導覽

本 README 給**開發者 / 維護者**（設計原則、安裝整合、開發與發版、字型管理）。其他文件分工：

| 文件 | 對象 | 內容 |
|---|---|---|
| [STRUCTURE.md](STRUCTURE.md) | 人 + agent | 檔案樹狀圖、各區用途、修改方式與注意 |
| [docs/ai-guide.md](docs/ai-guide.md) | agent | Figma 名稱 ↔ class 對照表 |
| [CLAUDE.md](CLAUDE.md) | agent | 對話自動載入的專案規則（禁自創 token 等） |
| [SKILL.md](SKILL.md) | agent | 結構化使用規則 |
| `.claude/skills/` | agent | 專案 skill（如 figma-to-pi-ds：Figma→Pi DS 流程） |
| [CHANGELOG.md](CHANGELOG.md) | 全體 | 版本變更記錄 |

> 想快速定位「要改什麼動哪裡」→ 直接看 **[STRUCTURE.md](STRUCTURE.md)**。

---

## 目錄

1. [內容基本原則](#內容基本原則)
2. [視覺基礎](#視覺基礎)
3. [字體排版](#字體排版)
4. [色彩](#色彩)
5. [圖示](#圖示)
6. [間距、圓角與層次](#間距圓角與層次)
7. [元件](#元件)
8. [產品介面](#產品介面)
9. [檔案結構](#檔案結構)

---

## 內容基本原則

**口吻。** 直白、鼓勵、具體。我們解釋使用者正在看什麼、接下來會發生什麼 —— 從不堆疊行銷形容詞，從不寫「解鎖你的潛能」這種空話。涉及數字（薪資、時薪、面試次數、福利）時，先讓數字說話。

**不同情境的語氣校準。**

| 情境                          | 語氣                              | 範例                                              |
| ---------------------------- | --------------------------------- | ------------------------------------------------- |
| 空狀態 & 首次使用              | 溫暖、引導、給一個下一步           | "還沒有面試紀錄 — 記下第一次，幫下一個求職者照亮路" |
| 資料 & 搜尋結果                | 中性、事實                         | "台積電 · 新竹 · 月薪 45,000–62,000"               |
| 成功 & 確認                    | 簡短、具體                         | "已送出評論 · 發布後會通知你"                      |
| 錯誤 & 破壞性操作              | 直接、可回復、把錯怪在系統          | "這則內容暫時無法載入 · 點擊重試"                  |
| 敏感（薪資、抱怨）             | 保護性、確認同意                    | "匿名發布 · 公司看不到你的姓名"                    |

**密度規則。**

- 列表卡片：每行 **最多 3 個事實**（例如 標題 · 公司 · 薪資）。再多就放進詳細頁。
- 產品內文使用 `text-wrap: pretty` 斷行 —— 不要參差或落單。
- 數字用 display 字體（`--font-display`，等寬數字、緊湊字距）；標籤維持 Inter。

**多語系。** 繁體中文（zh-TW）為主市場，英文（en）為次要。每個字串都要為「zh-TW 比 en 多 15–20% 長度」預留空間（直向佈局預留垂直空間，單行按鈕預留水平空間）。IBM Plex Sans TC 透過 `--font-sans` fallback chain 自動處理 TC。

---

## 視覺基礎

**網格。** 4px 為基本單位。所有元件的 padding、gap、圓角都是 4 的倍數。桌面版 layout container 最大 `1152px`、左右 `24px` 留白；`768px` 是平板斷點；以下單欄。

**密度。**

- **舒適**（預設，消費者流程）：16px 內文、24–32px 區塊間距。
- **緊湊**（資料表、儀表板）：14px 內文、12–16px 區塊間距。
- **觸控**（mobile-first 流程）：點擊區最小 44px、內文最小 16px。

**動態。** 狀態變化（hover、focus、select）120ms；視圖切換 200ms；sheet 與 modal 320ms。Easing 一律 `cubic-bezier(.2, 0, 0, 1)` —— 偏減速、不彈跳。不用 spring physics：這是工具型產品，不是玩具。

**攝影 & 影像。** 我們呈現真實的工作場域、真實的桌面、真實的雙手 —— **絕不用** 商業圖庫的握手照、傍晚天際線、AI 生成的抽象圖。沒有圖片時，fallback 用具名插圖或公司兩字縮寫貼在 `--cl-basic-100` 色塊上。Logo 一律白底；不要替合作品牌 logo 上色。

---

## 字體排版

**主字體：** Inter（variable，預設載 400 / 600；700 視需要載入）。
**TC fallback：** IBM Plex Sans TC —— x-height 跟 Inter 接近，漢字與英文視覺重量相當。
**Display（僅數字用）：** D-DIN / D-DIN Condensed —— 只用於統計、價格、面試次數、薪資範圍。**永遠不要** 用 display 設定內文。
**圖示：** `symicon`（自家 icon font，172 個 glyph，見 [圖示](#圖示)）。

**Scale。** 詳見 `colors_and_type.css`。三大家族：

- **Headline**（`fz-headline-*`，xxl→xs）：主視覺標題、區塊主標。一律 600 或 700；xl / xxl 微負字距。
- **Title**（`fz-title-*`，lg/md/sm）：卡片標題、表單標籤、行內強調。600 weight。
- **Body**（`fz-body-*`，lg/md/sm/xs）：段落、描述、metadata。400 weight，行高寬鬆（1.7–1.8）。

舊有的 `fz-h1`/`fz-s1`/`fz-t1` 別名為了漸進遷移保留 —— 新功能請用語意化命名。

---

## 色彩

**色階結構。** 每個色相都有 50→900 的色階。500 是品牌／語意主色；400 是淺色背景上的 hover/active；600 是深色背景上的 hover。50 與 100 用於塊狀背景（badge、callout）。**永遠不要** 自創中間值（例如 550）—— 需要的話用 500 配 alpha overlay，或改用語意 alias。

**色相。**

- **Basic（中性）** —— 暖偏冷的灰。內文、border、surface。
- **Primary（teal #009688）** —— 歷史品牌色、Logo、主視覺重點。
- **Success（teal-green #00AA90）** —— 正向確認、流程內 CTA。**故意** 跟 Primary 很接近：CTA 走 Success，把 Primary 留給 logo / 品牌標。
- **Info（blue #316AF6）** —— 中性訊息 callout、資料表中的連結。
- **Warning（yellow #FAC919）** —— 提醒、軟性確認。
- **Danger（red #F64B5C）** —— 破壞性動作、錯誤、負評 badge。
- **Orange（#F77A3B）** —— **僅用於** VIP / 付費方案。不要當成一般輔助色。
- **Purple（#8250FF）** —— **僅用於** AI 生成內容、推薦、智慧建議。不要當成一般輔助色。

**語意 alias。** 元件程式碼裡用這些，不要直接用 raw 色票：`--bg`、`--bg-muted`、`--bg-subtle`、`--surface`、`--fg`、`--fg-2`、`--fg-3`、`--border`、`--border-strong`、`--brand`、`--brand-hover`、`--link`。

**圖片上的深色文字：** `--cl-dark-*`（500→100）。**圖片上的淺色文字：** `--cl-light-*`。一律搭配 40–60% 漸層 scrim —— 文字不要直接放在未處理的影像上。

---

## 圖示

**字體家族。** `symicon-fill` —— 172 個 glyph、單一線重的 filled 風格。幾何形狀對齊 24×24 畫板、2px 視覺筆畫；每個 icon 視覺量約佔 18×18。整套刻意只服務本產品族群：求職動詞為主（`interview-logo`、`interview-luckybag`、`allowance-book`、`atm`、`receipt`、`factory`），不收一般通用 dev / file 圖示。

**尺寸。**

- `14px` —— 跟 body-sm 內文混排
- `16px` —— 跟 body-md 內文混排、輸入框內附件
- `20px` —— 預設 nav-bar 與按鈕 icon
- `24px` —— 卡片標題、空狀態裝飾
- `32px+` —— 主視覺重點，不混排內文

**用法。**

```html
<!-- 偏好寫法 -->
<i class="icon icon-search" aria-hidden="true"></i>

<!-- 純 icon 按鈕一定要加 aria-label -->
<button aria-label="搜尋"><i class="icon icon-search" aria-hidden="true"></i></button>
```

**顏色。** Icon 透過 `currentColor` 繼承。**永遠不要** 在 icon 上寫死 hex —— 跟父層文字色繼承才會跟著主題切換。

**旋轉與翻轉 helper。** `icon-rotate-{90,180,270}`、`icon-flip-x`、`icon-flip-y`。用這些而不是收一份重複 glyph（例如不要另外做 "arrow-left"，旋轉 "arrow-right" 即可）。

完整 class 清單見 `assets/symicon.css`，視覺索引見 `preview/icons.html`。

---

## 間距、圓角與層次

**Space scale**（`--sp-*`）：4、8、12、16、20、24、32、40、48、64。

**圓角。**

- `--radius-xs` (2px) —— 子元件、tag 角
- `--radius-sm` (8px) —— input、小按鈕
- `--radius-md` (12px) —— **卡片與按鈕的預設值**
- `--radius-lg` (16px) —— 主打卡片、modal
- `--radius-xl` (24px) —— hero tile、行銷頁
- `--radius-pill` (999px) —— filter chip、avatar、圓頭按鈕

**層次（陰影）。** 六階（`--shadow-xs` → `--shadow-xxl`）。卡片預設 `--shadow-sm`，hover 升 `--shadow-md`。Modal 用 `--shadow-xl`。**「Ring」不是獨立 token**，而是 `.gl_shadow-*` 疊加 `.gl_border-outer` / `.gl_border-inner`。hadow 跟 1px border —— 二擇一。

---

## 元件

TBD —— 詳見 `preview/components.html`（即將補完）。

規劃中的元件：Button、Input、Select、Checkbox/Radio、Switch、Badge/Chip、Tag、Card、List-Row、Avatar、Empty-State、Toast、Modal/Sheet、Nav-Bar、Tab-Bar、Pagination、Progress、Skeleton。

---

## 產品介面

TBD —— 各產品的小型 UI kit（HTML mockup）：

1. **Interview Prep** —— 題庫、公司頁、面試評論流
2. **Salary Insights** —— 角色薪資範圍、福利分解、匿名評論
3. **Part-Time Match** —— 時薪職缺、班別篩選、津貼 badge

---

## 檔案結構

完整檔案樹狀圖、各區用途與「要改什麼動哪裡」的修改指南，已獨立成 **[STRUCTURE.md](STRUCTURE.md)**（人 + agent 共用、單一真相，避免與本檔漂移）。

---

## 安裝與使用

### 1. 安裝（內部 npm registry）

```bash
# 在 Laravel / Vue / 其他專案根目錄
npm install @yourteam/design-system

# 若用 GitHub Packages，先在專案 .npmrc 加上：
# @yourteam:registry=https://npm.pkg.github.com
```

### 2. Laravel + Vite 整合

**`resources/sass/app.scss`**

```scss
// 方案 A：全部載入（tokens + base + components）
@use "@yourteam/design-system" as *;

// 方案 B：只要 tokens，自己寫 component
@use "@yourteam/design-system/tokens" as *;

// 方案 C：挑選 component
@use "@yourteam/design-system/tokens" as *;
@use "@yourteam/design-system/components/button";
@use "@yourteam/design-system/components/modal";
```

**`vite.config.js`**

```js
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/sass/app.scss", "resources/js/app.js"],
      refresh: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 可選：全域注入 tokens，讓 .vue/.scss 直接用 $cl-green-500
        additionalData: `@use "@yourteam/design-system/tokens" as *;`,
      },
    },
  },
});
```

**Blade 載入字體與圖示（`resources/views/layouts/app.blade.php`）**

```blade
<link rel="stylesheet" href="{{ asset('vendor/design-system/symicon.css') }}">
@vite(['resources/sass/app.scss', 'resources/js/app.js'])
```

發行期把 `node_modules/@yourteam/design-system/assets` 與 `fonts` copy 到 `public/vendor/design-system/` —— 用 Laravel Mix 的 `.copyDirectory()` 或 Vite 的 `vite-plugin-static-copy`。

### 3. Docker 環境

```yaml
# docker-compose.yml 片段
services:
  node:
    image: node:20-alpine
    working_dir: /var/www
    volumes:
      - ./:/var/www
      - ~/.npmrc:/root/.npmrc:ro   # 把本機 registry 認證帶進容器
    command: sh -c "npm ci && npm run dev"
```

CI 環境用 `NPM_TOKEN` 環境變數 + 專案內的 `.npmrc`：

```
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
@yourteam:registry=https://npm.pkg.github.com
always-auth=true
```

### 4. 升級

```bash
npm update @yourteam/design-system
```

每次升版前看 `CHANGELOG.md`；major version bump 代表有 breaking（通常是 token rename 或 component class 改名）。

---

## 開發本系統

### Repo 心智模型

這個 repo 同時有兩個「身份」，理解它們的差別才不會被流程搞混：

```
design-system/             ← 🏭 工廠：製造 SCSS 包本體
├── src/                   ← 主程式（你寫的 SCSS）
├── dist/                  ← npm run build 的產物（.gitignore，不入版控）
├── preview/               ← 視覺對照頁（直接開 HTML，不用 build）
├── package.json           ← 自己就是 @yourteam/design-system
│
└── sandbox/               ← 🏪 客戶：假裝是消費端的測試專案
    ├── demo.html
    ├── src/app.scss       ← 用 @use "@yourteam/design-system" 載入
    └── package.json       ← 把上層用 "file:.." 當 dependency 安裝
```

| | 根目錄 (`design-system/`) | `sandbox/` |
| --- | --- | --- |
| **角色** | 製造這包 SCSS | 假扮成「裝這包來用」的別的專案 |
| **`npm install` 裝什麼** | sass（build 工具） | sass + vite + **這份 design system 本人** |
| **`npm run build` / `dev`** | SCSS → `dist/pi-ds.css` | 啟動 dev server 渲染 `demo.html` |
| **回答的問題** | 「我寫的 SCSS 編得過嗎？」 | 「**別人裝來用** 行不行？」 |

**為什麼需要 sandbox？** 因為「自己編得過」≠「別人裝來能用」。例如：

- `package.json` 的 `exports` 寫錯路徑 → 根目錄 build 不會發現（它直接吃 `src/index.scss`），但 sandbox 一跑就爆，因為 sandbox 寫的是 `@use "@yourteam/design-system"`，這條路徑必須透過 `exports` 解析。
- 加了新 component 但忘了在 `src/index.scss` 加 `@forward` → 根目錄 build 過，sandbox 用不到。
- 改了 `files` 欄位漏掉某個 asset → `npm pack` 後安裝才會發現缺檔。

換句話說：

> **根目錄測「我寫的 SCSS 對不對」**  
> **sandbox 測「我發布的 npm 包對不對」**  
> 兩個都通過才可以放心發版。

---

### 日常開發（最常見的情況）

只改 SCSS 內容（顏色、間距、單一 component 樣式）：

```bash
# 1. 直接開預覽頁看視覺（不用 build）
open preview/tokens.html
open preview/components.html

# 2. 改完跑一次 build，確認沒語法錯
npm run build
npm test                  # smoke test：檢查產出 css 含關鍵 token / class

# 3. 寫 CHANGELOG → commit → push
```

平常不需要動 sandbox。

---

### 改了「對外接口」時要跑 sandbox

下列情況一定要進 `sandbox/` 跑一次：

- ✅ 改了 `package.json` 的 `exports` / `main` / `files`
- ✅ 加新 component（要確認 `src/index.scss` 的 `@forward` 真的把它 export 出去）
- ✅ 加新 token 檔案
- ✅ 動了字體 / icon 等 asset 路徑
- ✅ 發版前最後一道把關

```bash
# 第一次：先在根目錄裝 sass、跑 build
npm install
npm run build && npm test

# 進 sandbox
cd sandbox
npm install               # 透過 file:.. 把上層 link 進來
npm run dev               # 開 http://localhost:5174/demo.html
```

**檢查重點**：

- 顏色對嗎？綠色按鈕真的綠？
- DevTools console 有沒有 `Undefined variable` 警告？
- 點按鈕看 computed style，看到的是 `--cl-green-500` 還是 hex？

---

### 模擬「發 npm」流程（發版前）

`file:..` 用的是 symlink，跟真的 `npm install @yourteam/design-system` 還有一點點差別。發版前最好用 `npm pack` 走一次完整流程：

```bash
# 1. 在根目錄打包
npm pack
# → 產出 yourteam-design-system-0.1.0.tgz

# 2. 換成 tgz 安裝
cd sandbox
npm uninstall @yourteam/design-system
npm install ../yourteam-design-system-0.1.0.tgz
npm run dev
```

如果樣式照常出現 → 真的可以發 npm 了 ✅

```bash
# 3. 正式發版（maintainer 權限）
cd ..                     # 回到 design-system 根目錄
npm version minor         # 自動改 package.json 版本 + 打 git tag
git push --follow-tags
npm publish
```

---

### 編輯規則

- 只改 `src/` 內檔案；`colors_and_type.css` 由 tokens 自動產生（暫時手動同步，之後加 build script）
- 加新 component → `src/components/_xxx.scss` + `src/components/index.scss` 加一行 `@forward` + `preview/components.html` 加範例
- 改 token → 先看 `preview/tokens.html` 評估衝擊面，CHANGELOG 寫清楚
- breaking change（rename / 移除 token、改 class 名）→ 一定要 major bump 並在 CHANGELOG 寫遷移指引

---

### Sandbox 的角色（重要）

`sandbox/` 是「**用真實 npm 流程驗證 DS 的小型測試專案**」，不是 DS 的一部分，也不是 demo 站。它存在的唯一目的：當下游專案 `npm install @yourteam/design-system` 之後，import 路徑、`@use` 子路徑、字型 path 變數、tokens 是否都串得起來。

**class 名以 `src/components/` 為唯一真相**。`sandbox/demo.html` 用的所有 `.gl_*` class 都必須能在 `src/components/_*.scss` 裡找到對應定義 —— sandbox 不能自己發明 class（例如 `.gl_field`、`.gl_input`），那會掩蓋 DS 真正缺的東西。

**改 sandbox 前**：先 `grep -r "\.gl_xxx" src/components/` 確認 class 存在，或開對應的 `_*.scss` 看清楚結構（例如 `.gl_form-control` 必須包在 `.gl_form-group` 裡，`.gl_checkbox-layout` 是 wrapper class 不是 input 自己）。

**如果發現 sandbox 需要某個 class 但 DS 沒有**：那是 DS 缺的，去 `src/components/` 補上、bump minor，不要在 sandbox 私下加樣式。

---

## 字型管理（Fonts）

字型是 design system 裡最容易出問題的部分 —— **檔案在哪、SCSS 怎麼引用、下游專案怎麼覆寫路徑** 三件事一旦不一致就會 404 / FOUT / build 失敗。這節是唯一的真相來源，所有字型相關的決策都從這裡開始。

### 架構

```
fonts/                     ← 字型原始檔（woff / woff2）
src/base/_fonts.scss       ← @font-face 宣告，路徑由 $font-path 控制
src/tokens/_typography.scss ← --font-sans / --font-display CSS variable
```

`_fonts.scss` 用 `$font-path !default` 留了**覆寫鉤子**：

```scss
$font-path: "../../fonts" !default;

@font-face {
  font-family: "Inter";
  src: url("#{$font-path}/Inter-Regular.woff2") format("woff2"),
       url("#{$font-path}/Inter-Regular.woff") format("woff");
}
```

下游專案 `@use` 時可以這樣覆寫：

```scss
@use "@yourteam/design-system/base/fonts" with (
  $font-path: "/fonts"      // ⭐ 你的專案實際字型放哪
);
@use "@yourteam/design-system" as *;
```

> **重要**：`with(...)` 必須出現在 base/fonts **第一次** 被 @use 之前。所以前面要先單獨 `@use base/fonts with(...)`，再 `@use "@yourteam/design-system"`。

### 下游專案常見 `$font-path` 設定

| 場景 | `$font-path` 設成 | 配套 |
|---|---|---|
| Laravel + Vite，字型放 `public/fonts/` | `"/fonts"` | 把 `node_modules/@yourteam/design-system/fonts/*` copy 到 `public/fonts/`（用 `vite-plugin-static-copy`） |
| Laravel + Vite，吃 `node_modules` | `"~@yourteam/design-system/fonts"` | Vite alias 加 `~` 規則 |
| 純 SPA / 純 Vite | `"/fonts"` + `publicDir` 指向字型資料夾 | 見 `sandbox/vite.config.js` |
| CDN | `"https://cdn.example.com/fonts"` | CDN 上備齊所有字重 |

### 場景 A：字型版本升級（例如 Inter v3 → v4）

不改 family、不改檔名、只換內容 → **patch bump**。

```bash
# 1. 把新檔丟進 fonts/，覆蓋舊的
cp ~/Downloads/Inter-Regular-v4.woff2 fonts/Inter-Regular.woff2
cp ~/Downloads/Inter-Regular-v4.woff  fonts/Inter-Regular.woff
# Inter-SemiBold 同理

# 2. sandbox 跑一次確認還能載
cd sandbox && npm run dev
# 開 http://localhost:5174/demo.html，devtools Network 確認字型 200

# 3. 寫 CHANGELOG（patch 區塊）
#    - chore(fonts): bump Inter to v4

# 4. 發版
cd ..
npm version patch          # 0.1.0 → 0.1.1
git push --follow-tags
npm publish
```

下游：`npm update @yourteam/design-system` → 完成。

### 場景 B：替換字型（例如 Inter → 思源黑體）

改 family / 檔名 / token → **breaking change，major bump**。

```bash
# 1. fonts/ 換新檔
rm fonts/Inter-*
cp ~/Downloads/SourceHanSans-Regular.woff2 fonts/
cp ~/Downloads/SourceHanSans-Bold.woff2    fonts/

# 2. 改 src/base/_fonts.scss 的 @font-face：
#    - font-family: "Source Han Sans TC"
#    - src 檔名改 SourceHanSans-Regular.woff2
#    - 字重對映確認（Regular = 400, Bold = 700, ...）

# 3. 改 src/tokens/_typography.scss：
#    --font-sans: "Source Han Sans TC", "IBM Plex Sans TC", system-ui, ...

# 4. sandbox 跑一次：cd sandbox && npm run dev
#    - 確認字型載入
#    - 對照 preview/components.html 看視覺有無走鐘（中文寬度可能不同）

# 5. 寫 CHANGELOG（major 區塊，含 BREAKING）
#    - BREAKING(fonts): Inter → Source Han Sans TC
#    - 下游需要：(a) npm update (b) public/fonts/ 換成新檔 (c) 對照 layout 是否需調整

# 6. major bump
npm version major          # 0.1.x → 1.0.0
git push --follow-tags
npm publish
```

下游升級：看 CHANGELOG → 確認影響範圍 → `npm install @yourteam/design-system@1` → 重新 copy fonts 到 public。

### 場景 C：增加新字重（例如多載 Inter Bold 700）

不改現有 token，只是多 export 一個 face → **minor bump**。

```bash
# 1. fonts/ 加 Inter-Bold.woff2 / .woff
cp ~/Downloads/Inter-Bold.* fonts/

# 2. src/base/_fonts.scss 加新的 @font-face：
#    @font-face {
#      font-family: "Inter";
#      font-weight: 700;
#      src: url("#{$font-path}/Inter-Bold.woff2") format("woff2"), ...;
#    }

# 3. 在某個 token / component 用到（例如 fz-headline-xl 改 font-weight: 700）
#    或單純讓使用者可以自由用 font-weight: 700

# 4. sandbox 確認
# 5. 寫 CHANGELOG（minor 區塊）
#    - feat(fonts): add Inter Bold 700

# 6. minor bump
npm version minor          # 0.1.0 → 0.2.0
git push --follow-tags
npm publish
```

### 場景 D：下游專案要用自己的字型（不動 DS 本人）

例如某產品想用 Noto Sans，不想改 design system。下游自己處理：

```scss
// 該專案的 app.scss

// 不要 @use base/fonts —— 改用方案 B 只載 tokens + components（不含 base/fonts）
@use "@yourteam/design-system/tokens" as *;
@use "@yourteam/design-system/components" as *;

// 自己宣告 @font-face
@font-face {
  font-family: "Noto Sans TC";
  src: url("/fonts/NotoSansTC-Regular.woff2") format("woff2");
}

// 覆寫 token
:root {
  --font-sans: "Noto Sans TC", system-ui, sans-serif;
}
```

DS 不用發新版，下游自管字型。

### 給 AI agent 的提醒

- ❌ **不要** 在 component 檔裡寫 `@import url('https://fonts.googleapis.com/...')`
- ❌ **不要** 在 component 檔裡再加 `@font-face`
- ✅ 字型只在 `src/base/_fonts.scss` 一個地方宣告
- ✅ 引用字型一律用 `$font-sans` / `$font-display` / `$font-icon` 變數，不要寫 `font-family: "Inter"`

---

## 授權 / 引用

- **Inter** —— SIL Open Font License 1.1，© Rasmus Andersson。
- **IBM Plex Sans TC** —— SIL Open Font License 1.1，© IBM Corp。
- **symicon-fill** —— 內部資產，© Pi。

## SKILL.md

給在這套系統裡工作的 agent 用的子文件（程式碼慣例、命名規則、什麼時候用哪個 token）會放在 `SKILL.md`，等元件補完後上線。
