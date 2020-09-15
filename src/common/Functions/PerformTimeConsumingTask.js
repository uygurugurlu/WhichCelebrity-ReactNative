export const PerformTimeConsumingTask = async (timeout) => {
  return new Promise((resolve) => setTimeout(() => {
    resolve('result');
  }, timeout));
};
