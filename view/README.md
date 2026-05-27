# view/ README

shimosuwa.info 用の軽量地図システム。

Leaflet + OpenStreetMap + GeoJSON + data.js による静的構成。

## 概要

* HTML側 = 地図ビュー
* GeoJSON = 境界線
* -data.js = ポイントデータ
* URLパラメータ = 表示制御

という構成。

サーバー側処理なしで動作する。

---

# ファイル構成

```text
view/
├── shimosuwa.html
├── suwa6.html
├── shimosuwa.geojson
├── suwa6.geojson
├── map-data.js
├── kuma-data.js
└── README.md
```

---

# 地図HTML

## shimosuwa.html

下諏訪町ビュー。

```text
/view/shimosuwa.html
```

* shimosuwa.geojson を使用
* fitBounds 有効

---

## suwa6.html

諏訪6市町村ビュー。

```text
/view/suwa6.html
```

* suwa6.geojson を使用
* 初期表示固定
* 広域表示向け

---

# URLパラメータ

## points

読み込む data.js を指定。

```text
?points=map-data.js
```

複数指定可能。

```text
?points=map-data.js,kuma-data.js
```

現在の構造では、
複数 data.js を順番に読み込み、
読み込み時点の pointLinks を地図へ追加する。

実質的に簡易レイヤとして動作する。

---

## lat / lng

指定地点へ移動。

```text
?lat=36.07&lng=138.09
```

---

## zoom

ズーム指定。

```text
?zoom=16
```

---

## name

popup表示名。

```text
?name=秋宮
```

---

## gpx

GPXファイル表示。

```text
?gpx=test.gpx
```

---

# -data.js 形式

基本形式。

```js
window.pointLinks = [

  {
    name: "秋宮",
    type: ["taisha"],
    lat: 36.074908,
    lng: 138.090318,
    url: "https://shimosuwa.info/pages/秋宮/"
  }

];
```

---

# 項目説明

## name

表示名。

tooltip に使用。

---

## type

分類用。

現在は未使用だが、
将来的な絞り込み・色分け用。

例：

```js
type: ["onsen"]
type: ["spot"]
type: ["taisha", "spot"]
```

---

## lat / lng

座標。

Leaflet marker に使用。

---

## url

クリック時の遷移先。

---

## _note

運用メモ。

表示側では現在未使用。

必要な項目だけ追加する。

例：

```js
_note: "ページ未リンク / 再確認要"
```

現在は `/` 区切りの1行運用。

---

# data.js 運用方針

## 下に追加

基本はファイル末尾へ追加。

理由：

* 時系列管理しやすい
* Git差分が見やすい
* 作業中断に強い

---

## _note は必要時のみ

通常データには不要。

問題や注意点がある場合のみ追加。

---

## 区切り用オブジェクトは未使用

現在の表示側は：

```js
point.lat
point.lng
```

を前提としているため、
座標なしオブジェクトは入れない。

例（現在は未使用）：

```js
{
  _note: "2026-05追加"
}
```

---

# 現在の構造について

現在は：

```js
window.pointLinks = [...]
```

を各 data.js が持つ。

複数読み込み時は、
各ファイル読み込み時点で地図へ追加される。

そのため、

```text
?points=map-data.js,kuma-data.js
```

のような複数表示が可能。

---

# 今後の候補

* type による絞り込み
* marker色分け
* アイコン変更
* hover情報追加
* レイヤON/OFF
* URLフィルタ
* 自動生成data.js
* GeoJSON追加
* GPX強化

---

# 技術構成

* Leaflet
* OpenStreetMap
* GeoJSON
* GPX
* JavaScript
* 静的HTML

サーバー側処理なし。

Cloudflare Pages などでも動作可能。
