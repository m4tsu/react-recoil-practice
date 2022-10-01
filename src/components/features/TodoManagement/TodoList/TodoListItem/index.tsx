import { Button, Flex, ListItem, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FC, memo } from 'react';

import { Todo } from '../../stores/Todo/model';
import { useTodo } from '../../stores/Todo/usecase';

type Props = {
  todoId: Todo['id'];
  onClickStatus: (todoId: Todo['id']) => void;
  onClickEdit: (todoId: Todo['id']) => void;
  onClickPostpone: (todoId: Todo['id']) => void;
};
export const TodoListItem: FC<Props> = memo(
  ({ todoId, onClickStatus, onClickEdit, onClickPostpone }) => {
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
          <Flex alignItems="center" p="2" gap="2">
            <Button
              size="sm"
              colorScheme={todo.isComplete ? 'blue' : 'gray'}
              onClick={() => onClickStatus(todoId)}
              disabled={todo.isLoading}
            >
              {todo.isComplete ? '完了' : '未完了'}
            </Button>
            <Text>{todo.title}</Text>
          </Flex>

          <Flex gap="2" alignItems="center">
            <Flex direction="column" gap="1">
              <Text>
                作成: <time>{dayjs(todo.createdAt).format('YYYY-MM-DD')}</time>
              </Text>
              <Text>
                期限: <time>{dayjs(todo.dueDate).format('YYYY-MM-DD')}</time>
              </Text>
            </Flex>
            <Flex gap="2">
              <Button
                colorScheme="orange"
                onClick={() => onClickPostpone(todoId)}
              >
                期限を延長
              </Button>
              <Button colorScheme="teal" onClick={() => onClickEdit(todoId)}>
                編集
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </ListItem>
    );
  }
);
TodoListItem.displayName = 'TodoListItem';
