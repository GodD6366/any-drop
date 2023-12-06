const { Message, PrismaClient, User } = require('@prisma/client');

const prisma = new PrismaClient();

const createTestUser = async () => {
  const user = await prisma.user.findFirst({
    where: {
      username: 'godd',
    },
  });

  if (user) {
    return;
  }

  await prisma.user.create({
    data: {
      username: 'godd',
      nickname: 'GodD6366',
      token: '6366',
    },
  });
};
const getUser = async (username, token) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
      token,
    },
  });
  return user;
};

const CreateTestDropMessage = async () => {
  const user = await getUser('godd', '6366');
  const result = await prisma.message.create({
    data: {
      type: 'text',
      value: 'testtesttest',
      user: {
        connect: {
          username: user.username,
        },
      },
    },
  });
  return result;
};

(async () => {
  await createTestUser();
  await CreateTestDropMessage();
})();
