import {
  Divider,
  Flex,
  Grid,
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

import { EditTodoModal } from './EditTodoModal';
import { NewTodoForm } from './NewTodoForm';
import { TodoListItem } from './TodoListItem';

const { useToggleStatus, useFilterTodosBy, useStartEditing } = todoActions;

const filterOptions: { value: TodosFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'recently', label: 'Recently' },
];

export const TodoList: FC = () => {
  const todoIds = useFilteredTodoIds();
  const toggleStatus = useToggleStatus();
  const filterBy = useFilterTodosBy();
  const todosFilter = useTodosFilter();
  const startEditing = useStartEditing();

  return (
    <Flex direction="column" gap="8">
      <Grid gridTemplateColumns="4fr 1fr 4fr">
        <Flex direction="column" gap="4">
          <Text as="h4" fontSize="lg">
            絞り込み
          </Text>
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
        </Flex>
        <Divider orientation="vertical" />
        <NewTodoForm />
      </Grid>

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
              onClickEdit={startEditing}
            />
          ))}
        </UnorderedList>
      </Flex>
      <EditTodoModal />
    </Flex>
  );
};
