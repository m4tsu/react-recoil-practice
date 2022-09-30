import { useRecoilCallback, useRecoilValue } from 'recoil';

import { patchTodo } from '@/services/todos';

import { TodoInput, TodoState } from './model';
import { todoIds, todoEntity, editingTodoId } from './store';

// 「状態管理」をコンポーネントに提供する層

// 「状態管理」の責務をここに閉じ込めるために、 atom をコンポーネントで直接使わせない
// Recoil 特有のAPIをコンポーネントに表出させない。所謂 腐敗防止層

export const useTodoIds = () => useRecoilValue(todoIds);

export const useTodo = (todoId: TodoState['id']) =>
  useRecoilValue(todoEntity(todoId));

// 状態を更新するアクションは基本的に不変なはずなので単一のオブジェクトとしてまとめたい
export const todoActions = {
  useUpdateTodo: () =>
    useRecoilCallback(
      ({ set }) =>
        async (todoId: TodoState['id'], params: TodoInput) => {
          const result = await patchTodo({ id: todoId, params });
          if (result.error) throw new Error('patchTodo Error');
          set(todoEntity(todoId), (prev) => ({ ...prev, ...result.data }));
        }
    ),
  useToggleStatus: () =>
    useRecoilCallback(
      ({ set, snapshot }) =>
        async (todoId: TodoState['id']) => {
          const todo = await snapshot.getPromise(todoEntity(todoId));
          set(todoEntity(todoId), (prev) => ({ ...prev, isLoading: true }));
          console.log(todo);
          const result = await patchTodo({
            id: todoId,
            params: { ...todo, isComplete: !todo.isComplete },
          });
          console.log(result);
          if (result.error) throw new Error('patchTodo Error');
          set(todoEntity(todoId), (prev) => ({
            ...prev,
            ...result.data,
            isLoading: false,
          }));
        }
    ),
  useStartEditing: () =>
    useRecoilCallback(({ set }) => (todoId: TodoState['id']) => {
      set(editingTodoId, todoId);
    }),
  useEdixEditing: () =>
    useRecoilCallback(({ set }) => () => {
      set(editingTodoId, null);
    }),
};
