import { set } from 'lodash';

type FlatMessages = Record<string, string>;
type NestedMessages = Record<string, any>;

export const transformTranslations = (flatMessages: FlatMessages): NestedMessages => {
    return Object.entries(flatMessages).reduce((acc, [key, value]) => {
        set(acc, key, value);
        return acc;
    }, {});
};
