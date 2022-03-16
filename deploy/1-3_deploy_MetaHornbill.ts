import 'dotenv/config';

import chalk from 'chalk';

import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

import {
  utils,
  BigNumber
} from 'ethers';

const {
  formatUnits,
  parseEther,
  parseUnits
} = utils;


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, execute, log, get } = deployments;
  const { deployer } = await getNamedAccounts();

  log(chalk.cyan(`.....`));
  log(chalk.cyan(`Starting Script.....`));

  log(`Deploying contracts with the account: ${deployer}`);


  const balance = await hre.ethers.provider.getBalance(deployer);
  log(`Account balance: ${formatUnits(balance, 'ether')} ETH`);


  log(chalk.yellow(`Network Name: ${network.name}`));
  log("----------------------------------------------------")

  let afinAddress: string;
  let mvpAddress: string;

  afinAddress = (await get('afin')).address;
  mvpAddress = (await get('mvp')).address;

  const MetaHornbillArgs: { [key: string]: any } = {};

  MetaHornbillArgs[`_NFT_NAM`] = 'MetaHornbill';
  MetaHornbillArgs[`_NFT_SYMBOL`] = 'AFIN';
  MetaHornbillArgs[`_AVAILABLE_SUPPLY`] = 5;
  MetaHornbillArgs[`_MINT_PRE_START_TIME`] = 1648904400;
  MetaHornbillArgs[`_MINT_START_TIME`] = 1649077200;
  MetaHornbillArgs[`_MINT_END_TIME`] = 1649250000;
  MetaHornbillArgs[`_afin`] = afinAddress;
  MetaHornbillArgs[`_mvp`] = mvpAddress;



  const deploymentName = "MetaHornbill"
  const MetaHornbillResult = await deploy(deploymentName, {
    contract: "MetaHornbill",
    from: deployer,
    args: Object.values(MetaHornbillArgs),
    log: true,
    skipIfAlreadyDeployed: true
  });

  log("------------------ii---------ii---------------------")
  log("----------------------------------------------------")
  log("------------------ii---------ii---------------------")
  log(`Could be found at ....`)
  log(chalk.yellow(`/deployment/${network.name}/${deploymentName}.json`))

  if (MetaHornbillResult.newlyDeployed) {

    log(`contract address (MetaHornbill): ${chalk.green(MetaHornbillResult.address)} using ${MetaHornbillResult.receipt?.gasUsed} gas`);

    for (var i in MetaHornbillArgs) {
      log(chalk.yellow(`Argument: ${i} - value: ${MetaHornbillArgs[i]}`));
    }

    const approveArgs: any[] = [
      MetaHornbillResult.address,
      BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
    ];

    await execute(
      'afin',
      {from: deployer, log: true}, 
      "approve",
      ...approveArgs
    )

    await execute(
      'mvp',
      {from: deployer, log: true}, 
      "approve",
      ...approveArgs
    )


    if (hre.network.tags.production || hre.network.tags.staging) {

      try {

        await hre.run("verify:verify", {
          address: MetaHornbillResult.address,
          constructorArguments: Object.values(MetaHornbillArgs),
        });

      }
      catch (err) {
        console.log(err)
      }
    }


  }

  log(chalk.cyan(`Ending Script.....`));
  log(chalk.cyan(`.....`));


}
export default func;
func.tags = ["1-3", "metahornbill"];
func.dependencies = ["1-2"];
