'use server';
import { getDB } from '@/utils';

export const getUser = async (username: string, token: string) => {
  const prisma = await getDB();
  const user = await prisma.user.findFirst({
    where: {
      username,
      token,
    },
  });
  return user;
};
