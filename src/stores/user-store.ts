import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '@/types/user';

export interface UserState {
  user: IUser | null;
}

export type UserActions = {
  updateUserState: (newUser: IUser) => void;
};

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      user: null,
      updateUserState: (newUser: IUser) => set({ user: newUser }),
    }),
    { name: 'user', skipHydration: true }
  )
);
