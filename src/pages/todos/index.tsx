import { TodoListPage } from '@/components/pages/TodoListPage';
import { AuthGuard } from '@/stores/Auth/usecase';

const Page = () => {
  return (
    <AuthGuard>
      <TodoListPage />
    </AuthGuard>
  );
};

export default Page;
