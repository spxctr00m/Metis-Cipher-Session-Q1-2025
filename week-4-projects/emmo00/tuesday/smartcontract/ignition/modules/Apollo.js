const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Apollo", (m) => {
    const apollo = m.contract("Rocket", ['Space 0x']);

    m.call(apollo, "startEngine", []);
    m.call(apollo, "launch", []);

    return { apollo };
})