/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:24
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-15 17:59:36
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconPhGithub = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[ph--github-logo-bold]', className)}
    ></span>
  );
};
