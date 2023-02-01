# starknet-spells-goerli

![Build Status](https://github.com/makerdao/starknet-spells-goerli/actions/workflows/.github/workflows/tests.yml/badge.svg?branch=dev)

Staging repo for MakerDAO's Starknet Goerli executive spells.


## Manually deploy spell
This procedure should be scripted. Waiting for `estimate_message_fee` to be available in Starknet Hardhat plugin.

### Create/Deploy Account
#### New Account
```
export STARKNET_NETWORK=alpha-mainnet
export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount
starknet new_account
Account address: 0x077fad417c0536ac3504e2e6352c3a005c00242487d206007e79475af5acdf37
Public key: 0x07ab8fe2889add122985c0d4e96f3469add12f82e3ecd49e3132d26f0d4c73a3
```

#### Deploy Account
```
starknet deploy_account
Sending the transaction with max_fee: 0.000075 ETH (74550772285615 WEI).
Sent deploy account contract transaction.

Contract address: 0x077fad417c0536ac3504e2e6352c3a005c00242487d206007e79475af5acdf37
Transaction hash: 0x4bd2ced00ec949fa4c0d51ba16c847035250890a61f2324279939eaf5aed9dd
```

### Declare Spell
```
starknet declare --contract starknet-artifacts/src/spell.cairo/spell.json  --max_fee 35482880908452
Declare transaction was sent.
Contract class hash: 0x4e7d83cd693f8b518f9638ce47d573fd2d642371ee266d6ed55e1276d5b43c3
Transaction hash: 0xd7809f4f52cc44263f9bd608161b0f2ab3983b9f08c001cd5fabf18e1ba036
```

### Estimate L1->L2 Fee
```
starknet estimate_message_fee --from_address 0x2385C60D2756Ed8CA001817fC37FDa216d7466c0 --address 0x05f4d9b039f82e9a90125fb119ace0531f4936ff2a9a54a8598d49a4cd4bd6db --abi ../starknet-dai-bridge/starknet-artifacts/contracts/l2/l2_governance_relay.cairo/l2_governance_relay_abi.json --inputs 0x4e7d83cd693f8b518f9638ce47d573fd2d642371ee266d6ed55e1276d5b43c3  --function relay
The estimated fee is: 624330160646380 WEI (0.000624 ETH).
Gas usage: 28460
Gas price: 21937110353 WEI

```