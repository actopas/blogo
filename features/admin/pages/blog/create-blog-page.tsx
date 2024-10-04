import { AdminPageHeader } from '@/components/admin-page-header';

import { PATHS } from '@/constants';

import { AdminContentLayout, CreateBlogForm } from '../../components';

export const CreateBlogPage = () => {
  return (
    <AdminContentLayout
      pageHeader={
        <AdminPageHeader
          breadcrumbList={[
            { path: PATHS.ADMIN_HOME, label: 'Home' },
            { path: PATHS.ADMIN_BLOG, label: 'Blog' },
            {
              path: PATHS.ADMIN_BLOG_CREATE,
              label: 'Create Blog',
            },
          ]}
        />
      }
    >
      <CreateBlogForm />
    </AdminContentLayout>
  );
};
