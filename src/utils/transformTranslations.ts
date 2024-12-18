type FlatMessages = Record<string, string>;
type NestedMessages = Record<string, any>;

/**
 * Custom `set` function to handle nested property setting.
 */
const customSet = (obj: NestedMessages, path: string, value: string): void => {
  const keys = path.split('.'); // Split the key by dots
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i === keys.length - 1) {
      // If it's the last key, assign the value
      current[key] = value;
    } else {
      // If the key doesn't exist, initialize it as an object
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      // Move deeper into the object
      current = current[key];
    }
  }
};

/**
 * Transform flat messages into nested messages.
 */
export const transformTranslations = (flatMessages: FlatMessages): NestedMessages => {
  const nestedMessages: NestedMessages = {};

  Object.entries(flatMessages).forEach(([key, value]) => {
    customSet(nestedMessages, key, value);
  });

  return nestedMessages;
};