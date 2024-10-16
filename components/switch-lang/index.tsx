'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { type VariantProps } from 'class-variance-authority';

import { Button, type buttonVariants } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import { IconMingcuteLoadingLine, IconSolarGlobal } from '../icons';

// Define language options
const langOptions = [
  {
    value: 'en',
    label: 'English',
    icon: <IconSolarGlobal className="text-base" />,
  },
  {
    value: 'zh',
    label: '中文',
    icon: <IconSolarGlobal className="text-base" />,
  },
];

export type Props = VariantProps<typeof buttonVariants>;

export function SwitchLang(props: Props) {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('LanguageSwitcher');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const icon = useMemo(() => {
    const currentLangOption = langOptions.find((lang) => lang.value === locale);
    return currentLangOption ? (
      currentLangOption.icon
    ) : (
      <IconMingcuteLoadingLine className="animate-spin text-base" />
    );
  }, [locale]);

  if (!isMounted) return null;

  const handleLangSwitch = (lang: string) => {
    try {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(`/${locale}`, `/${lang}`);
      router.push(newPath);
      setOpen(false);
    } catch (error) {
      throw new Error('Failed to switch language');
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          aria-label={t('switch_language')}
          variant="ghost"
          size="icon"
          {...props}
        >
          {icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100px] p-0">
        <Command>
          <CommandGroup>
            {langOptions.map((el) => (
              <CommandItem
                key={el.value}
                value={el.value}
                onSelect={() => handleLangSwitch(el.value)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      locale === el.value ? 'opacity-100' : 'opacity-50',
                      'flex items-center',
                    )}
                  >
                    {el.icon}
                  </div>
                  <div
                    className={cn(
                      'text-sm',
                      locale === el.value ? 'opacity-100' : 'opacity-50',
                    )}
                  >
                    {el.label}
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
