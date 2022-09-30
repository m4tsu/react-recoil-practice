import { z } from 'zod';

import { schemaForType } from '@/libs/zod/utils';

export type Todo = {
  id: string;
  title: string;
  body: string;
  isComplete: boolean;
  /** 2022-09-01T00:00:40+09:00 みたいな文字列*/
  createdAt: string;
};

export const todoSchema = schemaForType<Todo>()(
  z.object({
    id: z.string(),
    title: z.string(),
    body: z.string(),
    isComplete: z.boolean(),
    createdAt: z.string(),
  })
);
