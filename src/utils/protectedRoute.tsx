'use client';

import { useUserStore } from '@/stores/user-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export enum UserRole {
  user = 'user',
  partner = 'partner',
}

interface IProps {
  children: React.ReactNode;
  role: UserRole;
}

export const ProtectedRoute = ({ role, children }: IProps) => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {

    if (role === UserRole.user) {
      if (user && user.contractor_id) {
        router.push('/');
      }
    }
    if (role === UserRole.partner) {
      if (user && !user.contractor_id) {
        router.push('/');
      }
    }
  }, [user, role]);

  return user && children
};
