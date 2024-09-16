/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 17:40:37
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 17:40:49
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoEslint = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[logos--eslint-old]', className)}
    ></span>
  );
};
