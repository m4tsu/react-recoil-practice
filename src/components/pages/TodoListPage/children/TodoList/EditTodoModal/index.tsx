import { useCallback } from 'react';

import { useModal } from '@/components/ui/Modal';

import { Todo, TodoInput } from '../../../stores/Todo/model';
import { todoActions } from '../../../stores/Todo/usecase';
import {
  todoListActions,
  useEditingTodo,
} from '../../../stores/TodoList/usecase';

import { EditTodoForm } from './EditTodoForm';

const { useUpdateTodo } = todoActions;
const { useExitEditing } = todoListActions;

export const EditTodoModal = () => {
  const exitEditing = useExitEditing();
  const updateTodo = useUpdateTodo();
  const todo = useEditingTodo();
  const isOpen = !!todo;

  const { Modal, close } = useModal({ isOpen, onClose: exitEditing });

  const handleSubmit = useCallback(
    async (todoId: Todo['id'], todo: TodoInput) => {
      await updateTodo(todoId, todo);
      close();
    },
    [close, updateTodo]
  );

  return (
    <Modal
      title="編集する"
      body={<>{todo && <EditTodoForm todo={todo} onSubmit={handleSubmit} />}</>}
    />
  );
};
