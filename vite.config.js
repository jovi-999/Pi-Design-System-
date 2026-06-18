// ============================================================
// Pi DS — Vite 設定（僅供本 repo 開發 / 預覽用）
//
// 用途：改 src/**/*.scss → 預覽頁即時 HMR。
// 預覽頁直接吃 src/index.scss（單一真相源），不再依賴
// 手動維護的 colors_and_type.css，消除漂移。
//
// 注意：此設定「不」改變散佈方式。下游 7 個專案仍透過
// vendored .scss + @use 選擇性引用 src/，Vite 不進下游。
// ============================================================

export default {
  // repo 根當 root：src/、fonts/、assets/、preview/ 全在底下，
  // 預覽頁用絕對路徑 /src/index.scss 即可解到，免 fs.allow hack。
  root: ".",

  server: {
    port: 5173,
    open: "/preview/color.html", // 啟動預設開色彩對照頁
  },

  css: {
    preprocessorOptions: {
      // 用 modern-compiler API，與 sandbox 一致，避免棄用警告。
      scss: { api: "modern-compiler" },
    },
  },

  build: {
    // 預覽頁的靜態輸出（選用）：6 張對照頁各自為 input。
    outDir: "dist-preview",
    rollupOptions: {
      input: {
        color: "preview/color.html",
        type: "preview/type.html",
        components: "preview/components.html",
        icons: "preview/icons.html",
        shadow: "preview/shadow.html",
        tokens: "preview/tokens.html",
      },
    },
  },
};
