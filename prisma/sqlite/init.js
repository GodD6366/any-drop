const { Message, PrismaClient, User } = require('@prisma/client');

const prisma = new PrismaClient();

const createTestUser = async () => {
  const user = await prisma.user.findFirst({
    where: {
      name: 'godd',
    },
  });

  if (user) {
    return;
  }

  await prisma.user.create({
    data: {
      name: 'godd',
      nick: 'GodD6366',
      pwd: '6366',
      email: 'godd@test.com',
      emailVerified: new Date(),
    },
  });
};
const getUser = async (name, pwd) => {
  const user = await prisma.user.findFirst({
    where: {
      name,
      pwd,
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
          id: user.id,
          name: user.name,
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
