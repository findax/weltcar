'use client';

import { useThemeMode } from '@/hooks/useThemeMode';
import Image from 'next/image';

function ThemedImage({
  lightSrc,
  darkSrc,
  ...props
}: {
  lightSrc: any;
  darkSrc: any;
  alt: string;
  [key: string]: any;
}) {
  const { isDarkMode, mounted } = useThemeMode();

  if (!mounted) return;

  return <Image src={isDarkMode ? darkSrc : lightSrc} {...props} />;
}

export default ThemedImage;
