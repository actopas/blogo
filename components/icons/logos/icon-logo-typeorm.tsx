/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 17:13:53
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 17:14:10
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconLogoTypeorm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={cn('icon-[logos--typeorm]', className)}></span>
  );
};
