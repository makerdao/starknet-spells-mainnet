type StateMutability = "view" | "external";

type AbiParameter = {
  type: string;
  name: string;
};

type AbiFunction = {
  name: string;
  inputs: readonly AbiParameter[];
  outputs: readonly AbiParameter[];
} & (
  | { type: "function"; stateMutability?: StateMutability }
  | { type: "constructor" }
  | { type: "l1_handler" }
);

type AbiMember = {
  name: string;
  offset: number;
  type: string;
};

type AbiStruct = {
  type: "struct";
  name: string;
  size: number;
  members: readonly AbiMember[];
};

type AbiEvent = {
  type: "event";
  name: string;
  keys: readonly [];
  data: readonly AbiParameter[];
};

export type Abi = readonly (AbiFunction | AbiStruct | AbiEvent)[];
