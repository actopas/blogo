'use client';

import React from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import {
  IconMingcuteLoadingLine,
  IconSolarTrashBinMinimalistic2,
} from '@/components/icons';

import { useDeleteBlog } from '@/features/blog';

type DeleteBlogButtonProps = {
  id: string;
  refreshAsync: () => Promise<unknown>;
};

export const DeleteBlogButton = ({
  id,
  refreshAsync,
}: DeleteBlogButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const deleteBlogQuery = useDeleteBlog();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size={'icon'} variant="ghost" onClick={() => setOpen(true)}>
          <IconSolarTrashBinMinimalistic2 className="text-destructive text-base" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTrigger>
          <AlertDialogTitle>Delete Blog</AlertDialogTitle>
          <AlertDialogDescription>
            Sure for delete this blog?
          </AlertDialogDescription>
        </AlertDialogTrigger>
        <AlertDialogFooter>
          <Button
            variant="outline"
            disabled={deleteBlogQuery.loading}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} disabled={deleteBlogQuery.loading}>
            {deleteBlogQuery.loading && (
              <IconMingcuteLoadingLine className="mr-2 text-base animate-spin" />
            )}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  async function handleDelete() {
    await deleteBlogQuery.runAsync(id);
    setOpen(false);
    await refreshAsync();
  }
};
