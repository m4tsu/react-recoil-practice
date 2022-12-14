import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { UserAvator } from '@/components/features/User-domain/UserAvator';
import { Loading } from '@/components/ui/elements/Loading';
import { useAuth } from '@/concerns/auth/store/usecase';

export const UserMenu: FC = () => {
  const { isLoading, currentUser } = useAuth();

  if (isLoading) return <Loading />;

  return (
    <Box w="10" h="10">
      {currentUser ? <UserAvator {...currentUser} /> : <Text>ログイン</Text>}
    </Box>
  );
};
