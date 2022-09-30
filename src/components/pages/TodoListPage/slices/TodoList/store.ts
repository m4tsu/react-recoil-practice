import { atom, atomFamily, selector, selectorFamily } from 'recoil';

import { generateUniqueKey } from '@/libs/recoil/utils';
import { getTodos } from '@/services/todos';

import { TodoState } from './model';

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
          const newTodo: TodoState = {
            id: todoId,
            title: '',
            body: '',
            isComplete: false,
            isLoading: false,
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

//
export const editingTodoId = atom<TodoState['id'] | null>({
  key: generateUniqueKey('editingTodoId'),
  default: null,
});
