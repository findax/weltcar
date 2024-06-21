'use client';

import { create } from 'zustand';
import { IUser } from '@/types/user';

export interface UserState {
  user: IUser | null;
  updateUserState: (newUser: IUser) => void;
}

export const getUserFromStorage = () => {
  if (typeof sessionStorage !== 'undefined') {
    const storage = sessionStorage.getItem('auth');

    if (storage) {
      return JSON.parse(storage).user;
    }
    return null;
  } else {
    return null;
  }
};

const useStore = create<UserState>((set) => ({
  user: getUserFromStorage(),
  updateUserState: (newUser: IUser) => set({ user: newUser }),
}));

export default useStore;
