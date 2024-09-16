/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 17:10:46
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 17:11:03
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconSkillMongodb = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--mongodb]', className)}
    ></span>
  );
};
