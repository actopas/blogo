/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 22:14:30
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 22:16:08
 */
'use client';

import React, { useEffect, useMemo, useState } from 'react';

// 从 next/navigation 导入 useRouter
import { useTranslation } from 'next-i18next';
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

/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 22:14:30
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 22:16:08
 */

// 定义语言选项
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
  const [isMounted, setIsMounted] = useState(false); // 用于检测组件是否挂载
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const router = useRouter(); // 使用 next/navigation 中的 useRouter

  // useEffect 只在组件挂载时设置 isMounted 为 true
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 确保 useMemo 在组件渲染时总是被调用
  const icon = useMemo(() => {
    const currentLangOption = langOptions.find(
      (lang) => lang.value === currentLang,
    );
    return currentLangOption ? (
      currentLangOption.icon
    ) : (
      <IconMingcuteLoadingLine className="animate-spin text-base" />
    );
  }, [currentLang]);

  // 如果组件未挂载，不渲染内容
  if (!isMounted) return null;

  const handleLangSwitch = (lang: string) => {
    try {
      const currentPath = window.location.pathname; // 使用 window.location 获取路径
      router.push(`/${lang}${currentPath}`); // 使用 router.push 进行导航
      setOpen(false);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // console.error('Language switch failed:', error);
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          aria-label="切换语言"
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
                      currentLang === el.value ? 'opacity-100' : 'opacity-50',
                      'flex items-center',
                    )}
                  >
                    {el.icon}
                  </div>
                  <div
                    className={cn(
                      'text-sm',
                      currentLang === el.value ? 'opacity-100' : 'opacity-50',
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
