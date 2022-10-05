import { TodoListPage } from '@/components/pages/TodoListPage';
import { AuthGuard } from '@/concerns/auth/currentUserContext';

const Page = () => {
  return (
    <AuthGuard>
      <TodoListPage />
    </AuthGuard>
  );
};

export default Page;
