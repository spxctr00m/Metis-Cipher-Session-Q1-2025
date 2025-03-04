const keccak256 = require('keccak256');
const MerkleTree = require('merkletreejs')

const whitelist = [
    "0xF2aE212BfC755508a088bfADc985Db391bBFDec8",
    "0xfb1573907b4c47A1e367C887Eb7bbB20069963fb",
    "0x50e20E505b173e94A4337F324434eF48AAF2bC7F",
    "0x022792c5bFBfA056b80D38c6B672d6e2918e8673",
    "0x1e7d0d69e047D4Df5996D5382E67485161b33855"
];

const claimAmount = 1000;

// Function to create leaf nodes (hash of address)
const createLeaf = (address) => keccak256(Buffer.from(address.slice(2), 'hex'));

// Generate Merkle Tree
const leaves = whitelist.map(createLeaf);

const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const merkleRoot = tree.getRoot().toString('hex');

console.log("Merkle Root:", merkleRoot);
console.log("\nMerkle Proofs for each address:\n");

// Print Merkle Proofs for each address
whitelist.forEach(address => {
    const leaf = createLeaf(address);
    const proof = tree.getProof(leaf).map(p => p.data.toString('hex'));
    console.log(`Address: ${address}`);
    console.log(`Merkle Proof: ${JSON.stringify(proof)}`);
    console.log("-----------------------------------");
});

module.exports = { merkleRoot };