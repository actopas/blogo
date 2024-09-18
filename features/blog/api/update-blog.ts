import { useRequest } from 'ahooks';

import { showErrorToast, showSuccessToast } from '@/components/ui/toast';

import { toggleBlogPublished, updateBlog } from '../actions';

export const useUpdateBlog = () => {
  return useRequest(updateBlog, {
    manual: true,
    loadingDelay: 300,
    onSuccess() {
      showSuccessToast('Success');
    },
    onError(error) {
      showErrorToast(`Fail: ${error.message}`);
    },
  });
};

export const useToggleBlogPublish = () => {
  return useRequest(toggleBlogPublished, {
    manual: true,
    loadingDelay: 300,
    onSuccess() {
      showSuccessToast('Success');
    },
    onError(error) {
      showErrorToast(`Fail: ${error.message}`);
    },
  });
};
