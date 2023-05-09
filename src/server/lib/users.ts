import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(data: { username: string }) {
  console.log("createUser", data);

  const user = await prisma.user.create({
    data,
  });

  console.log("User created", user);

  return user;
}

export function getUser(id: number) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      Wallet: true,
    },
  });
}
