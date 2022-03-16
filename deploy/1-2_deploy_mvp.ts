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


    const  mvpArgs : {[key: string]: any} = {}; 

    mvpArgs[`tokenName`] = 'mvp';
    

    const deploymentName = "mvp"
    const mvpResult = await deploy(deploymentName, {
        contract: "MockERC20",
        from: deployer,
        args: Object.values(mvpArgs),
        log: true,
        skipIfAlreadyDeployed: true
      });
      
    log("------------------ii---------ii---------------------")
    log("----------------------------------------------------")
    log("------------------ii---------ii---------------------")
    log(`Could be found at ....`)
    log(chalk.yellow(`/deployment/${network.name}/${deploymentName}.json`))

    
  
    if (mvpResult.newlyDeployed) {
      
      log(`contract address (mvp): ${chalk.green(mvpResult.address)} using ${mvpResult.receipt?.gasUsed} gas`);

      for(var i in mvpArgs){
        log(chalk.yellow( `Argument: ${i} - value: ${mvpArgs[i]}`));
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
                address: mvpResult.address,
                constructorArguments: Object.values(mvpArgs),
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
func.tags = ["1-2","mvp"];
func.dependencies = ["1-1"];
