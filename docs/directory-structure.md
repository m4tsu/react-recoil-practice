## ディレクトリ構造
- pages - ルーティングとレイアウト
- features
  - TodoManagement
    - index.tsx - この feature Component のエントリポイント
    - elements - TodoManagement コンポーネントを構成する子コンポーネント
      - TodoList
        - index.tsx
    - stores - view 以外の層
      - Todo
        - model.ts - モデリング対象の型とドメインロジック
        - store.ts - React State の実装
        - usecases.ts - コンポーネント等で実行したい処理を提供する。主にカスタムフックで実装されそう
        - view-model.ts - データ を view 向けに変換したりするロジックを置く。必須にすると多分めんどくさいので必要になったときの置き場所くらいに見ておく
      - TodoList


## memo
- レイヤードアーキテクチャ
  - Data < Domain < Appilication < Presentation
    - React に置き換えると...
      - Domain - 状態とロジック（状態遷移）(model of state)
      - Application - 実際にAPIリクエストしてレスポンスに応じて state を更新して... というような一連のフローを実装するところ
        - クリーンアーキテクチャでいうと usecase ？　https://gist.github.com/mpppk/609d592f25cab9312654b39f1b357c60
      - Presentation - ViewModel(presentation logic) -> View(Component)
- ビジネスロジック
  - エンタープライズロジック
    - ソフトウェア特有ではないロジック。プラットフォームやフレームワークに依存しない（GUIでもCUIでも、なんなら現実世界の紙で行われている業務の概念とか）。ドメイン知識。 コアなルールや制約
  - アプリケーションロジック
    - ソフトウェア特有のロジック。処理の流れ
## 参考
- https://little-hands.hatenablog.com/entry/2017/10/04/231743
- https://little-hands.hatenablog.com/entry/2017/10/04/201201
- https://little-hands.hatenablog.com/entry/2019/07/26/domain-knowledge
- https://gist.github.com/mpppk/609d592f25cab9312654b39f1b357c60
- https://dev.to/daslaf/clean-architecture-for-react-apps-3g3m