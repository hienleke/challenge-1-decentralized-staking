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
        "0x244a215b9e47271ca0de377d203d5b28ca5fd86b9eb74063d46fb1b4570c805",
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
