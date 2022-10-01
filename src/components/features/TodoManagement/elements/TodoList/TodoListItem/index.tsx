import { Button, Flex, ListItem, Text } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { isOverdue, Todo } from '../../../stores/Todo/model';
import { useTodo } from '../../../stores/Todo/usecase';
import {
  getFormattedDateString,
  getTodoStatusLabel,
} from '../../../stores/Todo/view-model';

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
              {getTodoStatusLabel(todo.isComplete)}
            </Button>
            <Text>{todo.title}</Text>
          </Flex>

          <Flex gap="2" alignItems="center">
            <Flex direction="column" gap="1">
              <Text>
                作成: <time>{getFormattedDateString(todo.createdAt)}</time>
              </Text>
              <Text color={isOverdue(todo) ? 'red' : 'black'}>
                期限: <time>{getFormattedDateString(todo.dueDate)}</time>
              </Text>
            </Flex>
            <Flex gap="2">
              <Button
                colorScheme="orange"
                onClick={() => onClickPostpone(todoId)}
                disabled={todo.isLoading}
              >
                期限を延長
              </Button>
              <Button
                colorScheme="teal"
                onClick={() => onClickEdit(todoId)}
                disabled={todo.isLoading}
              >
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