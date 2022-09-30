import { atom, atomFamily, selector, selectorFamily } from 'recoil';

import { generateUniqueKey } from '@/libs/recoil/utils';
import { getTodos } from '@/services/todos';

import { filterBy, TodosFilter, TodoState } from './model';

import { Todo } from 'domains/Todo';

/** フェッチした Todos のキャッシュ */
const todosQuery = selector<Todo[]>({
  key: generateUniqueKey('todosQuery'),
  get: async () => {
    const res = await getTodos();
    if (res.error) {
      throw res.error; // ErrorBoundary で処理
    }
    return res.data;
  },
});

// Reactの状態としての todo
export const todoEntity = atomFamily<TodoState, TodoState['id']>({
  key: generateUniqueKey('todoEntity'),
  default: selectorFamily({
    key: generateUniqueKey('todoEntity_default'),
    get:
      (todoId) =>
      ({ get }) => {
        // フェッチしてきた todos から state を生成する
        const todo = get(todosQuery).find((todo) => todo.id === todoId);
        if (todo === undefined) {
          // 新規作成時のデフォルト値
          // 実際は useRecoilCallback の set で値を持ったデータが入るので、この状態でコンポーネントに現れることはない... なんかもっといいやり方ないのか？
          const newTodo: TodoState = {
            id: todoId,
            title: '',
            body: '',
            isComplete: false,
            isLoading: false,
            createdAt: '',
          };
          return newTodo;
        }
        return { ...todo, isLoading: false };
      },
  }),
});

// todoEntity だけでは リストの順番が保てないので id のリストを別に持つ。
// Redux で {allIds: Id[], byId: {[id: Id]: Todo}} みたいな正規化した形でもっていたのと同じ
export const todoIds = atom<TodoState['id'][]>({
  key: generateUniqueKey('todoIds'),
  default: selector({
    key: generateUniqueKey('toodIds_default'),
    get: ({ get }) => {
      return get(todosQuery).map((todo) => todo.id);
    },
  }),
});

/** 編集中 の Todo の Id */
export const editingTodoId = atom<TodoState['id'] | null>({
  key: generateUniqueKey('editingTodoId'),
  default: null,
});

/** TodoList の絞り込み条件 */
export const todosFilter = atom<TodosFilter>({
  key: generateUniqueKey('todosFilter'),
  default: 'all',
});

/** 絞り込み */
export const filterdTodoIds = selector<TodoState['id'][]>({
  key: generateUniqueKey('filterdTodoIds'),
  get: ({ get }) => {
    const all = get(todoIds).map((id) => get(todoEntity(id)));
    const filter = get(todosFilter);
    return filterBy(all, filter).map((todo) => todo.id);
  },
});
