import React from 'react';

import { IllustrationConstruction } from '@/components/illustrations';
import { PageHeader } from '@/components/page-header';

import { PATHS } from '@/constants';

import { AdminContentLayout } from '../../components';

export const AdminHomePage = () => {
  return (
    <AdminContentLayout
      pageHeader={
        <PageHeader
          breadcrumbList={[{ path: PATHS.ADMIN_HOME, translationKey: 'Home' }]}
        />
      }
    >
      <div className="grid place-content-center mt-[18vh]">
        <IllustrationConstruction className="w-[320px] h-[320px]" />
        <h3 className="text-2xl font-semibold tracking-tight text-center">
          Developing
        </h3>
      </div>
    </AdminContentLayout>
  );
};
