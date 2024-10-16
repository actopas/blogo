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

import { useDeleteNote } from '@/features/note';

type DeleteNoteButtonProps = {
  id: string;
  refreshAsync: () => Promise<unknown>;
};

export const DeleteNoteButton = ({
  id,
  refreshAsync,
}: DeleteNoteButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const deleteNoteQuery = useDeleteNote();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size={'icon'} variant="outline" onClick={() => setOpen(true)}>
          <IconSolarTrashBinMinimalistic2 className="text-base text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTrigger>
          <AlertDialogTitle>Delete note</AlertDialogTitle>
          <AlertDialogDescription>
            Sure for delete this note?
          </AlertDialogDescription>
        </AlertDialogTrigger>
        <AlertDialogFooter>
          <Button
            variant="outline"
            disabled={deleteNoteQuery.loading}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteNote} disabled={deleteNoteQuery.loading}>
            {deleteNoteQuery.loading && (
              <IconMingcuteLoadingLine className="mr-2 text-base animate-spin" />
            )}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  async function handleDeleteNote() {
    await deleteNoteQuery.runAsync(id);
    await refreshAsync();
  }
};
