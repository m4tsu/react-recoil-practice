import { isRecently, Todo } from '../Todo/model';

/** 絞り込みの条件 */
export type TodosFilter = 'all' | 'recently';

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
