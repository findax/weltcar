export const hasTranslation = (t: (key: string) => string, key: string) => {
  const value = t(key);
  return value !== key && value.trim() !== '';
};
