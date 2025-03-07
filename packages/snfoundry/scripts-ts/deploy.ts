import {
  deployContract,
  executeDeployCalls,
  exportDeployments,
} from "./deploy-contract";
import { green } from "./helpers/colorize-log";

const deployScript = async (): Promise<void> => {
  const { address: exampleContractAddr } = await deployContract({
    contract: "ExampleExternalContract",
  });
  await deployContract({
    contract: "Staker",
    constructorArgs: {
      eth_contract:
        "0x246eb238bc5629fc577747be778ba6891c56b48928fbaf1d0ec5edbadd925bc",
      external_contract_address: exampleContractAddr,
    },
  });
};

deployScript()
  .then(async () => {
    await executeDeployCalls();
    exportDeployments();

    console.log(green("All Setup Done"));
  })
  .catch(console.error);
