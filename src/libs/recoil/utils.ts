import { v4 as uuidv4 } from 'uuid';

/** 一意なkeyであることを担保するため、末尾に uuid を付けて返す */
export const generateUniqueKey = <T extends string>(
  key: T
): `${T}_${string}` => {
  return `${key}_${uuidv4()}`;
};
