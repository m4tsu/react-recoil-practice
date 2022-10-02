import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { NewTodo, newTodoSchema } from '../../../stores/Todo/model';
import { todoListActions } from '../../../stores/TodoList/usecase';

const { useCreateTodo } = todoListActions;

export const NewTodoForm: FC = () => {
  const createTodo = useCreateTodo();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<NewTodo>({
    mode: 'all',
    resolver: zodResolver(newTodoSchema),
  });

  const onSubmit = handleSubmit(async (form) => {
    setIsLoading(true);
    await createTodo(form);
    reset();
    setIsLoading(false);
  });

  return (
    <Flex as="form" onSubmit={onSubmit} direction="column" gap="4">
      <FormControl id="new-todo-title" isInvalid={!!errors.title}>
        <FormLabel>タイトル</FormLabel>
        <Input {...register('title')} />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl id="new-todo-body" isInvalid={!!errors.body}>
        <FormLabel>内容</FormLabel>
        <Textarea {...register('body')} />
        <FormErrorMessage>
          {errors.body && errors.body.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        colorScheme="blue"
        disabled={!isValid}
        isLoading={isLoading}
      >
        新規作成
      </Button>
    </Flex>
  );
};
