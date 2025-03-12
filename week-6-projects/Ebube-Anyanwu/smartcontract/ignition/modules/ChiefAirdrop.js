import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

const CLAIM_AMOUNT = 1000;
const CHIEFTOKEN_ADDRESS = "0x3E796aD5d9bAD3289A995534b78b95C01884BEE6"
const formattedMerkleRoot = "0x19eeebc4f15aad02944d0cb3df091fd602257a3904d689b21be0c7699e9f2d71";

// Convert to Bytes32
const merkleRootBytes32 = ethers.hexlify(formattedMerkleRoot);

export default buildModule("ChiefAirdropModule", (m) => {
  const ChiefAirdrop = m.contract("ChiefAirdrop", [CHIEFTOKEN_ADDRESS, merkleRootBytes32, CLAIM_AMOUNT]);

  return { ChiefAirdrop };
});
