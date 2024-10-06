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
    // 在客户端挂载完成后，将 isMounted 设置为 true
    setIsMounted(true);
  }, []);
  const icon = React.useMemo(() => {
    if (!isMounted) {
      // 在未挂载时，显示 loading 图标
      return <IconMingcuteLoadingLine className="animate-spin text-base" />;
    }

    if (resolvedTheme === 'light' || theme === 'light') {
      return <IconSolarSun className="text-base" />;
    }

    if (resolvedTheme === 'dark' || theme === 'dark') {
      return <IconSolarMoonStars className="text-base" />;
    }

    // 默认返回 loading 图标
    return <IconMingcuteLoadingLine className="animate-spin text-base" />;
  }, [resolvedTheme, theme, isMounted]);

  return (
    <Button
      aria-label="Switch Theme"
      variant="ghost"
      size={'icon'}
      onClick={() => {
        // 切换主题
        setTheme(theme === 'light' ? 'dark' : 'light');
      }}
      {...props}
    >
      {icon} {/* 这里显示当前的图标，根据当前的主题更新图标 */}
    </Button>
  );
}
