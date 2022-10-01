import { atom, selector } from 'recoil';

import { generateUniqueKey } from '@/libs/recoil/utils';

import { Todo } from '../Todo/model';
import { todoEntity, todosQuery } from '../Todo/state';

import { filterBy, TodosFilter } from './model';

// todoEntity だけでは リストの順番が保てないので id のリストを別に持つ。
// Redux で {allIds: Id[], byId: {[id: Id]: Todo}} みたいな正規化した形でもっていたのと同じ
export const todoIds = atom<Todo['id'][]>({
  key: generateUniqueKey('todoIds'),
  default: selector({
    key: generateUniqueKey('toodIds_default'),
    get: ({ get }) => {
      return get(todosQuery).map((todo) => todo.id);
    },
  }),
});

/** TodoList の絞り込み条件 */
export const todosFilter = atom<TodosFilter>({
  key: generateUniqueKey('todosFilter'),
  default: 'all',
});

/** 絞り込み */
export const filterdTodoIds = selector<Todo['id'][]>({
  key: generateUniqueKey('filterdTodoIds'),
  get: ({ get }) => {
    const all = get(todoIds).map((id) => get(todoEntity(id)));
    const filter = get(todosFilter);
    return filterBy(all, filter).map((todo) => todo.id);
  },
});

/** 編集中 の Todo の Id */
export const editingTodoId = atom<Todo['id'] | null>({
  key: generateUniqueKey('editingTodoId'),
  default: null,
});

export const editingTodo = selector<Todo | null>({
  key: generateUniqueKey('editingTodo'),
  get: ({ get }) => {
    const id = get(editingTodoId);
    return id ? get(todoEntity(id)) : null;
  },
});
