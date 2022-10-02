import { TodoListPage } from '@/components/pages/TodoListPage';
import { AuthGuard } from '@/services/auth/currentUserContext';

const Page = () => {
  return (
    <AuthGuard>
      <TodoListPage />
    </AuthGuard>
  );
};

export default Page;
