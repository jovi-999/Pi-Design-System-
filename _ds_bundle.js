/* @ds-bundle: {"format":3,"namespace":"PiDesignSystem_daacb5","components":[],"sourceHashes":{"sandbox/vite.config.js":"43a4835b5546"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PiDesignSystem_daacb5 = window.PiDesignSystem_daacb5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// sandbox/vite.config.js
try { (() => {
// sandbox/vite.config.js
// 純物件設定（不 import vite / node 內建模組）——避免被 design-system
// bundler 當成元件來源時，因 npm import / import.meta 而報錯。
// Vite 接受相對路徑：fs.allow 的 ".." 與 publicDir 都相對於本檔所在目錄。
try {
  void {
    root: ".",
    server: {
      port: 5174,
      open: "/demo.html",
      // 允許 Vite serve 上層 repo 的檔案（fonts/、assets/ 等）
      fs: {
        allow: [".."]
      }
    },
    build: {
      rollupOptions: {
        input: {
          demo: "demo.html"
        }
      }
    },
    // 把上層 repo 的 fonts/ 掛到 dev server 的 / 路徑
    publicDir: "../fonts",
    resolve: {
      alias: {
        "/fonts": "../fonts"
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    }
  };
} catch {}
})(); } catch (e) { __ds_ns.__errors.push({ path: "sandbox/vite.config.js", error: String((e && e.message) || e) }); }

})();
