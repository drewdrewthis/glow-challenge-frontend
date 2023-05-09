// pages/api/users/index.ts

import { createUser } from "@/server/lib/users";
import { NextResponse } from "next/server";
import { generateTokens, getBalance } from "@/server/lib/tokens";
import { createWalletForUser } from "@/server/lib/wallets";

export async function POST(req: Request) {
  console.log("POST /api/users");

  try {
    const { username, tokenAmount } = await req.json();
    const user = await createUser({ username });
    console.log("User created", user);
    const wallet = await createWalletForUser(user);
    await generateTokens(wallet.address, tokenAmount);
    const balance = await getBalance(wallet.address);

    return NextResponse.json({
      user,
      address: wallet.address,
      balance: balance.toString(),
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to create user and generate token" }),
      {
        status: 500,
      }
    );
  }
}
