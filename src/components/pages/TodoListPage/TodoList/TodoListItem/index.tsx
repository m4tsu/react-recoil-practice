import { Box, Button, Flex, ListItem } from '@chakra-ui/react';
import { FC } from 'react';

import { TodoState } from '../../models/Todo';
import { useTodo } from '../../usecases/todos/store';

type Props = {
  todoId: TodoState['id'];
};
export const TodoListItem: FC<Props> = ({ todoId }) => {
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
        <Button colorScheme={todo.isComplete ? 'blue' : 'gray'}>
          {todo.isComplete ? '完了' : '未完了'}
        </Button>
      </Flex>
    </ListItem>
  );
};
