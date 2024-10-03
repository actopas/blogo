import { PageHeader } from '@/components/page-header';

import { PATHS } from '@/constants';

import { AdminContentLayout, EditProjectForm } from '../../components';

export const EditProjectPage = () => {
  return (
    <AdminContentLayout
      pageHeader={
        <PageHeader
          breadcrumbList={[
            { path: PATHS.ADMIN_HOME, translationKey: 'Home' },
            { path: PATHS.ADMIN_PROJECT, translationKey: 'Project' },
            { path: PATHS.ADMIN_PROJECT_EDIT, translationKey: 'Edit' },
          ]}
        />
      }
    >
      <EditProjectForm />
    </AdminContentLayout>
  );
};
