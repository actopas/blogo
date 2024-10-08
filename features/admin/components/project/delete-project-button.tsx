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

import { useDeleteProject } from '@/features/project';

type DeleteProjectButtonProps = {
  id: string;
  refreshAsync: () => Promise<unknown>;
};

export const DeleteProjectButton = ({
  id,
  refreshAsync,
}: DeleteProjectButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const deleteProjectQuery = useDeleteProject();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size={'icon'} variant="ghost" onClick={() => setOpen(true)}>
          <IconSolarTrashBinMinimalistic2 className="text-destructive text-base" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTrigger>
          <AlertDialogTitle>Delete project</AlertDialogTitle>
          <AlertDialogDescription>
            Sure for delete this project?
          </AlertDialogDescription>
        </AlertDialogTrigger>
        <AlertDialogFooter>
          <Button
            variant="outline"
            disabled={deleteProjectQuery.loading}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} disabled={deleteProjectQuery.loading}>
            {deleteProjectQuery.loading && (
              <IconMingcuteLoadingLine className="mr-2 text-base animate-spin" />
            )}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  async function handleDelete() {
    await deleteProjectQuery.runAsync(id);
    setOpen(false);
    await refreshAsync();
  }
};
