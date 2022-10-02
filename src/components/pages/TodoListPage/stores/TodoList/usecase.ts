import { useRecoilValue, useRecoilCallback } from 'recoil';

import { postTodo } from '@/repositories/todos';

import { NewTodo, Todo } from '../Todo/model';
import { todoEntity } from '../Todo/state';

import { TodosFilter } from './model';
import {
  todoIds,
  todosFilter,
  filterdTodoIds,
  editingTodo,
  editingTodoId,
} from './state';

export const useTodoIds = () => useRecoilValue(todoIds);

export const useTodosFilter = () => useRecoilValue(todosFilter);

export const useFilteredTodoIds = () => useRecoilValue(filterdTodoIds);

export const useEditingTodo = () => useRecoilValue(editingTodo);

// 状態を更新するアクションは基本的に不変なはずなので単一のオブジェクトとしてまとめたい
// 冗長で見づらいしファクトリ関数的なものを用意したい
export const todoListActions = {
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
          if (result.error) throw new Error('postTodo Error');
          set(todoIds, (prev) => [result.data.id, ...prev]);
          set(todoEntity(result.data.id), {
            ...result.data,
            isLoading: false,
          });
        },
      []
    ),
  useStartEditing: () =>
    useRecoilCallback(
      ({ set }) =>
        (todoId: Todo['id']) => {
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
