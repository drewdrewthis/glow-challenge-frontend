import { test, expect } from "@playwright/test";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

test.beforeEach(async ({ page }) => {
  await prisma.wallet.deleteMany({});
  await prisma.user.deleteMany({});
  expect(prisma.user.count()).resolves.toBe(0);
});

test.describe("POST /api/users", () => {
  test("should create a user", async ({ request }) => {
    const newUser = await request.post(`/api/users`, {
      data: {
        username: "Sarah",
        amountToGenerate: 100,
      },
    });

    expect(newUser.ok()).toBeTruthy();

    expect(await newUser.json()).toEqual({
      user: {
        id: expect.any(Number),
        username: "Sarah",
      },
      address: expect.any(String),
      balance: "100",
    });
  });
});
