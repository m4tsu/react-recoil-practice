// Todo に関するドメイン・ビジネスロジックを型と純粋関数により表現する

import dayjs from 'dayjs';
import { z } from 'zod';

import { CurrentUser } from '@/concerns/auth/store/model';
import { Todo as TodoDomain, todoSchema } from '@/domain-models/Todo';

// Todo という状態をモデリングして表現する層

const MAX_POSTPONE_COUNT = 1;

// Reactで扱いたい状態としての型
export type Todo = TodoDomain & {
  isLoading: boolean;
};

export const isEditable = (todo: Todo, currentUserId: CurrentUser['id']) => {
  return currentUserId === todo.userId;
};

/** "最近" 作成されたかどうか */
export const isRecently = (todo: Todo) => {
  return dayjs(todo.createdAt) > dayjs().subtract(1, 'week');
};

/** 期限を過ぎているかどうか */
export const isOverdue = (todo: Pick<Todo, 'dueDate'>) => {
  return dayjs() > dayjs(todo.dueDate);
};

/** 期限を延長できるかどうか */
export const canPostPoneSchema = todoSchema.superRefine((todo, ctx) => {
  if (todo.isComplete) {
    ctx.addIssue({
      code: 'custom',
      message: '既に完了しています。',
    });
  }
  if (isOverdue(todo)) {
    ctx.addIssue({
      code: 'custom',
      message: '既に期限が過ぎています。',
    });
  }
  if (todo.postponeCount >= MAX_POSTPONE_COUNT) {
    ctx.addIssue({
      code: 'custom',
      message: '期限は一度しか延期できません。',
    });
  }
});

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
export const newTodoSchema = todoInputSchema.pick({
  title: true,
  body: true,
});
export type NewTodo = z.infer<typeof newTodoSchema>;
