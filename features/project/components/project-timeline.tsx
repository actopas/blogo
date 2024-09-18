'use client';

import React from 'react';

import { IllustrationNoContent } from '@/components/illustrations';

import { ProjectListItem } from './project-list-item';

import { type Project } from '../types';

type ProjectListProps = {
  projects: Project[];
};
export const ProjectTimeline = ({ projects }: ProjectListProps) => {
  if (!projects.length) {
    return (
      <div className="grid h-1/2 gap-8 place-content-center ">
        <IllustrationNoContent className="w-[30vh] h-[30vh]" />
        <h3 className="text-2xl font-semibold tracking-tight text-center">
          NO DATA
        </h3>
      </div>
    );
  }
  return (
    <div className="w-full min-h-3/5 flex flex-col items-center justify-center ">
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
