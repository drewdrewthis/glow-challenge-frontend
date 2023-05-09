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

export async function generateTokens(address: string, amount: number) {
  const result = await contract.safeMint(address, amount);

  console.log("Tokens generated", result);

  return result;
}

export async function getBalance(address: string) {
  const balance = await contract.balanceOf(address);
  console.log("Balance for addresss", address, balance.toString());
  return balance;
}

export function depositTokens(id: string, amount: number) {
  throw new Error("Function not implemented.");
}
