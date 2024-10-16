'use client';

import React from 'react';

import { useTheme } from 'next-themes';
import Image from 'next/image';

import { useLoading } from '@/components/loading-context';

export const LoadingAnimation: React.FC = () => {
  const { isLoading } = useLoading();
  const { resolvedTheme } = useTheme();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background backdrop-blur-sm dark:bg-background">
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full border-4 border-neutral-200 dark:border-neutral-700 rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-t-primary dark:border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={
              resolvedTheme === 'dark'
                ? '/images/favicon-dark.ico'
                : '/images/favicon-light.ico'
            }
            alt="Loading"
            width={24}
            height={24}
            className="w-8 h-8"
          />
        </div>
      </div>
    </div>
  );
};
