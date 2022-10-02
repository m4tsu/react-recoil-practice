import { z } from 'zod';

import { schemaForType } from '@/libs/zod/utils';

// 特定の機能に於ける state としてのモデルではなく、アプリケーション全体に於いての Domain Model 的なもの。
// 基本的にはサーバー側にロジックがあるはずなのでそれをそのまま利用するべきだが、フロントに書く必要があるときはここに置く

export type Todo = {
  id: string;
  userId: string;
  title: string;
  body: string;
  isComplete: boolean;
  /** 2022-09-01T00:00:40+09:00 みたいな文字列*/
  createdAt: string;
  /** 完了期限. 2022-09-01T00:00:40+09:00 みたいな文字列*/
  dueDate: string;
  /** 完了期限を延長した回数 */
  postponeCount: number;
};

export const todoSchema = schemaForType<Todo>()(
  z.object({
    id: z.string(),
    userId: z.string(),
    title: z.string(),
    body: z.string(),
    isComplete: z.boolean(),
    createdAt: z.string(),
    dueDate: z.string(),
    postponeCount: z.number(),
  })
);
