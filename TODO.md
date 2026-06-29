# TODO — README 對齊真實散佈模型（去 npm 化）

## 背景
README 把 repo 當「要發 npm 的套件」寫，但實際：
- `package.json` `name` 仍是 placeholder `@yourteam/design-system`、`private: true`（禁發）
- `sandbox/` 目錄不存在
- 真實模型（STRUCTURE.md §3）：下游 7 專案 vendored `.scss` + `@use` 選擇性引用 `src/`，非 npm install

## 待辦
- [ ] 1. 修 line 3 開頭多餘句號 `。這個`
- [ ] 2. 重寫「安裝與使用」(L162–252)：npm install/registry/Docker/npm pack/publish → vendored `@use` 引用 src/ 真實流程
- [ ] 3. 「開發本系統」去 sandbox：刪 Repo 心智模型的 sandbox 區塊、「改了對外接口時要跑 sandbox」、「模擬發 npm」、「Sandbox 的角色」整段
- [ ] 4. 字型 4 場景(A/B/C/D)：把 `npm version + npm publish` 結尾改成「改 SCSS → build → 通知下游更新 vendored 檔」
- [ ] 5. 保留全部設計規範段落（視覺基礎/字體/色彩/圖示/間距/元件）不動
- [ ] 6. build + test 確認沒壞；commit

## Review
README 去 npm 化完成（repo 定位 = 前端切版對照用，不發 npm）：
- 刪「視覺基礎」整段 + 目錄重編號
- 開頭/導覽改述用途為「本機預覽對照元件」
- 「安裝與使用」重寫：clone → npm install（只裝 build 工具）→ npm run dev 看預覽；移除 npm registry / GitHub Packages / .npmrc / Docker / npm pack / publish
- 「開發本系統」移除 sandbox 心智模型 / 跑 sandbox / 模擬發 npm / Sandbox 角色四段，改為 Repo 結構 + 日常開發 + 編輯規則
- 字型 4 場景的 npm version/publish 流程 → 精簡成「改 fonts/ + _fonts.scss → npm run dev 確認 → 寫 CHANGELOG」表格
- build + smoke test 通過
未動：色彩 / 字體 / 圖示 / 間距 設計規範段落。
