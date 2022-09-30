import {
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { FC } from 'react';

import { TodosFilter } from '../slices/TodoList/model';
import {
  useFilteredTodoIds,
  todoActions,
  useTodosFilter,
} from '../slices/TodoList/usecases';

import { TodoListItem } from './TodoListItem';

const { useToggleStatus, useFilterTodosBy } = todoActions;

const filterOptions: { value: TodosFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'recently', label: 'Recently' },
];

export const TodoList: FC = () => {
  const todoIds = useFilteredTodoIds();
  const toggleStatus = useToggleStatus();
  const filterBy = useFilterTodosBy();
  const todosFilter = useTodosFilter();

  return (
    <Flex direction="column" gap="8">
      <RadioGroup
        onChange={(value) => {
          filterBy(value as TodosFilter);
        }}
        value={todosFilter}
      >
        <Stack direction="row">
          {filterOptions.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Text as="h2" fontSize="lg" fontWeight="bold">
        TODOリスト
      </Text>
      <Flex direction="column" gap="4">
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
