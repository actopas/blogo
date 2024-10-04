/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:25
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 00:50:10
 */
import { AdminPageHeader } from '@/components/admin-page-header';

import { PATHS } from '@/constants';

import { AdminContentLayout, EditBlogForm } from '../../components';

export const EditBlogPage = () => {
  return (
    <AdminContentLayout
      pageHeader={
        <AdminPageHeader
          breadcrumbList={[
            { path: PATHS.ADMIN_HOME, label: 'Home' },
            { path: PATHS.ADMIN_BLOG, label: 'Blog' },
            {
              path: PATHS.ADMIN_BLOG_EDIT,
              label: 'Edit Blog',
            },
          ]}
        />
      }
    >
      <EditBlogForm />
    </AdminContentLayout>
  );
};
