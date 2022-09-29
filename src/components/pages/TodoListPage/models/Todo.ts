// Todo に関するドメイン・ビジネスロジックを型と純粋関数により表現する

import { z } from 'zod';

import { Todo, todoSchema } from 'domains/Todo';

// Reactで扱いたい状態としての型
export type TodoState = Todo & {
  isEditing: boolean;
};

/** 新規Todoのスキーマ */
export const newTodoSchema = todoSchema.omit({ id: true }).extend({
  title: z
    .string()
    .min(5, '5文字以上で入力してください')
    .max(50, '50文字以内で入力してください'),
  body: z.string().max(200, '200文字以内で入力してください'),
});
export type NewTodo = z.infer<typeof newTodoSchema>;
