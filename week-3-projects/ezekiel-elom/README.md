
# Week 3 Project

## Part 1

**Verified contract address**:

Below is the verified contract address of the deployed AreaCalculator calculations

Here is my [contract address](https://sepolia-explorer.metisdevops.link/address/0xA90F0Ae221b2f21fD299655839Cc6aE8A420d993).



## Part 2

### **Difference Between `=`, `==`, and `===` in Solidity**  


1. **`=` (Assignment Operator)**  

   - Used to **assign** a value to a variable.  
   - Example:  

     uint a = 10; 

2. **`==` (Equality Operator)**  

   - Used to **compare two values** for equality.  

   - Returns `true` if the values are equal, otherwise 
   `false`.  
   
   - Example:  
     
     bool isEqual = (10 == 10); 
     

3. **`===` (Strict Equality Operator)**  
   - **Not available in Solidity** (unlike JavaScript).  
   - Solidity uses only `==` for equality checks.

Solidity does not allow comparison between different data types (e.g., uint and string). because it is a **statically typed language**, meaning it does not perform implicit type conversions like JavaScript.

 **In Summary:**  
>> Use `=` for assignment.  
 >>Use `==` for equality comparison.  
 >> `===` **does not exist** in Solidity.