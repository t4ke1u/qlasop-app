# Qlasop

量子アニーリングを用いた時間割最適化アプリ
[App Link](https://qlasop.vercel.app/)

DBにはSupabaseの無料プランを使用しており，
バックエンドの最適化計算にはFixstars Amplify AEの無料プランを使用しているため，
長期間メンテナンスをしない場合，以下の問題が発生することがあります．
- DBからの科目データの取得．
- 履修科目の最適化

## Environment

- Runtime: [Node.js](https://nodejs.org/ja)
- Packege Manager: [Yarn](https://yarnpkg.com/)
- Framework: [Next.js](https://nextjs.org/) - v14
- UI Framework: [Chakra UI](https://chakra-ui.com/) - v2.7
- Database: [Supabase](https://supabase.com/)
- Auth: [NextAuth](https://next-auth.js.org/)
- Global State Management: [Zustand](https://github.com/pmndrs/zustand)
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
│   │   ├── page            # ページに対応するコンポーネント
│   │   ├── model           # modelに関するコンポーネント
│   │   ├── ui              # modelに関係のない見た目を伴うコンポーネント
│   │   └── functional      # modelに関係のない見た目を伴わないコンポーネント
│   ├── constants           # 定数
│   ├── libs                # ライブラリ
│   ├── models              # modelレイヤー：ドメインモデル
│   ├── repositories        # repositoryレイヤー：外部との通信を担う
│   ├── styles              # 全体のスタイル
│   ├── store               # Global State を管理
│   ├── usecases            # usecaseレイヤー：ユーザが行う処理
│   └── utils               # ユーティリティロジック
├── README.md
├── .eslintrc.js
├── .eslintignore
├── .gitignore
├── .prettierrc.js
├── next-env.d.ts
├── next.config.js
├── package.json
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
