'use client';

import React from 'react';

import { IllustrationNoContent } from '@/components/illustrations';
import { ViewMoreLink } from '@/components/view-more';

import { PATHS } from '@/constants';

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
          Empty
        </h3>
      </div>
    );
  }

  return (
    <div className="w-full min-h-3/5 flex flex-col items-center justify-center ">
      <div className="leading-48 md:leading-72 text-4xl md:text-6xl font-danfo font-bold transform mb-8">
        Projects
      </div>
      <div className="w-full max-w-custom px-6 md:px-0">
        {projects.map((project, index) => (
          <ProjectListItem
            project={project}
            projectLength={projects.length}
            index={index}
            key={index}
          />
        ))}
        <div className="flex justify-center md:justify-end md:mt-4">
          <ViewMoreLink href={PATHS.SITE_PROJECT} />
        </div>
      </div>
    </div>
  );
};
