const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CustomTokenModule", (m) => {
  
  const name = "victoken";
  const symbol = "VCT";
  const initialSupply = 1000000; 
  const decimals = 18; 
  const tokenOwner = "0x0842Ea79a34E7c5e74FfD173815923Dd8DF22C3d"; // Address that will receive the initial supply

  
  const customToken = m.contract("CustomToken", [name, symbol, initialSupply, decimals, tokenOwner]);

  

  return { customToken };
});

