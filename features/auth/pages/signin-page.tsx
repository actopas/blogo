'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { IconBrandGithub } from '@/components/icons';
import { NextLink } from '@/components/next-link';

import { PATHS } from '@/constants';

import { signinWithGithub } from '../actions/signin';
import { SignWithWallet } from '../components/sign-with-wallet';

export const SignInPage = () => {
  return (
    <div className="w-screen h-screen grid place-content-center">
      <Card className="w-[320px] py-4 rounded-3xl sm:w-full sm:max-w-none sm:min-w-[360px] relative animate-fade">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Login <NextLink href={PATHS.SITE_HOME}>Homepage</NextLink>
          </CardTitle>
          <CardDescription>Choose the way you want</CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="w-full grid gap-4">
            <Button
              variant="default"
              className="!w-full"
              type="button"
              onClick={handleSigninWithGithub}
            >
              <IconBrandGithub className="mr-2 text-base" /> Github
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            <SignWithWallet />
            {/* <Button
              variant="default"
              className="!w-full !cursor-not-allowed"
              type="button"
              disabled
              onClick={handleSigninWithGoogle}
            >
              <IconLogoGoogle className="mr-2 text-base" />
            </Button>
            <p className="text-muted-foreground text-xs">
            </p> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  );

  async function handleSigninWithGithub() {
    await signinWithGithub();
  }
  // async function handleSigninWithGoogle() {
  //   await signinWithGoogle();
  // }
};
