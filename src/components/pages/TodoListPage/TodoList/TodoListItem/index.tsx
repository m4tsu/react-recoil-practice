import { Box, Button, Flex, ListItem } from '@chakra-ui/react';
import { FC } from 'react';

import { TodoState } from '../../slices/TodoList/model';
import { useTodo } from '../../slices/TodoList/usecases';

type Props = {
  todoId: TodoState['id'];
  onClickStatus: (todoId: TodoState['id']) => void;
};
export const TodoListItem: FC<Props> = ({ todoId, onClickStatus }) => {
  const todo = useTodo(todoId);

  return (
    <ListItem listStyleType="none" p="1">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p="2"
        border="1px"
        borderColor="gray.400"
      >
        <Box>{todo.title}</Box>
        <Button
          colorScheme={todo.isComplete ? 'blue' : 'gray'}
          onClick={() => onClickStatus(todoId)}
          disabled={todo.isLoading}
        >
          {todo.isComplete ? '完了' : '未完了'}
        </Button>
      </Flex>
    </ListItem>
  );
};
