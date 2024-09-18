'use client';

import { Editor, type EditorProps } from '@bytemd/react';
import zh_Hans from 'bytemd/locales/zh_Hans.json';

import { uploadFile } from '@/features/upload';

import { plugins, sanitize } from './config';

import {
  hideToast,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from '../ui/toast';

type BytemdEditorProps = {
  body?: string;
  setContent: (body: string) => void;
  editorProps?: Partial<EditorProps>;
};

export const BytemdEditor = ({
  body,
  setContent,
  editorProps,
}: BytemdEditorProps) => {
  const handleUploadImages: EditorProps['uploadImages'] = async (files) => {
    const file = files[0];
    if (file) {
      const fd = new FormData();
      fd.append('file', file);

      const toastID = showLoadingToast('uploading');
      const { url, error } = await uploadFile(fd);
      hideToast(toastID);

      if (error) {
        showErrorToast(error);
        return [];
      }

      if (url) {
        showSuccessToast('Success');
        return [{ url }];
      }

      return [];
    } else {
      return [];
    }
  };

  return (
    <Editor
      value={body ?? ''}
      plugins={plugins}
      placeholder="Please enter content..."
      sanitize={sanitize}
      onChange={(v) => setContent(v)}
      uploadImages={handleUploadImages}
      locale={zh_Hans}
      editorConfig={{
        ...editorProps,
      }}
    />
  );
};
