// Build smoke test —— 確認 sass build 後產出 css 有預期內容
import fs from "node:fs";

const css = fs.readFileSync("dist/pi-ds.css", "utf8");
const expectations = [
  ["green-500 token",    "--cl-green-500"],
  ["red-500 token",      "--cl-red-500"],
  ["semantic alias",     "--brand"],
  ["button class",       ".gl_btn"],
  ["modal class",        ".gl_modal"],
  ["alert class",        ".gl_alert"],
  ["body fz class",      ".fz-body-md"],
  ["legacy h1 alias",    ".fz-h1"],
];

let pass = 0, fail = 0;
for (const [label, needle] of expectations) {
  const ok = css.includes(needle);
  console.log(`  ${ok ? "✓" : "✗"}  ${label.padEnd(22)} ${needle}`);
  ok ? pass++ : fail++;
}

const sizeKb = (css.length / 1024).toFixed(1);
console.log(`\nResult: ${pass}/${pass + fail} checks passed · ${sizeKb} KB`);

if (fail > 0) process.exit(1);
