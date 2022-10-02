import { atom } from 'recoil';

import { generateUniqueKey } from '@/libs/recoil/utils';

import { Auth } from './model';

export const auth = atom<Auth>({
  key: generateUniqueKey('auth'),
  default: {
    isLoading: false,
    currentUser: undefined,
    authenticated: undefined,
  },
});
