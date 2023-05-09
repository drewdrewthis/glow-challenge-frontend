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
        tokenAmount: 100,
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

test.describe("GET /api/users/:id", () => {
  test("should get a user and balance ", async ({ request }) => {
    const newUser = await request
      .post(`/api/users`, {
        data: {
          username: "John",
          tokenAmount: 100,
        },
      })
      .then((res) => res.json());

    const user = await request.get(`/api/users/${newUser.user.id}`);

    expect(user.ok()).toBeTruthy();

    expect(await user.json()).toEqual({
      user: {
        id: expect.any(Number),
        username: "John",
      },
      address: expect.any(String),
      balance: "100",
    });
  });
});

// It is unclear what this is supposed to do, as this might be the same
// as minting the tokens
test.describe("POST /api/users/:id/deposits", () => {
  test.skip("should transfer tokens to a users account", async ({
    request,
  }) => {});
});
