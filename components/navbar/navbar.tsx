'use client';

import React from 'react';

import { useScroll } from 'ahooks';

import { NICKNAME, PATHS, WEBSITE } from '@/constants';
import { cn } from '@/lib/utils';

import { IconLogo } from '../icons';
import { NextLink } from '../next-link';
// import { SwitchLang } from '../switch-lang';
import { SwitchTheme } from '../switch-theme';

export const Navbar = () => {
  const scroll = useScroll(() => document);

  return (
    <header
      className={cn(
        'w-full sticky top-0 backdrop-blur transition-[background-color,border-width] border-x-0  flex justify-center z-10',
        (scroll?.top ?? 0) > 60 && 'bg-background/50 border-b border-border/50',
      )}
    >
      <div className="w-full flex items-center h-16 p-4 sm:p-8 md:max-w-screen-md 2xl:max-w-screen-xl">
        <NextLink
          href={PATHS.SITE_HOME}
          className={cn('mr-4 hidden sm:flex')}
          aria-label={NICKNAME}
        >
          <IconLogo />
          <span className="ml-2 font-bungeeShade text-primary text-base">
            {WEBSITE}
          </span>
        </NextLink>
        <div className="h-16 flex-1 hidden sm:flex justify-end items-center gap-6 text-base font-medium mr-8"></div>
        <div className="flex flex-1 sm:flex-none justify-end items-center gap-1">
          <SwitchTheme />
          {/* <SwitchLang /> */}
        </div>
      </div>
    </header>
  );
};
