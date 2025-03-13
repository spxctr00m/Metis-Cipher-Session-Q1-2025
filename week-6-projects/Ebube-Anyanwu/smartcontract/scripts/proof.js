import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import { getBytes, hexlify } from "ethers";  // Ethers v6 methods

// Load the Merkle Tree from tree.json
const tree = StandardMerkleTree.load(JSON.parse(fs.readFileSync("tree.json", "utf8")));

// Address to generate proof for
const targetAddress = '0x50e20E505b173e94A4337F324434eF48AAF2bC7F';

for (const [i, v] of tree.entries()) {
  if (v[0] === targetAddress) {
    // Ensure proof is properly formatted as bytes32[]
    const proof = tree.getProof(i).map(p => hexlify(getBytes(p))); 
    console.log('Value:', v);
    console.log('Formatted Merkle Proof:', proof);
  }
}
