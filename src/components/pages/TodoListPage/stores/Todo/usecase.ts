import { useRecoilValue, useRecoilCallback } from 'recoil';

import { patchTodo, postpone, updateStatus } from '@/repositories/todos';

import { canPostPoneSchema, Todo, TodoInput } from './model';
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
          const result = await updateStatus(todoId, !todo.isComplete);
          if (result.error) throw new Error('patchTodo Error');
          set(todoEntity(todoId), (prev) => ({
            ...prev,
            ...result.data,
            isLoading: false,
          }));
        },
      []
    ),
  usePostpone: () =>
    useRecoilCallback(
      ({ set, snapshot }) =>
        async (todoId: Todo['id']): Promise<{ errors?: string[] }> => {
          const todo = await snapshot.getPromise(todoEntity(todoId));
          const validationResult = canPostPoneSchema.safeParse(todo);
          if (!validationResult.success) {
            return {
              errors: validationResult.error.errors.map((e) => e.message),
            };
          }
          set(todoEntity(todoId), (prev) => ({ ...prev, isLoading: true }));
          const result = await postpone(todoId);
          if (result.error) throw new Error('patchTodo Error');
          set(todoEntity(todoId), (prev) => ({
            ...prev,
            ...result.data,
            isLoading: false,
          }));
          return {};
        },
      []
    ),
};
