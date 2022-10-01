// Todo に関するドメイン・ビジネスロジックを型と純粋関数により表現する

import dayjs from 'dayjs';
import { z } from 'zod';

import { Todo as TodoDomain, todoSchema } from '@/domains/Todo';

// Todo という状態をモデリングして表現する層

// Reactで扱いたい状態としての型
export type Todo = TodoDomain & {
  isLoading: boolean;
};

const POSTPONE_LIMIT = 1;

/** "最近" 作成されたかどうか */
export const isRecently = (todo: Todo) => {
  return dayjs(todo.createdAt) > dayjs().subtract(1, 'week');
};

/** 期限を延長できるかどうか */
export const canPostPone = (
  todo: Pick<Todo, 'isComplete' | 'dueDate' | 'postponeCount'>
) => {
  // 既に完了している
  if (todo.isComplete) return false;
  // 既に期限が過ぎている
  if (dayjs() > dayjs(todo.dueDate)) return false;
  // 回数制限に達している
  if (todo.postponeCount >= POSTPONE_LIMIT) return false;
  return true;
};

export const todoInputSchema = todoSchema
  .omit({ id: true, dueDate: true, postponeCount: true })
  .extend({
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
