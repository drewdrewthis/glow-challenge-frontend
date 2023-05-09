// pages/api/users/index.ts

import { createUser, getUser } from "@/server/lib/users";
import { NextResponse } from "next/server";
import { generateTokens, getBalance } from "@/server/lib/tokens";
import { createWalletForUser } from "@/server/lib/wallets";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log("GET /api/users/[id]", params);

  try {
    const user = await getUser(Number(params.id));
    const address = user?.Wallet[0]?.address;
    const balance = address ? await getBalance(address) : 0;

    return NextResponse.json({
      user: {
        id: user?.id,
        username: user?.username,
      },
      address,
      balance: balance.toString(),
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to find user" }), {
      status: 500,
    });
  }
}
