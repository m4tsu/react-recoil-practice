import { Flex, Text } from '@chakra-ui/react';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import { Loading } from '@/components/ui/Loading';

import { TodoList } from './elements/TodoList';

export const TodoListPage = () => {
  return (
    <Flex direction="column" gap="4">
      <Text as="h1" fontWeight="bold" fontSize="2xl">
        TODOリストページ
      </Text>
      <RecoilRoot>
        <Suspense fallback={<Loading />}>
          <TodoList />
        </Suspense>
      </RecoilRoot>
    </Flex>
  );
};
