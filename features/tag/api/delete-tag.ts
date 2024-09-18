import { useRequest } from 'ahooks';

import { showErrorToast, showSuccessToast } from '@/components/ui/toast';

import { deleteTagByID } from '../actions';

export const useDeleteTag = () => {
  return useRequest(deleteTagByID, {
    manual: true,
    onSuccess() {
      showSuccessToast('Success');
    },
    onError(error) {
      showErrorToast(`Fail: ${error.message}`);
    },
  });
};
