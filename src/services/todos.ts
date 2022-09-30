import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { Result } from '@/libs/fetcher';
import { sleep } from '@/utils/sleep';

import { Todo } from 'domains/Todo';

// Todo 関連のAPIリクエストのモック

const data: Todo[] = [
  {
    id: '1',
    title: 'サンプルプロジェクトを作る',
    body: 'Recoil を使ってみてやりたいことができるか確かめる。',
    isComplete: true,
    createdAt: dayjs().subtract(10, 'days').format(),
  },
  {
    id: '2',
    title: 'Recoilのスクラップか記事書く',
    body: '',
    isComplete: false,
    createdAt: dayjs().subtract(5, 'days').format(),
  },
  {
    id: '3',
    title: 'Zustand もやる',
    body: '',
    isComplete: false,
    createdAt: dayjs().subtract(3, 'days').format(),
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
  newTodo: Omit<Todo, 'id' | 'createdAt'>
): Promise<Result<Todo>> => {
  await sleep();
  const todo = { ...newTodo, id: uuidv4(), createdAt: dayjs().format() };
  data.push(todo);
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
