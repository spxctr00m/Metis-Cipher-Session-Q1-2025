import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";

// (1)
const whitelist = [
    ["0xF2aE212BfC755508a088bfADc985Db391bBFDec8", 1000],
    ["0xfb1573907b4c47A1e367C887Eb7bbB20069963fb", 1000],
    ["0x50e20E505b173e94A4337F324434eF48AAF2bC7F", 1000],
    ["0x022792c5bFBfA056b80D38c6B672d6e2918e8673", 1000],
    ["0x1e7d0d69e047D4Df5996D5382E67485161b33855", 1000],
    ["0x6e5294609A847687e06008d639a8103dcAebFbed", 1000]
];


// (2)
const tree = StandardMerkleTree.of(whitelist, ["address", "uint256"]);

// (3)
console.log('Merkle Root:', tree.root);
const merkleRoot = tree.root;

// (4)
fs.writeFileSync("merkletree.json", JSON.stringify(tree.dump()));

export { merkleRoot };
