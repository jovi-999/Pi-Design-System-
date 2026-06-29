# Pi Design System

這個 repo 是 **token 與 component 的唯一真相來源**，目前用途：**給前端切版時對照目前的元件內容與樣式**。本機跑預覽頁即可瀏覽，不發布到 npm。

---

## 對象與導覽

本 README 給**前端 / 維護者**（設計原則、本機預覽、開發與字型管理）。其他文件分工：

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

1. [字體排版](#字體排版)
2. [色彩](#色彩)
3. [圖示](#圖示)
4. [間距、圓角與層次](#間距圓角與層次)
5. [元件](#元件)
6. [產品介面](#產品介面)
7. [檔案結構](#檔案結構)

---

## 字體排版

**主字體：** Inter（variable，預設載 400 / 600；700 視需要載入）。
**TC fallback：** IBM Plex Sans TC —— x-height 跟 Inter 接近，漢字與英文視覺重量相當。
**Display（僅數字用）：** D-DIN / D-DIN Condensed —— 只用於統計、價格、面試次數、薪資範圍。**永遠不要** 用 display 設定內文。
**圖示：** `symicon`（自家 icon font，172 個 glyph，見 [圖示](#圖示)）。

**Scale。** 詳見 `src/tokens/_typography.scss`、預覽 `type` 對照頁。三大家族：

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

這個 repo **不發布到 npm**。前端切版時用法：clone 下來，本機跑預覽頁，對照元件樣式與 class 名稱即可。

### 1. 啟動預覽

```bash
git clone <repo-url>
cd Pi-Design-System
npm install            # 只裝 sass / vite 等 build 工具
npm run dev            # 啟動預覽，開瀏覽器看左側目錄 + 各元件對照頁
```

預覽頁吃 `src/index.scss`，改 SCSS 後 HMR 即時更新，不用先 build。

### 2. 切版怎麼對照

- **看元件樣式**：`npm run dev` 後，左側目錄點各元件（button / form / alert…），右側 iframe 即是該元件實際樣式。
- **查 class 名稱**：class 前綴 `gl_`，真相在 `src/components/_<元件>.scss`；Figma 名稱 ↔ class 對照見 [docs/ai-guide.md](docs/ai-guide.md)。
- **查 token / 色票 / 圖示**：foundation 對照頁（color / type / shadow / tokens / icons）同樣在預覽左側目錄。
- **禁自創 token / class**：切版只能用設計系統已存在的 token / class，不確定先 `grep src/` 或讀 `src/tokens`、`src/components` 確認。

### 3. 要拿 CSS 產物時

需要編譯後的 CSS（例如貼進其他頁面比對）：

```bash
npm run build          # 產出 dist/pi-ds.css（expanded）
npm run build:min      # 產出 dist/pi-ds.min.css（compressed）
```

`dist/` 是 build 產物（`.gitignore`，不入版控）。

---

## 開發本系統

### Repo 結構

```
Pi-Design-System/
├── src/                   ← 主程式（你寫的 SCSS，單一真相源）
│   ├── tokens/            ← 設計 token（色 / 字 / 間距 / 圓角 / 陰影…）
│   ├── base/              ← reset / fonts / utilities
│   └── components/        ← 元件，每元件一檔，class 前綴 gl_
├── preview/               ← 視覺對照頁（npm run dev 看，不用 build）
├── dist/                  ← npm run build 的產物（.gitignore，不入版控）
└── assets/ fonts/         ← icon 字體 / 字型檔
```

完整檔案地圖見 [STRUCTURE.md](STRUCTURE.md)。

### 日常開發

改 SCSS（顏色、間距、單一元件樣式）：

```bash
# 1. 開預覽頁即時看視覺（HMR，不用 build）
npm run dev

# 2. 改完跑一次 build + smoke test，確認沒語法錯
npm run build
npm test                  # 檢查產出 css 含關鍵 token / class

# 3. 寫 CHANGELOG → commit → push
```

### 編輯規則

- 只改 `src/` 內檔案；CSS 一律由 `npm run build` 從 SCSS 產出，不手寫 CSS。
- 加新元件 → `src/components/_xxx.scss` + `src/components/index.scss` 加一行 `@forward` + `preview/` 加對照頁並在 `preview/index.html` 左目錄登記。
- 改 token → 先看 `preview/tokens.html` 評估衝擊面，CHANGELOG 寫清楚。
- **禁自創 token / class**：不確定先 `grep src/` 或讀 `src/tokens`、`src/components` 確認，絕不憑記憶發明。
- rename / 移除 token、改 class 名屬 breaking change → CHANGELOG 寫清楚並同步所有引用處（preview、docs、README）。

---

## 字型管理（Fonts）

字型是 design system 裡最容易出問題的部分 —— **檔案在哪、SCSS 怎麼引用、路徑怎麼解析** 一旦不一致就會 404 / FOUT / build 失敗。這節是唯一的真相來源，所有字型相關的決策都從這裡開始。

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

`$font-path` 用 `!default` 留了覆寫鉤子（預設 `"../../fonts"`，相對 `src/base/`）。預覽頁吃這個預設值即可，不用改。

### 換 / 升級字型怎麼做

| 情況 | 動哪裡 |
|---|---|
| 字型版本升級（family / 檔名不變，只換內容） | 把新檔覆蓋進 `fonts/`，`npm run dev` 確認還能載 |
| 加新字重（例如多載 Inter Bold 700） | `fonts/` 加檔 → `src/base/_fonts.scss` 加 `@font-face`（`font-weight: 700`）|
| 替換字型（改 family / token） | `fonts/` 換檔 → 改 `src/base/_fonts.scss` 的 `@font-face` → 改 `src/tokens/_typography.scss` 的 `--font-sans` → `preview/` 對照視覺有無走鐘（中文寬度可能不同）|

改完一律 `npm run dev` 在預覽頁確認字型載入（DevTools Network 看字型 200），並寫 CHANGELOG。

### 給 AI agent 的提醒

- ❌ **不要** 在 component 檔裡寫 `@import url('https://fonts.googleapis.com/...')`
- ❌ **不要** 在 component 檔裡再加 `@font-face`
- ✅ 字型只在 `src/base/_fonts.scss` 一個地方宣告
- ✅ 引用字型一律用 `$font-sans` / `$font-display` / `$font-icon` 變數，不要寫 `font-family: "Inter"`

---

## icon 字型（symicon）維護

icon 字型跟文字字型機制不同：它**不走 `src/base/_fonts.scss`**，而是獨立在 `assets/symicon.css` —— 一個檔同時管 `@font-face` 與每個 `.icon-*` 的 codepoint（`content: "\eXXX"`）。版本號直接寫進**檔名**（`symicon-6.4s.woff2`）當作 cache-bust，升級時連檔名一起換。

```
fonts/symicon-6.4s.woff2 / .woff   ← icon 字型本體（檔名帶版本號）
assets/symicon.css                 ← @font-face（url 指向 ../fonts/）+ .icon-* codepoint
assets/icon-cp-map.json            ← icon 名稱 ↔ codepoint 對應
assets/icon-names.json             ← icon 名稱清單
assets/icons-preview.html          ← glyph 視覺索引
```

> ⚠️ **codepoint 對應**：icon 字型工具（IcoMoon / Fontello）匯出時附 `selection.json`（每個 icon 的 codepoint）。**glyph 順序一變，所有 `content: "\eXXX"` 都要重新對應** —— 升級前務必拿到對照表確認。

### 情境 1：在本預覽專案升級 icon 字型

本 repo 用 Vite 預覽。`assets/` 與 `fonts/` 是靜態檔，Vite 直接服務，**不用改 `vite.config`**。

```bash
# 1. 放新字型檔進 fonts/，檔名帶新版本號（如 6.4s → 7.0s），舊檔先留著
cp ~/Downloads/symicon-7.0s.woff2 fonts/
cp ~/Downloads/symicon-7.0s.woff  fonts/

# 2. 改 assets/symicon.css：
#    - 檔頭註解版本號 symicon-6.4s → symicon-7.0s
#    - @font-face 的 src url：../fonts/symicon-7.0s.woff2 / .woff
#    - 若 glyph 順序變了 → 依新 selection.json 重新對應所有 .icon-* 的 content
#      （連帶更新 assets/icon-cp-map.json、icon-names.json、icons-preview.html）

# 3. 啟動預覽驗證
npm run dev
#    開 icons 對照頁 / 各元件頁，確認 icon 正常顯示
#    重點檢查有用到 icon 的元件：form 的 valid/invalid、loading、alert、callout

# 4. 全部 OK → 刪舊 symicon-6.4s.*，寫 CHANGELOG
```

### 情境 2：在其他專案（Vite）實際使用

下游專案不 link 整包，而是**把 icon 字型檔與 class 表 vendored 進自己專案**。典型 Vite 專案做法：

**a. 放字型檔**：把 `fonts/symicon-X.woff2 / .woff` copy 到該專案 `public/fonts/`（Vite 對 `public/` 靜態服務，不經打包）。

**b. 宣告 `@font-face`**（該專案某支 scss，url 用絕對路徑指向 `public/`）：

```scss
@font-face {
  font-family: "symicon";
  src: url("/fonts/symicon-X.woff2") format("woff2"),
       url("/fonts/symicon-X.woff")  format("woff");
  font-display: swap;
}
```

**c. icon class 表**：把 `assets/symicon.css` 的 `.icon` / `.icon-*` 規則 vendored 進該專案（或只挑用到的 glyph），class 名與 codepoint 以本 repo 的 `symicon.css` 為唯一真相。

**d. （建議）preload 首屏會用到的 icon 字型**，降 FOUT：

```html
<link rel="preload" href="/fonts/symicon-X.woff2" as="font" type="font/woff2" crossorigin>
```

**e. 該專案升級 icon 版本流程**：

```
1. 新 symicon-N.woff2/woff 放 public/fonts/（新版本號檔名，舊檔先留）
2. 改 @font-face 的 src url → 新檔名
3. 改 preload href → 新檔名
4. 若 glyph 順序變 → 依新 selection.json 重對 content codepoint
   ↳ 連動檢查寫死 codepoint 的地方：表單 valid/invalid feedback icon、
     loading 動畫 icon、layout icon
5. npm run build / dev 驗證 → icon 全正常 → 刪舊檔
```

> 兩種情境共通鐵則：**版本號寫進檔名**（cache-bust）、**舊檔驗證通過才刪**、**glyph 順序變動務必重對 codepoint**。

---

## 授權 / 引用

- **Inter** —— SIL Open Font License 1.1，© Rasmus Andersson。
- **IBM Plex Sans TC** —— SIL Open Font License 1.1，© IBM Corp。
- **symicon-fill** —— 內部資產，© Pi。

## SKILL.md

給在這套系統裡工作的 agent 用的子文件（程式碼慣例、命名規則、什麼時候用哪個 token）會放在 `SKILL.md`，等元件補完後上線。
