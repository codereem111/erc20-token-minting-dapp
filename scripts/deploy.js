const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await hre.ethers.getContractFactory("MyToken");
  const token = await Token.deploy();
  await token.deployed();

  console.log("MyToken deployed to:", token.address);

  // copy ABI + address to frontend for the dApp
  const artifactPath = "../artifacts/contracts/MyToken.sol/MyToken.json";
  const outDir = "../frontend/src";
  const abi = JSON.stringify(require(artifactPath).abi, null, 2);
  const address = token.address;

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(`${outDir}/MyToken.abi.json`, abi);
  fs.writeFileSync(`${outDir}/contract-address.json`, JSON.stringify({ MyToken: address }, null, 2));

  console.log("ABI and contract address written to frontend/src/");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
