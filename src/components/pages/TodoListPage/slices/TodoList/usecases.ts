import { useRecoilCallback, useRecoilValue } from 'recoil';

import { patchTodo } from '@/services/todos';

import { TodoInput, TodosFilter, TodoState } from './model';
import {
  todoIds,
  todoEntity,
  editingTodoId,
  filterdTodoIds,
  todosFilter,
} from './store';

// 「状態管理」をコンポーネントに提供する層

// 「状態管理」の責務をここに閉じ込めるために、 atom をコンポーネントで直接使わせない
// Recoil 特有のAPIをコンポーネントに表出させない。所謂 腐敗防止層

export const useTodoIds = () => useRecoilValue(todoIds);

export const useTodo = (todoId: TodoState['id']) => {
  console.log('useTodo!!!');
  return useRecoilValue(todoEntity(todoId));
};

export const useTodosFilter = () => useRecoilValue(todosFilter);

export const useFilteredTodoIds = () => useRecoilValue(filterdTodoIds);

// 状態を更新するアクションは基本的に不変なはずなので単一のオブジェクトとしてまとめたい
// 冗長で見づらいしファクトリ関数的なものを用意したい
export const todoActions = {
  useFilterTodosBy: () =>
    useRecoilCallback(
      ({ set }) =>
        (filter: TodosFilter) => {
          set(todosFilter, filter);
        },
      []
    ),
  useUpdateTodo: () =>
    useRecoilCallback(
      ({ set }) =>
        async (todoId: TodoState['id'], params: TodoInput) => {
          const result = await patchTodo({ id: todoId, params });
          if (result.error) throw new Error('patchTodo Error');
          set(todoEntity(todoId), (prev) => ({ ...prev, ...result.data }));
        },
      []
    ),
  useToggleStatus: () =>
    useRecoilCallback(
      ({ set, snapshot }) =>
        async (todoId: TodoState['id']) => {
          const todo = await snapshot.getPromise(todoEntity(todoId));
          set(todoEntity(todoId), (prev) => ({ ...prev, isLoading: true }));
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
        },
      []
    ),
  useStartEditing: () =>
    useRecoilCallback(
      ({ set }) =>
        (todoId: TodoState['id']) => {
          set(editingTodoId, todoId);
        },
      []
    ),
  useExitEditing: () =>
    useRecoilCallback(
      ({ set }) =>
        () => {
          set(editingTodoId, null);
        },
      []
    ),
};
