'use server';

import { hashSync } from 'bcryptjs';

import { ADMIN_EMAILS, WALLET_ADDRESS } from '@/constants';
import { type SignupDTO, signupSchema } from '@/features/auth';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const createUser = async (params: SignupDTO) => {
  const result = await signupSchema.safeParseAsync(params);

  if (!result.success) {
    const error = result.error.format()._errors?.join(';');
    // TODO: Record logs
    throw new Error(error);
  }

  const isExist = await prisma.user.findUnique({
    where: {
      email: result.data.email,
    },
  });

  if (isExist) {
    throw new Error('Email already registered!');
  }

  const hashedPassword = hashSync(result.data.password);
  await prisma.user.create({
    data: {
      name: result.data.name,
      password: hashedPassword,
      email: result.data.email,
    },
  });
};

export const noPermission = async () => {
  const session = await auth();
  // If there is no email or no admin emails, and no wallet address or wallet list, return true, indicating no permission
  if (
    (!session?.user?.email || !ADMIN_EMAILS?.length) &&
    (!session?.user?.id || !WALLET_ADDRESS?.length)
  ) {
    return true;
  } else {
    // If the current user email exists in the admin emails, return false, indicating permission
    return (
      (session?.user?.email && !ADMIN_EMAILS?.includes(session?.user?.email)) ||
      (session.user.id && !WALLET_ADDRESS?.includes(session.user.id))
    );
  }
};
