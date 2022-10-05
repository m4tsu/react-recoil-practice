import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { Todo } from '@/domain-models/Todo';
import { Result } from '@/libs/fetcher';
import { sleep } from '@/utils/sleep';

// Todo 関連のAPIリクエストのモック

let data: Todo[] = [
  {
    id: '3',
    userId: '1',
    title: 'Zustand もやる',
    body: '',
    isComplete: false,
    createdAt: dayjs().subtract(3, 'days').format(),
    dueDate: dayjs().subtract(3, 'days').add(7, 'days').format(),
    postponeCount: 0,
  },
  {
    id: '2',
    userId: '2',
    title: 'Recoilのスクラップか記事書く',
    body: '',
    isComplete: false,
    createdAt: dayjs().subtract(5, 'days').format(),
    dueDate: dayjs().subtract(5, 'days').add(7, 'days').format(),
    postponeCount: 0,
  },
  {
    id: '1',
    userId: '1',
    title: 'サンプルプロジェクトを作る',
    body: 'Recoil を使ってみてやりたいことができるか確かめる。',
    isComplete: true,
    createdAt: dayjs().subtract(10, 'days').format(),
    dueDate: dayjs().subtract(10, 'days').add(7, 'days').format(),
    postponeCount: 0,
  },
];

const generateResponse = <T>(data: T): Result<T> => {
  return {
    data,
    error: undefined,
  };
};

export const getTodos = async (): Promise<Result<Todo[]>> => {
  await sleep();
  return generateResponse(data);
};

export const postTodo = async (
  userId: Todo['userId'],
  newTodo: Pick<Todo, 'title' | 'body'>
): Promise<Result<Todo>> => {
  await sleep();
  const todo: Todo = {
    ...newTodo,
    id: uuidv4(),
    userId,
    isComplete: false,
    createdAt: dayjs().format(),
    dueDate: dayjs().add(7, 'days').format(),
    postponeCount: 0,
  };
  data = [todo, ...data];
  return generateResponse(todo);
};

export const patchTodo = async ({
  id,
  params,
}: {
  id: Todo['id'];
  params: Omit<Todo, 'id'>;
}): Promise<Result<Todo>> => {
  await sleep();
  const todo = data.find((todo) => todo.id === id);
  if (todo === undefined) throw new Error('not found');
  return generateResponse({ ...todo, ...params, id });
};

export const updateStatus = async (id: Todo['id'], isComplete: boolean) => {
  await sleep();
  const todo = data.find((todo) => todo.id === id);
  if (todo === undefined) throw new Error('not found');
  return generateResponse({ ...todo, isComplete, id });
};

export const postpone = async (id: Todo['id']) => {
  await sleep();
  const todo = data.find((todo) => todo.id === id);
  if (todo === undefined) throw new Error('not found');
  return generateResponse({
    ...todo,
    id,
    postponeCount: todo.postponeCount + 1,
    dueDate: dayjs(todo.dueDate).add(3, 'days').format(),
  });
};
