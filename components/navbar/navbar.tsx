'use client';

import React from 'react';

import { Bungee_Shade } from 'next/font/google';

import { useScroll } from 'ahooks';

import { NICKNAME, PATHS, WEBSITE } from '@/constants';
import { cn } from '@/lib/utils';

import { IconLogoDark, IconLogoLight } from '../icons';
import { NextLink } from '../next-link';
import { SwitchLang } from '../switch-lang';
import { SwitchTheme } from '../switch-theme';

// Configure Bungee Shade font
const bungeeShade = Bungee_Shade({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bungee-shade', // Define a CSS variable
});

export const Navbar = () => {
  const scroll = useScroll(() => document);

  return (
    <header
      className={cn(
        'w-full sticky top-0 backdrop-blur transition-[background-color,border-width] border-x-0  flex justify-center z-10',
        (scroll?.top ?? 0) > 60 && 'bg-background/50 border-b border-border/50',
      )}
    >
      <div className="w-full flex items-center h-16 p-4 sm:p-8 ">
        <NextLink
          href={PATHS.SITE_HOME}
          className={cn('mr-4 pl-0 flex items-center')}
          aria-label={NICKNAME}
        >
          <>
            <IconLogoDark className="dark:hidden ml-2 mr-1" />
            <IconLogoLight className="hidden dark:inline-block ml-2 mr-1" />
          </>
          <div
            className={`sm:flex hidden items-center ml-2 ${bungeeShade.className} text-primary text-base`}
          >
            {WEBSITE}
          </div>
        </NextLink>
        <div className="h-16 flex-1 hidden sm:flex justify-end items-center gap-6 text-base font-medium mr-8"></div>
        <div className="flex flex-1 sm:flex-none justify-end items-center gap-1">
          <SwitchTheme />
          <SwitchLang />
        </div>
      </div>
    </header>
  );
};
