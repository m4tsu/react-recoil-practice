import { useRecoilCallback, useRecoilValue } from 'recoil';

import { patchTodo, postTodo } from '@/services/todos';

import { NewTodo, TodoInput, TodosFilter, TodoState } from './model';
import {
  todoIds,
  todoEntity,
  editingTodoId,
  filterdTodoIds,
  todosFilter,
  editingTodo,
} from './store';

// 「状態管理」をコンポーネントに提供する層

// 「状態管理」の責務をここに閉じ込めるために、 atom をコンポーネントで直接使わせない
// Recoil 特有のAPIをコンポーネントに表出させない。所謂 腐敗防止層

export const useTodoIds = () => useRecoilValue(todoIds);

export const useTodo = (todoId: TodoState['id']) => {
  return useRecoilValue(todoEntity(todoId));
};

export const useTodosFilter = () => useRecoilValue(todosFilter);

export const useFilteredTodoIds = () => useRecoilValue(filterdTodoIds);

export const useEditingTodo = () => useRecoilValue(editingTodo);

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
  useCreateTodo: () =>
    useRecoilCallback(
      ({ set }) =>
        async (params: NewTodo) => {
          const result = await postTodo(params);
          console.log(result);
          if (result.error) throw new Error('postTodo Error');
          set(todoIds, (prev) => [result.data.id, ...prev]);
          set(todoEntity(result.data.id), {
            ...result.data,
            isLoading: false,
          });
        },
      []
    ),
  useUpdateTodo: () =>
    useRecoilCallback(
      ({ set }) =>
        async (todoId: TodoState['id'], params: TodoInput) => {
          set(todoEntity(todoId), (prev) => ({ ...prev, isLoading: true }));
          const result = await patchTodo({ id: todoId, params });
          if (result.error) throw new Error('patchTodo Error');
          set(todoEntity(todoId), (prev) => ({
            ...prev,
            ...result.data,
            isLoading: false,
          }));
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
