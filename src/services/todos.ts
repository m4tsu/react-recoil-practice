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
  },
  {
    id: '2',
    title: 'Recoilのスクラップか記事書く',
    body: '',
    isComplete: false,
  },
  { id: '3', title: 'Zustand もやる', body: '', isComplete: false },
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

export const createTodo = async (
  newTodo: Omit<Todo, 'id'>
): Promise<Result<Todo>> => {
  await sleep();
  const todo = { ...newTodo, id: uuidv4() };
  data.push(todo);
  return generateResponse(todo);
};

export const updateTodo = async ({
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
