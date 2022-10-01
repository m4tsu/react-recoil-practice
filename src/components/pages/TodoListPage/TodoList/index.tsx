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
import { FC, useCallback } from 'react';

import { toast } from '@/libs/chakra/toast';

import { Todo } from '../stores/Todo/model';
import { todoActions } from '../stores/Todo/usecase';
import { TodosFilter } from '../stores/TodoList/model';
import {
  todoListActions,
  useFilteredTodoIds,
  useTodosFilter,
} from '../stores/TodoList/usecase';

import { EditTodoModal } from './EditTodoModal';
import { NewTodoForm } from './NewTodoForm';
import { TodoListItem } from './TodoListItem';

const { useFilterTodosBy, useStartEditing } = todoListActions;
const { useToggleStatus, usePostpone } = todoActions;

const filterOptions: { value: TodosFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'recently', label: 'Recently' },
];

export const TodoList: FC = () => {
  const todoIds = useFilteredTodoIds();
  const toggleStatus = useToggleStatus();
  const postpone = usePostpone();
  const filterBy = useFilterTodosBy();
  const todosFilter = useTodosFilter();
  const startEditing = useStartEditing();

  const handleClickPostpone = useCallback(
    async (todoId: Todo['id']) => {
      const { errors } = await postpone(todoId);
      if (errors) {
        toast({
          title: '期限の延長ができませんでした。',
          status: 'error',
          description: errors.map((e) => <Text key={e}>- {e}</Text>),
          position: 'top-right',
        });
      }
    },
    [postpone]
  );

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
              onClickPostpone={handleClickPostpone}
            />
          ))}
        </UnorderedList>
      </Flex>
      <EditTodoModal />
    </Flex>
  );
};
