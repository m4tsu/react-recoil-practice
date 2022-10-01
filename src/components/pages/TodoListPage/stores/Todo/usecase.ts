import { useRecoilValue, useRecoilCallback } from 'recoil';

import { patchTodo } from '@/services/todos';

import { Todo, TodoInput } from './model';
import { todoEntity } from './state';

export const useTodo = (todoId: Todo['id']) => {
  return useRecoilValue(todoEntity(todoId));
};

export const todoActions = {
  useUpdateTodo: () =>
    useRecoilCallback(
      ({ set, snapshot }) =>
        async (todoId: Todo['id'], params: TodoInput) => {
          const todo = await snapshot.getPromise(todoEntity(todoId));
          set(todoEntity(todoId), (prev) => ({ ...prev, isLoading: true }));
          const result = await patchTodo({
            id: todoId,
            params: { ...todo, ...params },
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
  useToggleStatus: () =>
    useRecoilCallback(
      ({ set, snapshot }) =>
        async (todoId: Todo['id']) => {
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
};
