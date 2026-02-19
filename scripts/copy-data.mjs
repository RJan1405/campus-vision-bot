#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "data");
const publicDataDir = path.join(root, "public", "data");

if (!fs.existsSync(dataDir)) {
  console.warn("No data folder found at", dataDir);
  process.exit(0);
}

if (!fs.existsSync(publicDataDir)) {
  fs.mkdirSync(publicDataDir, { recursive: true });
}

const files = fs.readdirSync(dataDir);
let copied = 0;
for (const f of files) {
  const src = path.join(dataDir, f);
  if (fs.statSync(src).isFile()) {
    fs.copyFileSync(src, path.join(publicDataDir, f));
    copied++;
  }
}
console.log("Copied", copied, "file(s) from data/ to public/data/");
