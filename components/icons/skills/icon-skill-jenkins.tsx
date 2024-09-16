/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 17:43:38
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 17:47:37
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconSkillJenkinsDark = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--jenkins-dark]', className)}
    ></span>
  );
};

export const IconSkillJenkinsLight = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--jenkins-light]', className)}
    ></span>
  );
};
