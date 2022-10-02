import { User } from '@/domain-models/User';
import { sleep } from '@/utils/sleep';

const data: User = {
  id: '1',
  name: 'Guest User',
  avatarUrl: 'https://avatars.githubusercontent.com/u/38855085?s=40&v=4',
};

export const getCurrentUser = async (): Promise<User | null> => {
  await sleep();
  return data;
};
