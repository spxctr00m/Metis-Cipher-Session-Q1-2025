# The Merkle Patricia Tree

---

## What is a Merkle Patricia Tree?
To understand what a Merkle Patricia Tree is, you have to first know what a Merkle tree is and what a Patricia tree is.

**Merkle Trees**: Merkle Trees are a type of binary tree where each leaf node represents a hash of a data block, and each non-leaf node represents a hash of its child nodes. This structure allows for efficient verification of data integrity and authenticity.

**Patricia Tree**: This is a special type of tree that is optimized for storing and retrieving data efficiently. It eliminates “empty” branches, making it more space-efficient than a standard tree.

**Merkle Patricia Tree**: The Merkle Patricia Tree is a modified Merkle Tree that uses a combination of hash functions and a Patricia Trie data structure to efficiently store and retrieve data. The Merkle Patricia Tree is like the “brain” of the Ethereum blockchain. It efficiently stores and manages all the crucial information, ensuring that everyone on the network has the same understanding of the blockchain’s current state. This is essential for the security and smooth operation of the entire Ethereum ecosystem.

---

## How Merkle Patricia Trees are used in the EVM
Merkle Patricia Trees (MPTs) are a fundamental data structure in the Ethereum Virtual Machine (EVM). In the EVM, MPTs are used to store and manage the state of the Ethereum network. The MPT is a modified Merkle Tree that uses a combination of hash functions and a Patricia Trie data structure to efficiently store and retrieve data. Here’s how it works:

- Storing the Blockchain State: The EVM uses a Merkle Patricia Tree to store the entire state of the Ethereum blockchain. This includes:
  - Account balances
  - Smart contract code
  - Storage data
- Efficient State Management:
  - Fast Lookups: The tree structure allows for incredibly fast lookups of account data.
  - Space Efficiency: It efficiently stores and retrieves this massive amount of data without wasting space.
  - Data Integrity: Any change to the state (like a transaction) will change the root hash of the tree. This allows nodes on the network to quickly verify if the state is correct.\
- Consensus:
  - All nodes on the Ethereum network must agree on the state of the blockchain.
  - The root hash of the state tree serves as a single point of truth.
  - If nodes have different state roots, it means there’s a disagreement and the blockchain needs to resolve it.

---

This is the link to my article on hashnode.com: <https://ozel.hashnode.dev/ethereum-virtual-machine-evm-a-deep-dive-into-the-heart-of-ethereum>







