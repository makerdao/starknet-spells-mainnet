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
    members: [
      {
        name: "target_domain",
        offset: 0,
        type: "felt",
      },
      {
        name: "receiver",
        offset: 1,
        type: "felt",
      },
      {
        name: "operator",
        offset: 2,
        type: "felt",
      },
      {
        name: "amount",
        offset: 3,
        type: "felt",
      },
      {
        name: "timestamp",
        offset: 4,
        type: "felt",
      },
    ],
    name: "TeleportData",
    size: 5,
    type: "struct",
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
    data: [
      {
        name: "what",
        type: "felt",
      },
      {
        name: "domain",
        type: "felt",
      },
      {
        name: "data",
        type: "felt",
      },
    ],
    keys: [],
    name: "File",
    type: "event",
  },
  {
    data: [
      {
        name: "source_domain",
        type: "felt",
      },
      {
        name: "target_domain",
        type: "felt",
      },
      {
        name: "receiver",
        type: "felt",
      },
      {
        name: "operator",
        type: "felt",
      },
      {
        name: "amount",
        type: "felt",
      },
      {
        name: "nonce",
        type: "felt",
      },
      {
        name: "timestamp",
        type: "felt",
      },
    ],
    keys: [],
    name: "TeleportInitialized",
    type: "event",
  },
  {
    data: [
      {
        name: "source_domain",
        type: "felt",
      },
      {
        name: "target_domain",
        type: "felt",
      },
      {
        name: "receiver",
        type: "felt",
      },
      {
        name: "operator",
        type: "felt",
      },
      {
        name: "amount",
        type: "felt",
      },
      {
        name: "nonce",
        type: "felt",
      },
      {
        name: "timestamp",
        type: "felt",
      },
    ],
    keys: [],
    name: "TeleportRegisterFinalized",
    type: "event",
  },
  {
    data: [
      {
        name: "target_domain",
        type: "felt",
      },
      {
        name: "dai",
        type: "Uint256",
      },
    ],
    keys: [],
    name: "Flushed",
    type: "event",
  },
  {
    inputs: [],
    name: "nonce",
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
    name: "teleport_gateway",
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
    name: "domain",
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
        name: "domain",
        type: "felt",
      },
    ],
    name: "valid_domains",
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
        name: "domain",
        type: "felt",
      },
    ],
    name: "batched_dai_to_flush",
    outputs: [
      {
        name: "res",
        type: "Uint256",
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
        name: "nonce",
        type: "felt",
      },
    ],
    name: "teleports",
    outputs: [
      {
        name: "res",
        type: "TeleportData",
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
        name: "teleport_gateway",
        type: "felt",
      },
      {
        name: "domain",
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
        name: "what",
        type: "felt",
      },
      {
        name: "domain",
        type: "felt",
      },
      {
        name: "data",
        type: "felt",
      },
    ],
    name: "file",
    outputs: [],
    type: "function",
  },
  {
    inputs: [
      {
        name: "target_domain",
        type: "felt",
      },
      {
        name: "receiver",
        type: "felt",
      },
      {
        name: "amount",
        type: "felt",
      },
      {
        name: "operator",
        type: "felt",
      },
    ],
    name: "initiate_teleport",
    outputs: [],
    type: "function",
  },
  {
    inputs: [
      {
        name: "target_domain",
        type: "felt",
      },
      {
        name: "receiver",
        type: "felt",
      },
      {
        name: "amount",
        type: "felt",
      },
      {
        name: "operator",
        type: "felt",
      },
      {
        name: "nonce",
        type: "felt",
      },
      {
        name: "timestamp",
        type: "felt",
      },
    ],
    name: "finalize_register_teleport",
    outputs: [],
    type: "function",
  },
  {
    inputs: [
      {
        name: "target_domain",
        type: "felt",
      },
    ],
    name: "flush",
    outputs: [],
    type: "function",
  },
] as const;
