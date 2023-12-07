'use server';

import { cache } from 'react';
import { getDB } from '@/utils';
import { Message, User } from '@prisma/client';
import { getUser } from './user';

export const addDropMessage = async (value: string, user?: User) => {
  const prisma = await getDB();

  if (!user) {
    user = (await getUser('godd', '6366'))!;
    // throw Error('no user');
  }

  const result = await prisma.message.create({
    data: {
      type: 'text',
      value: value,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  return result;
};

export const getDropMessage = cache(async (user?: User) => {
  const prisma = await getDB();

  if (!user) {
    user = (await getUser('godd', '6366'))!;
    // throw Error('no user');
  }

  const result = await prisma.message.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return result;
});
