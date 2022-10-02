import { User } from '@/domain-models/User';

export type CurrentUser = User;

export type Auth =
  /** 未認証 */
  | {
      isLoading: false;
      currentUser: undefined;
      authenticated: undefined;
    }
  /** 認証中 */
  | {
      isLoading: true;
      currentUser: undefined;
      authenticated: undefined;
    }
  /** 認証済み */
  | {
      isLoading: false;
      currentUser: User;
      authenticated: true;
    }
  /** 認証失敗 */
  | {
      isLoading: false;
      currentUser: undefined;
      authenticated: false;
    };
