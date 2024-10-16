import { AdminPageHeader } from '@/components/admin-page-header';

import { PATHS } from '@/constants';

import { AdminContentLayout, EditProjectForm } from '../../components';

export const EditProjectPage = () => {
  return (
    <AdminContentLayout
      pageHeader={
        <AdminPageHeader
          breadcrumbList={[
            { path: PATHS.ADMIN_HOME, label: 'Home' },
            { path: PATHS.ADMIN_PROJECT, label: 'Project' },
            { path: PATHS.ADMIN_PROJECT_EDIT, label: 'Edit' },
          ]}
        />
      }
    >
      <EditProjectForm />
    </AdminContentLayout>
  );
};
