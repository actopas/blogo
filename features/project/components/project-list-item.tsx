'use client';

import React from 'react';

import { ProjectItemCard } from './project-item-card';

import { type Project } from '../types';

type ProjectListItemProps = {
  project: Project;
  projectLength: number;
  index: number;
};

export const ProjectListItem = ({
  project,
  projectLength,
  index,
}: ProjectListItemProps) => {
  return (
    <div className="w-full flex items-center justify-between max-w-custom">
      {/* Time line container */}
      <div className="hidden md:flex flex-col items-center mr-8">
        {/* The points above */}
        <div className="flex flex-col items-center ">
          {Array.from({ length: 10 }, (_, i: number) => (
            <div
              key={`top-${index}-${i}`}
              className={`h-2 w-2 mb-2 rotate-45 rounded-sm ${
                index === 0 ? '' : 'bg-black dark:bg-white'
              }`}
            ></div>
          ))}
        </div>
        <div className="h-8 w-8 bg-black dark:bg-white my-4 rotate-45 rounded-lg"></div>
        <div className="flex flex-col items-center mt-2">
          {Array.from({ length: 10 }, (_, i: number) => (
            <div
              key={`bottom-${index}-${i}`}
              className={`h-2 w-2 mb-2 rotate-45 rounded-sm ${
                index === projectLength - 1 ? '' : 'bg-black dark:bg-white'
              }`}
            ></div>
          ))}
        </div>
      </div>
      <ProjectItemCard project={project} />
    </div>
  );
};
