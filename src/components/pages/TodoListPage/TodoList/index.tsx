import { Flex, Text } from '@chakra-ui/react';
import { Suspense } from 'react';

export const TodoList = () => {
  return (
    <Flex direction="column" gap="8">
      <Text as="h2" fontSize="lg" fontWeight="bold">
        TODOリスト
      </Text>
      <Flex>{/* TODO: リスト実装 */}</Flex>
    </Flex>
  );
};
