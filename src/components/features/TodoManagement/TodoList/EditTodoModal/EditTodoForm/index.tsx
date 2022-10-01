import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { todoInputSchema, Todo } from '../../../stores/Todo/model';

type TodoInput = z.infer<typeof todoInputSchema>;

type Props = {
  todo: Todo;
  onSubmit: (todoId: Todo['id'], todo: TodoInput) => void;
};
export const EditTodoForm: FC<Props> = ({ todo, onSubmit: onSubmitTodo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TodoInput>({
    mode: 'all',
    defaultValues: todo,
    resolver: zodResolver(todoInputSchema),
  });
  const onSubmit = handleSubmit(async (form) => {
    await onSubmitTodo(todo.id, form);
  });

  return (
    <Flex as="form" onSubmit={onSubmit} direction="column" gap="4">
      <FormControl id="todo-title" isInvalid={!!errors.title}>
        <FormLabel>タイトル</FormLabel>
        <Input {...register('title')} />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl id="todo-body" isInvalid={!!errors.body}>
        <FormLabel>内容</FormLabel>
        <Textarea {...register('body')} />
        <FormErrorMessage>
          {errors.body && errors.body.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl>
        <Checkbox {...register('isComplete')}>完了</Checkbox>
      </FormControl>
      <Button
        type="submit"
        colorScheme="blue"
        disabled={!isValid}
        isLoading={todo.isLoading}
      >
        保存
      </Button>
    </Flex>
  );
};
