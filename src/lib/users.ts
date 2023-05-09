import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function createUser(data: { username: string }) {
  console.log("createUser", data);

  return prisma.user.create({
    data,
  });
}

export function getUser(id: string) {
  throw new Error("Function not implemented.");
}
