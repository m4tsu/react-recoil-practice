import { Divider, Flex, Grid, Text } from '@chakra-ui/react';
import { Suspense } from 'react';

import { Loading } from '@/components/ui/elements/Loading';

import { NewTodoForm } from './children/NewTodoForm';
import { TodoList } from './children/TodoList';
import { TodosFilterSection } from './children/TodosFilter';

export const TodoListPage = () => {
  return (
    <Flex direction="column" gap="4">
      <Text as="h1" fontWeight="bold" fontSize="2xl">
        TODOリストページ
      </Text>
      <Flex direction="column" gap="8">
        <Grid gridTemplateColumns="4fr 1fr 4fr">
          <TodosFilterSection />
          <Divider orientation="vertical" />
          <NewTodoForm />
        </Grid>
        <Suspense fallback={<Loading />}>
          <TodoList />
        </Suspense>
      </Flex>
    </Flex>
  );
};
