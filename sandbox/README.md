# Pi DS · Sandbox

模擬「真實專案怎麼用這個 design system」。用來驗證：

1. npm install 路徑對不對
2. `@use "@yourteam/design-system"` 解得開
3. SCSS 變數、`.gl_*` class、tokens 都能用
4. Vite 編譯沒有 warning / error

---

## 跑起來

```bash
# 在 design-system 根目錄先確定 src/ 都建好
cd /path/to/design-system

# 安裝 design-system 自己的 dev deps（為了能 sass build）
npm install

# 進入 sandbox
cd sandbox
npm install
npm run dev
```

預設會在 http://localhost:5174/demo.html 打開。

頁面上應該看到：
- 🟢 各色 buttons（basic / success / info / warning / danger / purple）
- 🟢 outline / ghost / secondary 變體
- 🟢 5 種 size（XS / SM / MD / LG / XL）
- 🟢 alerts × 4
- 🟢 form 元件
- 🟢 自訂 card 用 DS token (`$cl-green-500`, `$sp-4`)

---

## 如何驗證 npm 包真的能裝

```bash
# 1. 在 design-system 根目錄
npm pack
# → 產出 yourteam-design-system-0.1.0.tgz

# 2. 換成 tgz 安裝
cd sandbox
npm uninstall @yourteam/design-system
npm install ../yourteam-design-system-0.1.0.tgz
npm run dev
```

如果樣式還在 → 真的可以發 npm 了。

---

## Trouble-shooting

| 症狀 | 原因 | 解法 |
|---|---|---|
| `Can't find stylesheet to import @yourteam/design-system` | sandbox 沒 link 到 `../` | `cd sandbox && npm install` |
| 字型沒出來（沒有 Open Sans） | 還沒處理 fonts/ 路徑 | 暫時忽略，font fallback 為 system |
| `Undefined variable $foo` | DS 該變數沒 export | 回 `src/tokens/index.scss` 加 `@forward` |
| Vite build 過但畫面空白 | `<link href>` 路徑錯 | 確認 `demo.html` 連的是 `./src/app.scss` |
