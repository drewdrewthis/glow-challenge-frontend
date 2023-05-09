import { PrismaClient, User } from "@prisma/client";
import { Wallet } from "ethers";

const prisma = new PrismaClient();

/**
 * Create a wallet for a user
 */
export async function createWalletForUser(user: User) {
  console.log("createWallet", user.username);

  const wallet = Wallet.createRandom();

  const newWallet = await prisma.wallet.create({
    data: {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic?.phrase || "",
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  console.log("Wallet created", newWallet);

  return newWallet;
}

export function getUser(id: string) {
  throw new Error("Function not implemented.");
}
