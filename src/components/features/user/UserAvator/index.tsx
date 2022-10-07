import { Avatar } from '@chakra-ui/react';
import { FC } from 'react';

type Props = {
  name: string;
  avatarUrl?: string | undefined;
};
export const UserAvator: FC<Props> = ({ name, avatarUrl }) => {
  if (avatarUrl) {
    return <Avatar name={name} src={avatarUrl} />;
  }
  return <Avatar name={name} />;
};
