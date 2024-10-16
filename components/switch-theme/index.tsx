'use client';

import React, { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { type VariantProps } from 'class-variance-authority';

import { Button, type buttonVariants } from '@/components/ui/button';

import {
  IconMingcuteLoadingLine,
  IconSolarMoonStars,
  IconSolarSun,
} from '../icons';

export type Props = VariantProps<typeof buttonVariants>;

export function SwitchTheme(props: Props) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // After the client is mounted, set isMounted to true
    setIsMounted(true);
  }, []);
  const icon = React.useMemo(() => {
    if (!isMounted) {
      // When not mounted, display the loading icon
      return <IconMingcuteLoadingLine className="animate-spin text-base" />;
    }

    if (resolvedTheme === 'light' || theme === 'light') {
      return <IconSolarSun className="text-base" />;
    }

    if (resolvedTheme === 'dark' || theme === 'dark') {
      return <IconSolarMoonStars className="text-base" />;
    }

    // Default return loading icon
    return <IconMingcuteLoadingLine className="animate-spin text-base" />;
  }, [resolvedTheme, theme, isMounted]);

  return (
    <Button
      aria-label="Switch Theme"
      variant="ghost"
      size={'icon'}
      onClick={() => {
        // Switch theme
        setTheme(theme === 'light' ? 'dark' : 'light');
      }}
      {...props}
    >
      {icon}{' '}
      {/* Display the current icon, update the icon based on the current theme */}
    </Button>
  );
}
