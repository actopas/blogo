import React from 'react';

import { AdminPageHeader } from '@/components/admin-page-header';
import { IllustrationConstruction } from '@/components/illustrations';

import { PATHS } from '@/constants';

import { AdminContentLayout } from '../../components';

export const AdminHomePage = () => {
  return (
    <AdminContentLayout
      pageHeader={
        <AdminPageHeader
          breadcrumbList={[{ path: PATHS.ADMIN_HOME, label: 'Home' }]}
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
