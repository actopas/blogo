/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:24
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-15 22:49:49
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconPhHandArrow = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[ph--hand-arrow-up-duotone]', className)}
    ></span>
  );
};
//fa6-brands--x-twitter
//fa6-brands--telegram
//fa6-brands--discord
