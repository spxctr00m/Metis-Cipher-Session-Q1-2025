# Week 4 Tasks

## Verified Contract Address

Here is the verified [contract address](https://sepolia-explorer.metisdevops.link/address/0x834Ae16603a59cB09891226Ed226F17ff6525463)



## Difference Between Overflow and Underflow in Solidity
 

In Solidity, **overflow** and **underflow** are arithmetic conditions that occur when a number exceeds the storage limits of its data type. These issues were common in older Solidity versions (before 0.8), but from Solidity 0.8 onward, the compiler automatically prevents them by reverting the transaction.  


 ### Overflow 
 happens when a number **exceeds** its maximum storage limit, causing it to wrap around to the minimum value (in older versions).  

Also, Overflow occurs when an arithmetic operation results in a value larger than what the data type can hold. 

 **Example:**  

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OverflowExample {
    uint8 public num = 255; // Max value for uint8

    function addOne() public {
        num += 1; // Causes an overflow in older Solidity versions (wraps to 0)
    }
}
```
**From the above, we can see that:**

- The `uint8` type can store values from `0` to `255`.  

- Adding `1` to `255` would **cause an overflow**, making it wrap back to `0` in Solidity **versions below 0.8**.  

- However, in Solidity **0.8+**, the transaction **reverts** instead of wrapping around, preventing overflow-related bugs.  




 ### Underflow
  happens when a number **goes below** its minimum storage limit (which is `0` for unsigned integers), causing it to wrap around to the maximum value (in older versions).  

Underflow occurs when an arithmetic operation results in a value smaller than what the data type allows.  



**Example:**  

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UnderflowExample {
    uint8 public num = 0; // Minimum value for uint8

    function subtractOne() public {
        num -= 1; // Causes an underflow in older Solidity versions (wraps to 255)
    }
}
```


**From the above, we also see:**  

- The `uint8` type can only store values from `0` to `255`.  

- Subtracting `1` from `0` would **cause an underflow**, making it wrap around to `255` in Solidity **versions below 0.8**.  

- However, in Solidity **0.8+**, the transaction **reverts** instead of allowing underflow.  



### **Key Takeaway**  
Before Solidity **0.8**, overflow and underflow could lead to unexpected behavior, potentially causing security vulnerabilities. But with Solidity **0.8+**, **automatic checks prevent overflow and underflow**, making smart contracts safer and more reliable.

