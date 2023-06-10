# Optimetable

2023 年度 学士 4 年 太田岳 卒業研究 \
量子アニーリングを用いた時間割最適化アプリ

## Environment

- Runtime: [Node.js](https://nodejs.org/ja) - v18.12.1
- Packege Manager: [Yarn](https://yarnpkg.com/) - v1.22.19
- Framework: [Next.js](https://nextjs.org/) - v13.4.4
- CSS Framework: [Tailwind CSS](https://tailwindcss.com/) - v3.3.2
- Headless UI Framework: [Radix UI](https://www.radix-ui.com/)
- Linter: [ESLint](https://eslint.org/) - v8.41.0
- Formatter: [Prettier](https://prettier.io/) - v2.8.8

## Directory

```sh
.
├── public                  # 画像等のアセット
├── src                     # コード
│   ├── app                 # ページの構成
│   │   ├── layout.tsx      # Root - レイアウト
│   │   ├── page.tsx        # Root - ページ
│   │   └── [path]
│   │       ├── layout.tsx  # [path] - レイアウト
│   │       └── page.tsx    # [path] - ページ
│   ├── components          # コンポーネント
│   ├── constants           # 定数
│   ├── libs                # ライブラリ
│   ├── models              # カスタム型定義
│   ├── styles              # 全体のスタイル
│   └── utils               # ユーティリティロジック
├── README.md
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── yarn.lock
```

## Commands

### yarn

```bash
# パッケージインストール
$ yarn

# 開発サーバーを立てる
$ yarn dev
```

### git

```sh
# 対象ファイルをインデックス（コミット対象）に追加
$ git add {ファイルパス1} {ファイルパス2}...

# 変更したファイルの一覧を出力
$ git status

# 指定したエディタでメッセージを書き、インデックスにある全ファイルをコミット
$ git commit

# メッセージを付け、インデックスにある全ファイルをコミットする
$ git commit -m "{メッセージ}"

# 現在のローカルブランチを origin にプッシュする
$ git push

# 対象ブランチに切り替える
$ git checkout {ブランチ名}

# 対象ブランチを新規作成し、切り替える
$ git checkout -b {ブランチ名}

# ワークツリーにある対象ファイルの変更を取り消す
$ git checkout {ファイルパス}

# 最新の履歴を取得する
$ git fetch

# 対象ブランチを、現在のブランチへマージする
$ git merge {ブランチ名}

# git fetch + git merge
$ git pull
```
