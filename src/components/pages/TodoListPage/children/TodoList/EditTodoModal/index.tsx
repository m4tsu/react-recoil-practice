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
  // const { onClose } = useDisclosure();
  const exitEditing = useExitEditing();
  const updateTodo = useUpdateTodo();
  const todo = useEditingTodo();
  const isOpen = !!todo;

  const { Modal, close } = useModal({ isOpen, onClose: exitEditing });

  // const handleClose = useCallback(() => {
  //   close();
  //   exitEditing();
  // }, [exitEditing, close]);

  const handleSubmit = useCallback(
    async (todoId: Todo['id'], todo: TodoInput) => {
      await updateTodo(todoId, todo);
      close();
    },
    [close, updateTodo]
  );

  return (
    // <Modal isOpen={isOpen} onClose={handleClose}>
    //   <ModalOverlay />
    //   <ModalContent>
    //     <ModalHeader>編集する</ModalHeader>
    //     <ModalCloseButton />
    //     <ModalBody>
    //       {todo && <EditTodoForm todo={todo} onSubmit={handleSubmit} />}
    //     </ModalBody>
    //   </ModalContent>
    // </Modal>
    <Modal
      title="編集する"
      body={<>{todo && <EditTodoForm todo={todo} onSubmit={handleSubmit} />}</>}
    />
  );
};
