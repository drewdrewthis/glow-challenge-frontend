import { test, expect } from "@playwright/test";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

test.beforeEach(async ({ page }) => {
  await prisma.user.deleteMany({});
  expect(prisma.user.count()).resolves.toBe(0);
});

test("should create a user", async ({ request }) => {
  const newUser = await request.post(`/api/users`, {
    data: {
      username: "Sarah",
    },
  });

  console.log("newUser", await newUser.json());

  expect(newUser.ok()).toBeTruthy();

  expect(await newUser.json()).toEqual({
    user: {
      id: expect.any(Number),
      username: "Sarah",
    },
  });
});
