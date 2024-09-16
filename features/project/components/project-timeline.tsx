'use client';

import React from 'react';

import { ProjectListItem } from './project-list-item';

import { type Project } from '../types';

type ProjectListProps = {
  projects: Project[];
};
export const ProjectTimeline = ({ projects }: ProjectListProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen ">
      {projects.map((project, index) => (
        <ProjectListItem
          project={project}
          projectLength={projects.length}
          index={index}
          key={index}
        />
      ))}
    </div>
  );
};
