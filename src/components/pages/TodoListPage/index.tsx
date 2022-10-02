import { Divider, Flex, Grid, Text } from '@chakra-ui/react';
import { Suspense } from 'react';

import { Loading } from '@/components/ui/Loading';

import { TodoList } from './children/TodoList';
import { NewTodoForm } from './children/TodoList/NewTodoForm';
import { TodosFilterSection } from './children/TodoList/TodosFilter';

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
