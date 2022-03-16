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


    const  RoninstakeArgs : {[key: string]: any} = {}; 

    RoninstakeArgs[`_admin`] = deployer;
    RoninstakeArgs[`_ronin`] = '0x0bF652eD8949e015C1569B8BA50d1c529e3E2978';

    const deploymentName = "RoninStake"
    const RoninstakeResult = await deploy(deploymentName, {
        contract: "RoninStake",
        from: deployer,
        args: Object.values(RoninstakeArgs),
        log: true,
        skipIfAlreadyDeployed: true
      });
      
    log("------------------ii---------ii---------------------")
    log("----------------------------------------------------")
    log("------------------ii---------ii---------------------")
    log(`Could be found at ....`)
    log(chalk.yellow(`/deployment/${network.name}/${deploymentName}.json`))
  
    if (true) {
      
      // log(`contract address (Roninstake): ${chalk.green(RoninstakeResult.address)} using ${RoninstakeResult.receipt?.gasUsed} gas`);

      // for(var i in RoninstakeArgs){
      //   log(chalk.yellow( `Argument: ${i} - value: ${RoninstakeArgs[i]}`));
      // }
      
      if(true){

        try {
            
            await hre.run("verify:verify", {
                address: RoninstakeResult.address,
                constructorArguments: Object.values(RoninstakeArgs),
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
func.tags = ["roninstake"];
// func.dependencies = ['external', '1-0'];
