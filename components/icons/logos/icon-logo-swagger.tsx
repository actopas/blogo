/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 17:40:37
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 19:12:35
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoSwagger = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={cn('icon-[logos--swagger]', className)}></span>
  );
};
