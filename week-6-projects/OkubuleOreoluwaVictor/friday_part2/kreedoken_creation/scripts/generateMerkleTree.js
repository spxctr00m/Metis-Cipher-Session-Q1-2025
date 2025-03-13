const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const fs = require('fs');

// Sample whitelist of Ethereum addresses
const whitelist = [
  '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
  '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
  '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db',
  '0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB',
  '0x617F2E2fD72FD9D5503197092aC168c91465E7f2'
];

// Function to hash an address
function hashAddress(address) {
  return keccak256(address);
}

// Generate the Merkle Tree
function generateMerkleTree(addresses) {
  const leaves = addresses.map(addr => hashAddress(addr));
  
  const merkleTree = new MerkleTree(leaves, keccak256, {
    sortPairs: true 
  });
  
  return {
    merkleTree,
    leaves
  };
}

// Generate and print the Merkle Root and proofs
function main() {
  const { merkleTree, leaves } = generateMerkleTree(whitelist);
  
  const rootHash = merkleTree.getRoot();
  const rootHex = '0x' + rootHash.toString('hex');
  
  console.log('Merkle Root:', rootHex);
  
  // Create an object to store the Merkle data
  const merkleData = {
    root: rootHex,
    whitelist: {}
  };
  
  // Generate and store proofs for each address
  whitelist.forEach((address, index) => {
    const leaf = leaves[index];
    const proof = merkleTree.getProof(leaf);
    const proofHex = proof.map(p => '0x' + p.data.toString('hex'));
    
    // Store the proof in the merkleData object
    merkleData.whitelist[address] = {
      proof: proofHex,
      leaf: '0x' + leaf.toString('hex')
    };
    
    console.log(`\nAddress: ${address}`);
    console.log('Merkle Proof:', proofHex);
    
    // Verify the proof works
    const isValid = merkleTree.verify(proof, leaf, rootHash);
    console.log('Proof Verification:', isValid ? 'Valid ✓' : 'Invalid ✗');
  });
  
  // Save the Merkle data to a JSON file
  fs.writeFileSync(
    'merkle-data.json',
    JSON.stringify(merkleData, null, 2)
  );
  
  console.log('\nMerkle data saved to merkle-data.json');
}

main();
