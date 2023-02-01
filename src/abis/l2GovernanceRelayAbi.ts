export default [
  {
    inputs: [
      {
        name: "l1_governance_relay",
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
        name: "from_address",
        type: "felt",
      },
      {
        name: "spell",
        type: "felt",
      },
    ],
    name: "relay",
    outputs: [],
    type: "l1_handler",
  },
] as const;
