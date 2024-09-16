/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 18:06:40
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 18:06:57
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoGitlab = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={cn('icon-[logos--gitlab]', className)}></span>
  );
};
