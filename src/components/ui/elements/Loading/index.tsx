import { CircularProgress, Flex } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <Flex justifyContent="center" alignItems="center" p="4">
      <CircularProgress isIndeterminate color="cyan.400" />
    </Flex>
  );
};
