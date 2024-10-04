import { AdminPageHeader } from '@/components/admin-page-header';

import { PATHS } from '@/constants';

import { AdminContentLayout, CreateProjectForm } from '../../components';

export const CreateProjectPage = () => {
  return (
    <AdminContentLayout
      pageHeader={
        <AdminPageHeader
          breadcrumbList={[
            { path: PATHS.ADMIN_HOME, label: 'Home' },
            { path: PATHS.ADMIN_PROJECT, label: 'Project' },
            { path: PATHS.ADMIN_PROJECT_CREATE, label: 'Create' },
          ]}
        />
      }
    >
      <CreateProjectForm />
    </AdminContentLayout>
  );
};
