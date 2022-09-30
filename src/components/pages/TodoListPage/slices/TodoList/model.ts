// Todo に関するドメイン・ビジネスロジックを型と純粋関数により表現する

import { z } from 'zod';

import { Todo, todoSchema } from 'domains/Todo';

// Reactで扱いたい状態としての型
export type TodoState = Todo & {
  isLoading: boolean;
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
});
export type NewTodo = z.infer<typeof newTodoSchema>;
