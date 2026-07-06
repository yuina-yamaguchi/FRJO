# Fdel Röte Jazz Orchester — 宣伝ランディングページ

ビッグバンド「Fdel Röte Jazz Orchester」の宣伝用ランディングページです。  
2027年3月27日開催のライブ告知と、バンドの世界観を伝えることを目的としています。

---

## ページ構成

| セクション | 内容 |
|---|---|
| Hero | バンド名・キャッチコピー・ライブ日時・会場 |
| About | バンド紹介・音楽性・コンセプト |
| Live Information | ライブ詳細・フライヤー画像枠・チケット情報 |
| Contact | 問い合わせフォーム（フロントエンドのみ） |
| Footer | バンド名・著作権・SNSリンク |

---

## 使用技術

- **HTML5** — セマンティックマークアップ、アクセシビリティ対応（ARIA属性）
- **CSS3** — CSS Custom Properties によるカラーパレット管理、Flexbox / Grid レイアウト、レスポンシブ対応（モバイル・タブレット・PC）
- **JavaScript (ES5+)** — スムーズスクロール、ハンバーガーメニュー、フォームバリデーション、IntersectionObserver によるアクティブナビ
- **Google Fonts** — Cormorant Garamond（ディスプレイ） / Noto Sans JP（本文）
- 外部ライブラリなし（バニラ実装）

---

## ファイル構成

```
FRJO/
├── index.html          # メインHTML
├── styles.css          # スタイルシート
├── script.js           # JavaScript
├── README.md           # このファイル
└── images/
    └── flyer-placeholder.jpg   # フライヤー画像（差し替え用）
```

---

## GitHub Pages での公開方法

### 1. リポジトリの作成

```bash
# このディレクトリをGitリポジトリとして初期化
git init
git add .
git commit -m "Initial commit: Fdel Röte Jazz Orchester landing page"
```

### 2. GitHub にプッシュ

```bash
# GitHubでリポジトリを作成後、以下を実行
git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
git branch -M main
git push -u origin main
```

### 3. GitHub Pages を有効化

1. GitHubのリポジトリページを開く
2. **Settings** → **Pages** を開く
3. **Source** を `Deploy from a branch` に設定
4. **Branch** を `main` / `/ (root)` に設定して **Save** をクリック

しばらくすると以下のURLで公開されます：

```
https://<ユーザー名>.github.io/<リポジトリ名>/
```

---

## フライヤー画像の差し替え方法

1. フライヤー画像（JPG または PNG）を `images/` フォルダに配置します

2. `index.html` 内の以下の箇所を見つけます：

```html
<img
  src="images/flyer-placeholder.jpg"
  alt="Fdel Röte Jazz Orchester ライブフライヤー"
  ...
/>
```

3. `src` の値を実際のファイル名に書き換えます：

```html
src="images/flyer-2027.jpg"
```

> **推奨サイズ：** 縦長（3:4 比率）、横幅 600px 以上  
> **対応形式：** JPG / PNG / WebP

---

## カラーパレット

`styles.css` の `:root` セクションで管理しています。

| 変数名 | 値 | 用途 |
|---|---|---|
| `--color-bg` | `#0a0a0a` | 背景色（黒） |
| `--color-crimson` | `#8b0000` | 深紅（アクセント） |
| `--color-gold` | `#c9a84c` | ゴールド（見出し・ボタン） |
| `--color-text` | `#e8e0d0` | 本文テキスト |

色を変更したい場合は `:root` 内の値を書き換えるだけでページ全体に反映されます。

---

## ライブ情報の更新方法

`index.html` 内 `id="live"` セクションの `<dl class="live-info-list">` を編集してください。

```html
<dt>日時</dt>
<dd>2027年3月27日（土）</dd>

<dt>開場 / 開演</dt>
<dd>Open 17:30 / Start 18:00</dd>

<dt>会場</dt>
<dd>JB.STUDIO ROUTE23 / JB HALL<br />...</dd>

<dt>チケット</dt>
<dd><!-- チケット情報が決まったらここを更新 --></dd>
```

---

## ライセンス

&copy; 2027 Fdel Röte Jazz Orchester. All rights reserved.
