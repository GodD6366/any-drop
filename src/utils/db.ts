'use server';

import { PrismaClient } from '@prisma/client';

declare var global: any;

export const getDB = async () => {
  const prisma: PrismaClient = global.prisma || new PrismaClient();
  if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
  return prisma;
};
