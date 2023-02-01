# starknet-spells-goerli

![Build Status](https://github.com/makerdao/starknet-spells-goerli/actions/workflows/.github/workflows/tests.yml/badge.svg?branch=dev)

Staging repo for MakerDAO's Starknet Goerli executive spells.


## Manually deploy spell
This procedure should be scripted. Waiting for `estimate_message_fee` to be available in Starknet Hardhat plugin.

### Create/Deploy Account
#### New Account
```
starknet new_account
Account address: 0x03607a5dd410efd85e31a87cfce40a467df4f14845a50b5bd0373da485f9b93f
Public key: 0x04790b87ae6e9b59fb7786649c68bbd5a568ef63d84d0a08dae021c1c2eeea33
Move the appropriate amount of funds to the account, and then deploy the account
by invoking the 'starknet deploy_account' command.

NOTE: This is a modified version of the OpenZeppelin account contract. The signature is computed
differently.
```

#### Deploy Account
```
starknet deploy_account
Sending the transaction with max_fee: 0.000009 ETH (9181087081440 WEI).
Sent deploy account contract transaction.

Contract address: 0x03607a5dd410efd85e31a87cfce40a467df4f14845a50b5bd0373da485f9b93f
Transaction hash: 0x3ca7f658b87c3c9e1ea7af30a1a33cd64d37d3717cc8240380b0f0b50d6a0c0
```

### Declare Spell
```
starknet declare --contract starknet-artifacts/src/spell.cairo/spell.json  --max_fee 8364209952184
Declare transaction was sent.
Contract class hash: 0xa052591661d7e249b46a1084c63b14dae6aa8b1a56ab3f7df8c8add1c374b1
Transaction hash: 0x73c85ff2295201abc8431e59a3c5dcf93507b986a61bb8e7916f50b57efadce
```

### Estimate L1->L2 Fee
```
starknet estimate_message_fee --from_address 0x8919aefA417745F22c6af5AD6550E83159a373F3 --address 0x00275e3f018f7884f449a1fb418b6b1de77e01c74a9fefaed1599cb22322ff74 --abi ../starknet-dai-bridge/starknet-artifacts/contracts/l2/l2_governance_relay.cairo/l2_governance_relay_abi.json --inputs 0xa052591661d7e249b46a1084c63b14dae6aa8b1a56ab3f7df8c8add1c374b1  --function relay
The estimated fee is: 104825981483660 WEI (0.000105 ETH).
Gas usage: 28460
Gas price: 3683274121 WEI
```