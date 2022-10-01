- pages - routing and layout
- features
  - TodoListPage
    - component
      - index.tsx
      - TodoList
        - index.tsx
    - slices - view 以外の層
      - ModelName
        - model.ts - モデリング対象の型とドメインロジック
        - store.ts - React State の実装
        - usecases.ts - コンポーネント等で実行したい処理を提供する。主に カスタムフックで実装されそう




## memo

- レイヤードアーキテクチャ
  - Data < Domain < Appilication < Presentation
    - React に置き換えると...
      - Domain - 状態とロジック（状態遷移）(model of state)
      - Application - 実際にAPIリクエストしてレスポンスに応じて state を更新して... というような一連のフローを実装するところ
        - Component に提供するために、 hooks にすることになりそう
      - Presentation - ViewModel(presentation logic) -> View(Component)
- ビジネスロジック
  - エンタープライズロジック
    - ソフトウェア特有ではないロジック。プラットフォームやフレームワークに依存しない（GUIでもCUIでも、なんなら現実世界の紙で行われている業務の概念とか）。
  - アプリケーションロジック
    - ソフトウェア特有のロジック。WebのGUIだからために出現するようなもの。DBに保存するとか、