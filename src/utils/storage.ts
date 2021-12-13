export const setStorage = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key: string) => {
  const item = JSON.parse(localStorage.getItem(key) || '{}');
  return item;
};

export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};
