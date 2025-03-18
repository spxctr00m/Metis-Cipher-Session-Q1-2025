const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AreaModule", (m)=>{
    const area = m.contract("SolomonAreaCalculator");

    return {area};
}

)