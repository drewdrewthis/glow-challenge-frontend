// pages/api/users/index.ts

import { createUser } from "@/lib/users";
import { generateToken } from "@/lib/tokens";
import { NextResponse } from "next/server";

type Data = {
  user: {
    id: number;
    // token: string;
  };
};

export async function POST(req: Request) {
  console.log("POST /api/users");

  try {
    const { username } = await req.json();
    const user = await createUser({ username });
    // const token = await generateToken(user.id);

    return NextResponse.json({ user });
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
