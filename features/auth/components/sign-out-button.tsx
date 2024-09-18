'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { IconSolarLogout2 } from '@/components/icons';

import { cn } from '@/lib/utils';

import { signoutAndRedirect } from '../actions/signout';

export const SignOutButton = () => {
  async function handleLogout() {
    await signoutAndRedirect();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(
            'lg:!w-full  text-primary-foreground bg-muted-foreground/10 hover:bg-muted-foreground/20',
          )}
        >
          <IconSolarLogout2 className="lg:mr-2 lg:text-2xl" />
          <span className="hidden lg:inline-block">Logout</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogTrigger>
          <AlertDialogTitle>Tips</AlertDialogTitle>
          <AlertDialogDescription>Sure for Logout?</AlertDialogDescription>
        </AlertDialogTrigger>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Accept</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
