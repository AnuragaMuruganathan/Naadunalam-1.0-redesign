#!/usr/bin/env node
/**
 * Builds the deployable images in /public from the full-size originals.
 *
 * Why: the site ships with `images: { unoptimized: true }` so it never uses
 * Vercel's Image Optimization quota. Next.js then serves each file as-is, so
 * every file must already be the right size and format. This script does that
 * once, locally.
 *
 *   node scripts/optimize-images.mjs              (originals in ../source-images)
 *   IMG_SRC=/path/to/originals node scripts/optimize-images.mjs
 *
 * What it does:
 *   1. Scans src/ for every "/images/..." and "/brand/..." path the code uses.
 *   2. Finds the original for each one (same folder and name, any extension).
 *   3. Resizes it to the widest slot it fills (measured at 390, 1024 and
 *      1920px viewports at 2x DPR, see WIDTHS) and encodes WebP.
 *   4. Rebuilds public/images and public/brand with only those files, so
 *      unused images and duplicates never reach the deploy.
 *
 * The originals stay outside the repo and are never deployed.
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(ROOT, "package.json"));
const sharp = require("sharp"); // ships with Next.js

const SRC_DIR = path.join(ROOT, "src");
const PUBLIC = path.join(ROOT, "public");
const ORIGINALS = path.resolve(ROOT, process.env.IMG_SRC || "../source-images");
const OUT_DIRS = ["images", "brand"];
const EXTS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"];

/* Photo widths: the widest rendered slot x 2 DPR x 1.05, never below 1080px
   (a phone at 3x), rounded to 40px and never upscaled. Re-measure if a
   layout changes how big a photo is shown. */
const WIDTHS = {
  "photos/hero-family": 1840,
  "photos/palmyra-grove": 1720,
  "photos/gen1-parents": 1720,
  "photos/gen2-paati-grandchild": 1720,
  "photos/gen6-hands": 1720,
  "photos/gen7-palmyra-sun": 1720,
  "photos/gen3-paati": 1680,
  "photos/gen3-thatha": 1680,
  "photos/gen5-paati": 1680,
  "photos/lake-dusk": 1520,
  "photos/paati-red-wall": 1480,
  "photos/grandpa-grandson": 1440,
  "photos/el-aakaayam": 1320,
  "photos/el-nilam": 1320,
  "photos/el-neruppu": 1240,
  "photos/el-kaatru": 1240,
  "photos/gen4-paati": 1120,
  "photos/el-neer": 1080,
  "photos/gen4-thatha": 1080,
  "photos/gen5-thatha": 1080,
  "photos/kolam-hands": 1080,
  // Posters carry small text and a payment QR: keep full size, high quality.
  "site/thai-pongal-combo-999": Infinity,
  "site/thai-pongal-combo-1999": Infinity,
  "site/nn-hero-cutout-clean-800": Infinity,
  "site/Aval-Vagaigal": 960,
};

/** Encoding rule for one asset, keyed by its path under /public (no extension). */
function ruleFor(key) {
  if (key === "brand/logo") return { width: 224, out: "webp", quality: 90 }; // shown at 112px
  if (key === "brand/icon") return { width: 96, out: "png", from: "brand/logo" }; // favicon
  if (key.startsWith("site/thai-pongal")) return { width: WIDTHS[key], out: "webp", quality: 88 };
  if (key in WIDTHS) return { width: WIDTHS[key], out: "webp", quality: key.startsWith("photos/") ? 74 : 80 };
  if (key.startsWith("photos/")) return { width: 1600, out: "webp", quality: 74 };
  if (key.startsWith("products/")) return { width: 800, out: "webp", quality: 78 }; // biggest slot ~784px
  if (key.startsWith("site/")) return { width: 640, out: "webp", quality: 78 }; // category tiles ~632px
  return { width: 1600, out: "webp", quality: 78 };
}

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// 1. Every asset path the code references.
const refs = new Set();
for (const file of walk(SRC_DIR).filter((f) => /\.(tsx?|jsx?|css|mdx?)$/.test(f))) {
  const text = fs.readFileSync(file, "utf8");
  for (const m of text.matchAll(/\/(images|brand)\/[\w./-]+?\.(?:webp|png|jpe?g|avif|svg)/g)) refs.add(m[0]);
}

// 2. Map each to an original.
function findOriginal(key) {
  // "brand/logo" lives at <originals>/brand/logo.*, "photos/x" at <originals>/images/photos/x.*
  const base = key.startsWith("brand/") ? path.join(ORIGINALS, key) : path.join(ORIGINALS, "images", key);
  for (const ext of EXTS) if (fs.existsSync(base + ext)) return base + ext;
  return null;
}

const jobs = [];
const missing = [];
for (const ref of [...refs].sort()) {
  const rel = ref.slice(1); // "images/photos/x.webp" | "brand/logo.webp"
  const ext = path.extname(rel);
  const top = rel.split("/")[0];
  const key = (top === "images" ? rel.slice("images/".length) : rel).slice(0, -ext.length);
  const rule = ruleFor(key);
  if ("." + rule.out !== ext) {
    missing.push(`${ref} (code should reference ${rel.slice(0, -ext.length)}.${rule.out})`);
    continue;
  }
  const original = findOriginal(rule.from ?? key);
  if (!original) { missing.push(`${ref} (no original found in ${ORIGINALS})`); continue; }
  jobs.push({ ref, original, dest: path.join(PUBLIC, rel), rule });
}

if (missing.length) {
  console.error("Cannot build these references:\n  " + missing.join("\n  "));
  process.exit(1);
}

// 3. Rebuild the output folders from scratch (removes unused and stale files).
for (const d of OUT_DIRS) fs.rmSync(path.join(PUBLIC, d), { recursive: true, force: true });

let before = 0, after = 0;
for (const { ref, original, dest, rule } of jobs) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const meta = await sharp(original).metadata();
  const width = Math.min(meta.width, rule.width);
  let img = sharp(original).rotate().resize({ width, withoutEnlargement: true });
  img = rule.out === "png"
    ? img.png({ palette: true, compressionLevel: 9, effort: 10 })
    : img.webp({ quality: rule.quality, effort: 6, smartSubsample: true, alphaQuality: 90 });
  await img.toFile(dest);
  const a = fs.statSync(original).size, b = fs.statSync(dest).size;
  before += a; after += b;
  console.log(`${(b / 1024).toFixed(0).padStart(5)} KB  ${String(width).padStart(4)}w  ${ref}  (was ${(a / 1024).toFixed(0)} KB)`);
}

console.log(`\n${jobs.length} images: ${(before / 1048576).toFixed(1)} MB of originals -> ${(after / 1048576).toFixed(2)} MB in /public`);
