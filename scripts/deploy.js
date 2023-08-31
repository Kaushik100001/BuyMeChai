//0xf56B366dB406adAAaE238fFCBA9eFEB295d3f994

const hre = require("hardhat");

async function main() {

  const chai = await hre.ethers.deployContract("Chai");
  await chai.waitForDeployment()
  console.log(chai.target)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });