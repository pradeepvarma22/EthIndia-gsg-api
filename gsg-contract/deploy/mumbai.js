const hardhat = require("hardhat");

async function main() {


  const GSG = await hardhat.ethers.getContractFactory("GSGReward");
  const gsg = await GSG.deploy();

  await gsg.deployed();

  console.log(`Contract Deployed At ${gsg.address}`);


  // setTimeout(() => {  console.log("Please Wait!"); }, 10000);


  await hre.run("verify:verify", {
    address: gsg.address
  });



}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
