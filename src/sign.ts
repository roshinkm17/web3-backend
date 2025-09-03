import { ethers } from "ethers";

async function main() {
  // 1. Create a random wallet (for testing only!)
  const wallet = ethers.Wallet.createRandom();

  console.log("Wallet address:", wallet.address);
  console.log("Private key:", wallet.privateKey);

  // 2. Message to sign
  const message = "Hello Web3";

  // 3. Sign message
  const signature = await wallet.signMessage(message);

  console.log("\nMessage:", message);
  console.log("Signature:", signature);
}

main();
