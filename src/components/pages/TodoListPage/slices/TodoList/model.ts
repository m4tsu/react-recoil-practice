// Todo に関するドメイン・ビジネスロジックを型と純粋関数により表現する

import dayjs from 'dayjs';
import { z } from 'zod';

import { Todo, todoSchema } from 'domains/Todo';

// Reactで扱いたい状態としての型
export type TodoState = Todo & {
  isLoading: boolean;
};

/** 絞り込みの条件 */
export type TodosFilter = 'all' | 'recently';

/** "最近" 作成されたかどうか */
export const isRecently = (todo: Todo) => {
  return dayjs(todo.createdAt) > dayjs().subtract(1, 'week');
};

/** 条件で絞り込む */
export const filterBy = (todos: Todo[], filter: TodosFilter) => {
  switch (filter) {
    case 'all': {
      return todos;
    }
    case 'recently': {
      return todos.filter(isRecently);
    }
  }
};

export const todoInputSchema = todoSchema.omit({ id: true }).extend({
  title: z
    .string()
    .min(5, '5文字以上で入力してください')
    .max(50, '50文字以内で入力してください'),
  body: z.string().max(200, '200文字以内で入力してください'),
  isComplete: z.boolean(),
});

export type TodoInput = z.infer<typeof todoInputSchema>;

/** 新規Todoのスキーマ */
export const newTodoSchema = todoInputSchema.omit({
  id: true,
  isComplete: true,
  createdAt: true,
});
export type NewTodo = z.infer<typeof newTodoSchema>;
