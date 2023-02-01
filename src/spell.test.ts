import { Account } from "@shardlabs/starknet-hardhat-plugin/dist/src/account";
import { expect } from "earljs";
import hre from "hardhat";
import {
  L1_GOVERNANCE_RELAY_ADDRESS,
  L2_DAI_ADDRESS,
  L2_DAI_BRIDGE_ADDRESS,
  L2_DAI_BRIDGE_LEGACY_ADDRESS,
  L2_DAI_TELEPORT_GATEWAY_ADDRESS,
  L2_GOVERNANCE_RELAY_ADDRESS,
  L2_GOVERNANCE_RELAY_LEGACY_ADDRESS,
  TRG_DOMAIN,
} from "./addresses";
import { getL2ContractAt, l2String, sendMessageToL2 } from "./utils/utils";
import daiAbi from "./abis/daiAbi";
import { WrappedStarknetContract, wrapTyped } from "./utils/wrap";
import l2DaiBridgeAbi from "./abis/l2DaiBridgeAbi";
import l2DaiTeleportGatewayAbi from "./abis/l2DaiTeleportGatewayAbi";
import l2GovernanceRelayAbi from "./abis/l2GovernanceRelayAbi";

describe("mainnet spell", () => {
  let dai: WrappedStarknetContract<typeof daiAbi>;
  let bridge: WrappedStarknetContract<typeof l2DaiBridgeAbi>;
  let bridgeLegacy: WrappedStarknetContract<typeof l2DaiBridgeAbi>;
  let teleport: WrappedStarknetContract<typeof l2DaiTeleportGatewayAbi>;
  let relay: WrappedStarknetContract<typeof l2GovernanceRelayAbi>;
  let relayLegacy: WrappedStarknetContract<typeof l2GovernanceRelayAbi>;
  let predeployedAccounts: Account[];
  before(async () => {
    await hre.starknet.devnet.restart();

    dai = wrapTyped(
      hre,
      await getL2ContractAt(hre, "src/abis/dai_abi.json", L2_DAI_ADDRESS)
    );
    bridge = wrapTyped(
      hre,
      await getL2ContractAt(
        hre,
        "src/abis/l2_dai_bridge_abi.json",
        L2_DAI_BRIDGE_ADDRESS
      )
    );
    bridgeLegacy = wrapTyped(
      hre,
      await getL2ContractAt(
        hre,
        "src/abis/l2_dai_bridge_abi.json",
        L2_DAI_BRIDGE_LEGACY_ADDRESS
      )
    );
    teleport = wrapTyped(
      hre,
      await getL2ContractAt(
        hre,
        "src/abis/l2_dai_teleport_gateway_abi.json",
        L2_DAI_TELEPORT_GATEWAY_ADDRESS
      )
    );
    relay = wrapTyped(
      hre,
      await getL2ContractAt(
        hre,
        "src/abis/l2_governance_relay_abi.json",
        L2_GOVERNANCE_RELAY_ADDRESS
      )
    );
    relayLegacy = wrapTyped(
      hre,
      await getL2ContractAt(
        hre,
        "src/abis/l2_governance_relay_abi.json",
        L2_GOVERNANCE_RELAY_LEGACY_ADDRESS
      )
    );

    predeployedAccounts = [];
    for (const { address, private_key } of
      (await hre.starknet.devnet.getPredeployedAccounts()).slice(0, 2)
    ) {
      const account =
        await hre.starknet.OpenZeppelinAccount.getAccountFromAddress(
          address,
          private_key
        );
      predeployedAccounts.push(account);
    }

    await hre.run("starknet-compile", { paths: ["src/spell.cairo"] });

    const spellDeployer = predeployedAccounts[0];
    const spellFactory = await hre.starknet.getContractFactory("spell");
    const classHash = await spellDeployer.declare(spellFactory);

    // @ts-ignore
    const { transaction_hash } = await sendMessageToL2(hre, {
      l2_contract_address: relay.address,
      entry_point_selector:
        "0xa9ebda8d3a6595cf15b1d46ea0e440a9810c2b99a3e889c6b3b46f7ff0e5e1",
      l1_contract_address: L1_GOVERNANCE_RELAY_ADDRESS,
      payload: [classHash],
      nonce: "0x0",
    });

    const receipt = await hre.starknet.getTransactionReceipt(transaction_hash);
    expect(receipt.status).toEqual("ACCEPTED_ON_L2");
  });

  describe("dai", () => {
    it("has proper wards", async () => {
      expect(await dai.wards(bridge.address)).toBeTruthy();
      expect(await dai.wards(relay.address)).toBeTruthy();
      expect(await dai.wards(bridgeLegacy.address)).toBeFalsy();
      expect(await dai.wards(relayLegacy.address)).toBeFalsy();
    });
  });
  describe("bridge", () => {
    it("has proper wards", async () => {
      expect(await bridge.wards(relay.address)).toBeTruthy();
      expect(await bridge.wards(relayLegacy.address)).toBeFalsy();
    });
    it("handles deposits and widthdrawals", async () => {
      const l1Bridge = `0x${(await bridge.bridge()).toString(16)}`;
      const recipient = predeployedAccounts[0];
      const selector =
        "0x2d757788a8d8d6f21d1cd40bce38a8222d70654214e96ff95d8086e684fbee5";
      const balanceBefore: bigint = await dai.balanceOf(recipient.address);
      const amount = 100n;

      // replace with a call on devnet object when it is available
      await sendMessageToL2(hre, {
        l2_contract_address: bridge.address,
        entry_point_selector: selector,
        l1_contract_address: l1Bridge,
        payload: [recipient.address, `0x${amount.toString(16)}`, "0x0", "0x0"],
        nonce: "0x0",
      });

      const balanceAfter: bigint = await dai.balanceOf(recipient.address);

      expect(balanceBefore + amount).toEqual(balanceAfter);

      dai.connect(recipient);
      await dai.increaseAllowance(bridge.address, balanceAfter);

      bridge.connect(recipient);

      const { status } = await bridge.initiate_withdraw(1n, balanceAfter);
      expect(status).toEqual("ACCEPTED_ON_L2");

      const balanceAfterWidthdrawal: bigint = await dai.balanceOf(
        recipient.address
      );
      expect(balanceAfterWidthdrawal).toEqual(0n);
    });
  });
  describe("teleport", () => {
    it("has proper wards", async () => {
      expect(await teleport.wards(relay.address)).toBeTruthy();
      expect(await teleport.wards(relayLegacy.address)).toBeFalsy();
    });
    it("valid_domains are properly set", async () => {
      expect(await teleport.valid_domains(l2String(TRG_DOMAIN))).toBeFalsy();
    });
    it("initiate_teleport behaves correctly", async () => {
      teleport.connect(predeployedAccounts[0]);
      await expect(
        teleport.initiate_teleport(l2String(TRG_DOMAIN), 0n, 1n, 0n)
      ).toBeRejected(
        expect.stringMatching("l2_dai_teleport_gateway/invalid-domain")
      );
    });
  });
});
