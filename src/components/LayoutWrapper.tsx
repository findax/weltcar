'use client';

import { useThemeMode } from '@/hooks/useThemeMode';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mounted } = useThemeMode();

  return (
    <div
      style={{ display: mounted ? undefined : 'none' }}
      className='flex flex-col min-h-screen'
    >
      {children}
    </div>
  );
}
