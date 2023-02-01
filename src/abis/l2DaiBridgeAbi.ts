export default [
  {
    members: [
      {
        name: "low",
        offset: 0,
        type: "felt",
      },
      {
        name: "high",
        offset: 1,
        type: "felt",
      },
    ],
    name: "Uint256",
    size: 2,
    type: "struct",
  },
  {
    data: [
      {
        name: "user",
        type: "felt",
      },
    ],
    keys: [],
    name: "Rely",
    type: "event",
  },
  {
    data: [
      {
        name: "user",
        type: "felt",
      },
    ],
    keys: [],
    name: "Deny",
    type: "event",
  },
  {
    data: [],
    keys: [],
    name: "Closed",
    type: "event",
  },
  {
    data: [
      {
        name: "l1_recipient",
        type: "felt",
      },
      {
        name: "amount",
        type: "Uint256",
      },
      {
        name: "caller",
        type: "felt",
      },
    ],
    keys: [],
    name: "withdraw_initiated",
    type: "event",
  },
  {
    data: [
      {
        name: "account",
        type: "felt",
      },
      {
        name: "amount",
        type: "Uint256",
      },
    ],
    keys: [],
    name: "deposit_handled",
    type: "event",
  },
  {
    data: [
      {
        name: "l1_recipient",
        type: "felt",
      },
      {
        name: "amount",
        type: "Uint256",
      },
      {
        name: "sender",
        type: "felt",
      },
    ],
    keys: [],
    name: "force_withdrawal_handled",
    type: "event",
  },
  {
    inputs: [],
    name: "is_open",
    outputs: [
      {
        name: "res",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dai",
    outputs: [
      {
        name: "res",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registry",
    outputs: [
      {
        name: "res",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bridge",
    outputs: [
      {
        name: "res",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "user",
        type: "felt",
      },
    ],
    name: "wards",
    outputs: [
      {
        name: "res",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "user",
        type: "felt",
      },
    ],
    name: "rely",
    outputs: [],
    type: "function",
  },
  {
    inputs: [
      {
        name: "user",
        type: "felt",
      },
    ],
    name: "deny",
    outputs: [],
    type: "function",
  },
  {
    inputs: [],
    name: "close",
    outputs: [],
    type: "function",
  },
  {
    inputs: [
      {
        name: "ward",
        type: "felt",
      },
      {
        name: "dai",
        type: "felt",
      },
      {
        name: "bridge",
        type: "felt",
      },
      {
        name: "registry",
        type: "felt",
      },
    ],
    name: "constructor",
    outputs: [],
    type: "constructor",
  },
  {
    inputs: [
      {
        name: "l1_recipient",
        type: "felt",
      },
      {
        name: "amount",
        type: "Uint256",
      },
    ],
    name: "initiate_withdraw",
    outputs: [],
    type: "function",
  },
  {
    inputs: [
      {
        name: "from_address",
        type: "felt",
      },
      {
        name: "l2_recipient",
        type: "felt",
      },
      {
        name: "amount_low",
        type: "felt",
      },
      {
        name: "amount_high",
        type: "felt",
      },
      {
        name: "sender_address",
        type: "felt",
      },
    ],
    name: "handle_deposit",
    outputs: [],
    type: "l1_handler",
  },
  {
    inputs: [
      {
        name: "from_address",
        type: "felt",
      },
      {
        name: "l2_sender",
        type: "felt",
      },
      {
        name: "l1_recipient",
        type: "felt",
      },
      {
        name: "amount_low",
        type: "felt",
      },
      {
        name: "amount_high",
        type: "felt",
      },
    ],
    name: "handle_force_withdrawal",
    outputs: [],
    type: "l1_handler",
  },
] as const;
