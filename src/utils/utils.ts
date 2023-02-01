import { StarknetContractFactory } from "@shardlabs/starknet-hardhat-plugin/dist/src/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import path from "path";

export function l2String(str: string): string {
  return `0x${Buffer.from(str, "utf8").toString("hex")}`;
}

export async function getL2ContractAt(
  hre: HardhatRuntimeEnvironment,
  abiPath: string,
  address: string
) {
  const factory = new StarknetContractFactory({
    hre,
    abiPath: path.join(process.env.PWD!, abiPath),
    metadataPath: "", //ignored
  });
  return factory.getContractAt(address);
}

export interface SendMessageToL2Params {
  l2_contract_address: string;
  entry_point_selector: string;
  l1_contract_address: string;
  payload: string[];
  nonce: string;
}

export interface SendMessageToL2Result {
  transaction_hash: string;
}

// replace with a call on devnet object when it is available
export async function sendMessageToL2(
  hre: HardhatRuntimeEnvironment,
  params: SendMessageToL2Params
) {
  return (
    // @ts-ignore
    (
      await hre.starknet.devnet.requestHandler(
        "/postman/send_message_to_l2",
        "POST",
        params
      )
    ).data as SendMessageToL2Result
  );
}
