import dayjs from 'dayjs';

// データを表示用に変換するロジックを書く層
// 必ず書くのは多分面倒なので、必要がでてきたときの置き場くらいでいい気がする
// selector で加工したオブジェクトとして提供しても良さそうだけど、各ロジックを関数に抽出するほうが優先度がたかくて、そうすると結局なんかめんどくさい気がする

export const getFormattedDateString = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const getTodoStatusLabel = (isComplete: boolean) => {
  return isComplete ? '完了' : '未完了';
};
