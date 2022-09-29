import { z } from 'zod';

import { schemaForType } from '@/libs/zod/utils';

export type Todo = {
  id: string;
  title: string;
  body: string;
  isComplete: boolean;
};

export const todoSchema = schemaForType<Todo>()(
  z.object({
    id: z.string(),
    title: z.string(),
    body: z.string(),
    isComplete: z.boolean(),
  })
);
