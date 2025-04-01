const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

// List of whitelisted addresses
const whitelist = [
  "0x4D49bE66e1486f167c122Ca80C97fF809ccBda10",
  "0x91591643928182632F3334DfC4f27a12A406d744", 
  "0xf9b393680c240Ce13e63E425Da2009DE3DD6F848",
  "0xc6A4A5922a32be3Db95373Fe7f286264209E7390",
  "0x888B09e1dc5fA9952F89882b923E3479537469cd",
  "0x8C927799f5ba7C0692d4Ea706E258fC1B0B8eAC5",
  "0x81fa58033896eA119E7e28A9510c9ea1152D7D6c",
  "0x9876543210abcdef9876543210abcdef98765432",
  "0x81fa58033896eA119E7e28A9510c9ea1152D7D6c",
];

const proof = getMerkleProof("0x4D49bE66e1486f167c122Ca80C97fF809ccBda10");
console.log("Generated Merkle Proof:", proof);


//  Hash each address
const leafNodes = whitelist.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

// Get the Merkle Root
const merkleRoot = merkleTree.getRoot().toString("hex");
console.log("Merkle Root:", "0x" + merkleRoot);

// Function to get Merkle Proof for an address
function getMerkleProof(address) {
  const leaf = keccak256(address);
  const proof = merkleTree.getProof(leaf).map((p) => "0x" + p.data.toString("hex"));
  return proof;
}


module.exports = {
  merkleRoot: "0x" + merkleRoot, 
  getMerkleProof,
};
