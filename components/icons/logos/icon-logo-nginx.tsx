/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 17:40:37
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 19:57:51
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoNginx = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={cn('icon-[logos--nginx]', className)}></span>
  );
};
