import { useRequest } from 'ahooks';

import { showErrorToast, showSuccessToast } from '@/components/ui/toast';

import { deleteNoteByID } from '../actions';

export const useDeleteNote = () => {
  return useRequest(deleteNoteByID, {
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
