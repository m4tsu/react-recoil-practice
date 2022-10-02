import { atomFamily, selector, selectorFamily } from 'recoil';

import { Todo as TodoDomain } from '@/domains/Todo';
import { generateUniqueKey } from '@/libs/recoil/utils';
import { getTodos } from '@/repositories/todos';

import { Todo } from './model';

// React State としての実装

/** フェッチした Todos のキャッシュ */
export const todosQuery = selector<TodoDomain[]>({
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
export const todoEntity = atomFamily<Todo, Todo['id']>({
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
          // 実際は useRecoilCallback の set で値を持ったデータが入るので、この状態でコンポーネントに現れることはない... なんかもっといいやり方ありそう
          const newTodo: Todo = {
            id: todoId,
            title: '',
            body: '',
            isComplete: false,
            isLoading: false,
            createdAt: '',
            dueDate: '',
            postponeCount: 0,
          };
          return newTodo;
        }
        return { ...todo, isLoading: false };
      },
  }),
});
