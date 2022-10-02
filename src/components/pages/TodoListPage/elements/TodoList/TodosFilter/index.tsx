import { Flex, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { TodosFilter } from '../../../stores/TodoList/model';
import {
  todoListActions,
  useTodosFilter,
} from '../../../stores/TodoList/usecase';

const { useFilterTodosBy } = todoListActions;

const filterOptions: { value: TodosFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'recently', label: 'Recently' },
];

export const TodosFilterSection: FC = () => {
  const filterBy = useFilterTodosBy();
  const todosFilter = useTodosFilter();
  return (
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
  );
};
