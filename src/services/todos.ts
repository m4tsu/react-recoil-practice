import { v4 as uuidv4 } from 'uuid';

import { sleep } from '@/utils/sleep';

// Todo 関連のAPIリクエストのモック

type Todo = {
  id: string;
  title: string;
  body: string;
  isComplete: boolean;
};

const data: Todo[] = [
  {
    id: '1',
    title: 'サンプルプロジェクトを作る',
    body: 'Recoil を使ってみてやりたいことができるか確かめる。',
    isComplete: false,
  },
  {
    id: '2',
    title: 'Recoilのスクラップか記事書く',
    body: '',
    isComplete: false,
  },
  { id: '3', title: 'Zustand もやる', body: '', isComplete: false },
];

export const getTodos = async (): Promise<Todo[]> => {
  await sleep();
  return data;
};

export const createTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  await sleep();
  const todo = { ...newTodo, id: uuidv4() };
  data.push(todo);
  return todo;
};

export const updateTodo = async ({
  id,
  params,
}: {
  id: Todo['id'];
  params: Omit<Todo, 'id'>;
}): Promise<Todo> => {
  await sleep();
  const todo = data.find((todo) => todo.id === id);
  if (todo === undefined) throw new Error('not found');
  return { ...todo, ...params, id };
};
