/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 17:40:37
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 19:57:28
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoServerless = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[logos--serverless]', className)}
    ></span>
  );
};
