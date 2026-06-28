#!/usr/bin/env node

/*
======================================================

create-go.js

i.suwa.info/go/ リダイレクトHTML自動生成

Usage
-----

cd go

node create-go.js arashio2026 "https://shimosuwa.info/pages/荒汐部屋下諏訪合宿2026/"

Example
-------

node create-go.js arashio2026 "https://shimosuwa.info/pages/荒汐部屋下諏訪合宿2026/"

node create-go.js suwako8peaks2026 "https://shimosuwa.info/pages/suwako8peaks2026/"

node create-go.js takabocchi "https://shimosuwa.info/pages/高ボッチ/"

node create-go.js yashima "https://shimosuwa.info/pages/八島湿原/"

node create-go.js wine "https://suwa.info/pages/八ヶ岳西麓ワインバレー/"

node create-go.js profile "https://renya.com/"

Output
------

go/<slug>/index.html

Template
--------

go-template.html

Google Analytics
----------------

URLから自動判定

shimosuwa.info → G-JDE490GKVT
suwa.info      → G-6XFB1XKL4T
renya.com      → G-5RHMQ2CTBP

======================================================
*/

const fs = require("fs");
const path = require("path");

const [slug, url] = process.argv.slice(2);

if (!slug || !url) {
    console.log("");
    console.log("Usage:");
    console.log("  node create-go.js <slug> <url>");
    console.log("");
    process.exit(1);
}

const GA = {
    "shimosuwa.info": "G-JDE490GKVT",
    "suwa.info":      "G-6XFB1XKL4T",
    "renya.com":      "G-5RHMQ2CTBP"
};

// --------------------------------------------------
// URLからドメイン取得
// --------------------------------------------------

let hostname;

try {
    hostname = new URL(url).hostname.replace(/^www\./, "");
}
catch {
    console.error("");
    console.error("Error: Invalid URL");
    console.error(url);
    console.error("");
    process.exit(1);
}

const gaid = GA[hostname];

if (!gaid) {
    console.error("");
    console.error("Error: Unsupported domain");
    console.error(hostname);
    console.error("");
    process.exit(1);
}

// --------------------------------------------------
// テンプレート
// --------------------------------------------------

const goDir = __dirname;
const templateFile = path.join(goDir, "go-template.html");

if (!fs.existsSync(templateFile)) {
    console.error("");
    console.error("Error: go-template.html not found");
    console.error(templateFile);
    console.error("");
    process.exit(1);
}

// --------------------------------------------------
// 出力先
// --------------------------------------------------

const outDir = path.join(goDir, slug);
const outFile = path.join(outDir, "index.html");

if (fs.existsSync(outDir)) {
    console.error("");
    console.error("Error: Directory already exists");
    console.error(outDir);
    console.error("");
    process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

// --------------------------------------------------
// HTML読込
// --------------------------------------------------

let html = fs.readFileSync(templateFile, "utf8");

// --------------------------------------------------
// URL置換（4か所）
// --------------------------------------------------

html = html.replace(
    /https:\/\/shimosuwa\.info\/pages\/ページ名\//g,
    url
);

// --------------------------------------------------
// Google Analytics ID置換（2か所）
// --------------------------------------------------

html = html.replace(
    /G-JDE490GKVT/g,
    gaid
);

// --------------------------------------------------
// 保存
// --------------------------------------------------

fs.writeFileSync(outFile, html, "utf8");

// --------------------------------------------------
// 完了
// --------------------------------------------------

console.log("");
console.log("Created successfully!");
console.log("");
console.log("Output   :", outFile);
console.log("Slug     :", slug);
console.log("Site     :", hostname);
console.log("GA4      :", gaid);
console.log("Redirect :", url);
console.log("");
