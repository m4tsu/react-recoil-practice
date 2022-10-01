import { Flex, Text } from '@chakra-ui/react';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import { Loading } from '@/components/ui/Loading';

import { TodoList } from './TodoList';

export const TodoManagement = () => {
  return (
    <Flex direction="column" gap="4">
      <Text as="h1" fontWeight="bold" fontSize="2xl">
        TODO管理機能
      </Text>
      <RecoilRoot>
        <Suspense fallback={<Loading />}>
          <TodoList />
        </Suspense>
      </RecoilRoot>
    </Flex>
  );
};
