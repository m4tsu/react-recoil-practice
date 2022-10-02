import { TodoListPage } from '@/components/pages/TodoListPage';
import { AuthGuard } from '@/store/Auth/usecase';

const Page = () => {
  return (
    <AuthGuard>
      <TodoListPage />
    </AuthGuard>
  );
};

export default Page;
