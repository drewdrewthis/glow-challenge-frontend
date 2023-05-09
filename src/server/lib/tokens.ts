import { ethers } from "ethers";
import { abi } from "@/server/lib/abis/DrewToken.json";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const address = process.env.TOKEN_CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

if (!privateKey) {
  throw new Error("Missing PRIVATE_KEY environment variable");
}

const wallet = new ethers.Wallet(privateKey, provider);

if (!address) {
  throw new Error("Missing TOKEN_CONTRACT_ADDRESS environment variable");
}

const contract = new ethers.Contract(address, abi, wallet);

export async function generateTokens(
  address: string,
  amount: number
): Promise<any> {
  try {
    const result = await contract.safeMint(address, amount);
    console.log("Tokens generated", result);

    return result;
  } catch (error: any) {
    // Check if the error is a nonce error
    if (
      error.code === -32000 &&
      error.message.includes("the tx doesn't have the correct nonce")
    ) {
      // TODO: Handle nonce errors
      throw error;
    }
  }
}

export async function getBalance(address: string) {
  const balance = await contract.balanceOf(address);
  console.log("Balance for addresss", address, balance.toString());
  return balance;
}

export async function transferTokens(args: {
  fromAddress: string;
  toAddress: string;
  amount: number;
}) {
  const result = await contract.transferFrom(
    args.fromAddress,
    args.toAddress,
    args.amount
  );

  console.log("Tokens transferred", result, args);

  return result;
}
