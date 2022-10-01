import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback } from 'react';

import { TodoInput } from '../../slices/TodoList/model';
import { todoActions, useEditingTodo } from '../../slices/TodoList/usecases';

import { EditTodoForm } from './EditTodoForm';

import { Todo } from 'domains/Todo';

const { useExitEditing, useUpdateTodo } = todoActions;

export const EditTodoModal = () => {
  const { onClose } = useDisclosure();
  const exitEditing = useExitEditing();
  const updateTodo = useUpdateTodo();
  const todo = useEditingTodo();
  const isOpen = !!todo;

  const close = useCallback(() => {
    onClose();
    exitEditing();
  }, [exitEditing, onClose]);

  const handleSubmit = useCallback(
    async (todoId: Todo['id'], todo: TodoInput) => {
      await updateTodo(todoId, todo);
      close();
    },
    [close, updateTodo]
  );

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>編集する</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {todo && <EditTodoForm todo={todo} onSubmit={handleSubmit} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
