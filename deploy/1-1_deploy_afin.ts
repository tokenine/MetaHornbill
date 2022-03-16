import 'dotenv/config';

import chalk from 'chalk';

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

import {
  utils,
} from 'ethers';

const { 
  formatUnits,
  parseEther,
  parseUnits
} = utils;


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    
    const {deployments, getNamedAccounts, network} = hre;
    const {deploy, execute , log } = deployments;
    const {deployer} = await getNamedAccounts();

    log(chalk.cyan(`.....`));
    log(chalk.cyan(`Starting Script.....`));
  
    log(`Deploying contracts with the account: ${deployer}`);
  
  
    const balance = await hre.ethers.provider.getBalance(deployer);
    log(`Account balance: ${formatUnits(balance, 'ether')} ETH`);
  
  
    log(chalk.yellow(`Network Name: ${network.name}`));
    log("----------------------------------------------------")


    const  afinArgs : {[key: string]: any} = {}; 

    afinArgs[`tokenName`] = 'afin';
    

    const deploymentName = "afin"
    const afinResult = await deploy(deploymentName, {
        contract: "MockERC20",
        from: deployer,
        args: Object.values(afinArgs),
        log: true,
        skipIfAlreadyDeployed: true
      });
      
    log("------------------ii---------ii---------------------")
    log("----------------------------------------------------")
    log("------------------ii---------ii---------------------")
    log(`Could be found at ....`)
    log(chalk.yellow(`/deployment/${network.name}/${deploymentName}.json`))

   
  
    if (afinResult.newlyDeployed) {
      
      log(`contract address (afin): ${chalk.green(afinResult.address)} using ${afinResult.receipt?.gasUsed} gas`);

      for(var i in afinArgs){
        log(chalk.yellow( `Argument: ${i} - value: ${afinArgs[i]}`));
      }

      await execute(
        deploymentName,
        {from: deployer, log: true},
        "mint",
        deployer,
        parseEther('100000')
        );
      
      if(hre.network.tags.production || hre.network.tags.staging){

        try {
            
            await hre.run("verify:verify", {
                address: afinResult.address,
                constructorArguments: Object.values(afinArgs),
            });

            }
        catch(err) {
            console.log(err)
        }
      }

      
    }

    log(chalk.cyan(`Ending Script.....`));
    log(chalk.cyan(`.....`)); 

    
}
export default func;
func.tags = ["1-1","afin"];

