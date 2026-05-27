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

## type

points= 側へ適用されるフィルタ。

```text
?points=map-data.js&type=food
```

複数指定可能。

```text
?points=map-data.js&type=taisha,food
```

現在は OR 条件。

つまり：

```js
type: ["taisha", "spot"]
```

は、

```text
type=taisha
```

でも、

```text
type=spot
```

でも表示される。

---

## overlay

常時表示用 data.js。

overlay 側には type フィルタは適用されない。

```text
?points=map-data.js&type=food&overlay=kuma-data.js
```

この場合：

* map-data.js → food のみ表示
* kuma-data.js → 全表示

複数 overlay も可能。

```text
?overlay=kuma-data.js,hazard-data.js
```

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

現在は URL の type= フィルタに使用。

配列形式。

例：

```js
type: ["onsen"]
type: ["spot"]
type: ["taisha", "spot"]
type: ["food", "yado"]
```

複数 type を持つことが可能。

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

## type は配列

現在の type は：

```js
type: ["spot"]
```

形式。

将来的な複数カテゴリ対応を前提としている。

例：

```js
type: ["food", "cafe", "wifi"]
```

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

さらに：

```text
?points=map-data.js&type=food&overlay=kuma-data.js
```

のように：

* points = typeフィルタ対象
* overlay = 常時表示

という構成が可能。

---

# 現在の構造の特徴

現在の構造では：

* data.js を分割可能
* type で横断分類可能
* overlay で常時レイヤ追加可能
* URLのみで地図切替可能

となっている。

実質的に：

```text
軽量GIS / 軽量POIデータベース
```

として動作する。

---

# 今後の候補

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
