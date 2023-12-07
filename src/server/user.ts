'use server';
import { getDB } from '@/utils';

export const getUser = async (name: string, pwd: string) => {
  const prisma = await getDB();
  const user = await prisma.user.findFirst({
    where: {
      name,
      pwd,
    },
  });
  return user;
};
