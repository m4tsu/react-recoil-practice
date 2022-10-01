import { Box, Button, Flex, ListItem, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FC, memo } from 'react';

import { Todo } from '../../stores/Todo/model';
import { useTodo } from '../../stores/Todo/usecase';

type Props = {
  todoId: Todo['id'];
  onClickStatus: (todoId: Todo['id']) => void;
  onClickEdit: (todoId: Todo['id']) => void;
};
export const TodoListItem: FC<Props> = memo(
  ({ todoId, onClickStatus, onClickEdit }) => {
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
          <Flex gap="4" alignItems="center">
            <Text as="time">{dayjs(todo.createdAt).format('YYYY-MM-DD')}</Text>
            <Button
              colorScheme={todo.isComplete ? 'blue' : 'gray'}
              onClick={() => onClickStatus(todoId)}
              disabled={todo.isLoading}
            >
              {todo.isComplete ? '完了' : '未完了'}
            </Button>
            <Button colorScheme="teal" onClick={() => onClickEdit(todoId)}>
              編集
            </Button>
          </Flex>
        </Flex>
      </ListItem>
    );
  }
);
TodoListItem.displayName = 'TodoListItem';
