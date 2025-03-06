const keccak256 = require('keccak256');
const { MerkleTree } = require('merkletreejs')
const fs = require('fs');

const whitelist = [
    "0xF2aE212BfC755508a088bfADc985Db391bBFDec8",
    "0xfb1573907b4c47A1e367C887Eb7bbB20069963fb",
    "0x50e20E505b173e94A4337F324434eF48AAF2bC7F",
    "0x022792c5bFBfA056b80D38c6B672d6e2918e8673",
    "0x1e7d0d69e047D4Df5996D5382E67485161b33855",
    "0x6e5294609A847687e06008d639a8103dcAebFbed"
];

// Function to create leaf nodes (hash of address)
const createLeaf = (address) => keccak256(Buffer.from(address.slice(2), 'hex'));

// Generate Merkle Tree
const leaves = whitelist.map(createLeaf);
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const merkleRoot = tree.getRoot().toString('hex');

console.log("Merkle root:", merkleRoot);


const merkleProofs = whitelist.reduce((proofs, address) => {
    const leaf = createLeaf(address);
    const proof = tree.getProof(leaf).map(p => p.data.toString('hex')); // Convert to hex
    proofs[address] = proof;
    return proofs;
}, {});

// Write the proofs to a JSON file
fs.writeFileSync('./merkleProofs.json', JSON.stringify(merkleProofs, null, 2));

console.log("Merkle proofs have been written to merkleProofs.json");

module.exports = { merkleRoot };