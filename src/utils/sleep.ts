export const sleep = (msec = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, msec));
};
