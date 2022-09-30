import { Flex, Text, UnorderedList } from '@chakra-ui/react';
import { FC } from 'react';

import { useTodoIds, todoActions } from '../slices/TodoList/usecases';

import { TodoListItem } from './TodoListItem';

export const TodoList: FC = () => {
  const todoIds = useTodoIds();
  const toggleStatus = todoActions.useToggleStatus();

  return (
    <Flex direction="column" gap="8">
      <Text as="h2" fontSize="lg" fontWeight="bold">
        TODOリスト
      </Text>
      <Flex>
        <UnorderedList m="0" width="full">
          {todoIds.map((todoId) => (
            <TodoListItem
              key={todoId}
              todoId={todoId}
              onClickStatus={toggleStatus}
            />
          ))}
        </UnorderedList>
      </Flex>
    </Flex>
  );
};
