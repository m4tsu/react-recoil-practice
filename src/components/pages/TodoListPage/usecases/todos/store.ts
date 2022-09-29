import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilValue,
} from 'recoil';

import { generateUniqueKey } from '@/libs/recoil/utils';
import { getTodos } from '@/services/todos';

import { TodoState } from '../../models/Todo';

import { Todo } from 'domains/Todo';

/** フェッチした Todos のキャッシュ */
const todosQuery = selector<Todo[]>({
  key: generateUniqueKey('todosQuery'),
  get: async () => {
    const res = await getTodos();
    if (res.error) {
      throw res.error; // ErrorBoundary で処理
    }
    return res.data;
  },
});

// Reactの状態としての todo
const todoEntity = atomFamily<TodoState, TodoState['id']>({
  key: generateUniqueKey('todoEntity'),
  default: selectorFamily({
    key: generateUniqueKey('todoEntity_default'),
    get:
      (todoId) =>
      ({ get }) => {
        // フェッチしてきた todos から state を生成する
        const todo = get(todosQuery).find((todo) => todo.id === todoId);
        if (todo === undefined) throw new Error('Unexpected');
        return { ...todo, isEditing: false };
      },
  }),
});
// todoEntity だけでは リストの順番が保てないので id のリストを別に持つ。
// Redux で {allIds: Id[], byId: {[id: Id]: Todo}} みたいな正規化した形でもっていたのと同じ
const todoIds = atom<TodoState['id'][]>({
  key: generateUniqueKey('todoIds'),
  default: selector({
    key: generateUniqueKey('toodIds_default'),
    get: ({ get }) => {
      return get(todosQuery).map((todo) => todo.id);
    },
  }),
});

// 「状態管理」の責務をここに閉じ込めるために、 atom をコンポーネントで直接使わせない
// Recoil 特有のAPIをコンポーネントに表出させない。所謂 腐敗防止層
export const useTodoIds = () => useRecoilValue(todoIds);
export const useTodo = (todoId: TodoState['id']) =>
  useRecoilValue(todoEntity(todoId));
