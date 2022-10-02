import {
  Divider,
  Flex,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { FC, useCallback } from 'react';

import { toast } from '@/libs/chakra/toast';

import { Todo } from '../../store/Todo/model';
import { todoActions } from '../../store/Todo/usecase';
import {
  todoListActions,
  useFilteredTodoIds,
} from '../../store/TodoList/usecase';

import { EditTodoModal } from './EditTodoModal';
import { TodoListItem } from './TodoListItem';

const { useStartEditing } = todoListActions;
const { useToggleStatus, usePostpone } = todoActions;

export const TodoList: FC = () => {
  const todoIds = useFilteredTodoIds();
  const toggleStatus = useToggleStatus();
  const postpone = usePostpone();
  const startEditing = useStartEditing();

  const handleClickPostpone = useCallback(
    async (todoId: Todo['id']) => {
      const { errors } = await postpone(todoId);
      if (errors) {
        toast({
          title: '期限の延長ができませんでした。',
          status: 'error',
          description: errors.map((e) => <Text key={e}>- {e}</Text>),
          position: 'top-right',
        });
      }
    },
    [postpone]
  );

  return (
    <Flex direction="column" gap="8">
      <Text as="h2" fontSize="lg" fontWeight="bold">
        TODOリスト
      </Text>
      <Flex direction="column" gap="4">
        <UnorderedList m="0" width="full">
          {todoIds.map((todoId) => (
            <TodoListItem
              key={todoId}
              todoId={todoId}
              onClickStatus={toggleStatus}
              onClickEdit={startEditing}
              onClickPostpone={handleClickPostpone}
            />
          ))}
        </UnorderedList>
      </Flex>
      <EditTodoModal />
    </Flex>
  );
};
