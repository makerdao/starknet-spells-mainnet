// import daiAbi from "../abis/dai_abi_simple";
import { Abi } from "./abi";
import { TransactionReceipt } from "hardhat/types/runtime";

type Functions<C extends Abi> = Extract<C[number], { type: "function" }>;

type Param<N extends string, T extends "felt" | "Uint256"> = {
  name: N;
  type: T;
};

type MapInputType<T extends "felt" | "Uint256"> = T extends "felt"
  ? bigint | string
  : T extends "Uint256"
  ? bigint | string
  : never;

type MapOutputType<T extends "felt" | "Uint256"> = T extends "felt"
  ? bigint
  : T extends "Uint256"
  ? bigint
  : never;

// type MapInputParams<T> = T extends [infer P, ...infer R]
//   ? P extends Param<infer N, infer T>
// // named tuples does not work in ts as expected(yet?)
// //     ? [MapInputType<T>, MapParams<R>]
//     ? [N: T, ...rest: MapInputType<R>]
//     : never
//   : [];

// Another mapper idea(typing problems)
type MapInputParams<T> = {
  [K in keyof T]: T[K] extends Param<infer _, infer M>
    ? MapInputType<M>
    : never;
};

type MapOutputParams<T> = {
  [K in keyof T]: T[K] extends Param<infer _, infer M>
    ? MapOutputType<M>
    : never;
};

type FlattenIfSingle<T> = T extends readonly [infer A, ...infer R]
  ? R extends []
    ? A
    : T
  : never;

export type Contract<C extends Abi> = {
  [F in Functions<C> as F["name"]]: F["stateMutability"] extends "view"
    ? (
        ...args: MapInputParams<F["inputs"]>
      ) => Promise<FlattenIfSingle<MapOutputParams<F["outputs"]>>>
    : (...args: MapInputParams<F["inputs"]>) => Promise<TransactionReceipt>;
};

// export type DaiType = typeof daiAbi;

// const daiAbi = [
//   //   {
//   //     inputs: [
//   //       {
//   //         name: "ward",
//   //         type: "felt",
//   //       },
//   //     ],
//   //     name: "constructor",
//   //     outputs: [],
//   //     type: "constructor",
//   //   },
//   {
//     inputs: [
//       {
//         name: "owner",
//         type: "felt",
//       },
//       {
//         name: "spender",
//         type: "felt",
//       },
//     ],
//     name: "allowance",
//     outputs: [
//       {
//         name: "res",
//         type: "Uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         name: "owner",
//         type: "felt",
//       },
//       {
//         name: "spender",
//         type: "felt",
//       },
//     ],
//     name: "fake",
//     outputs: [
//       {
//         name: "a",
//         type: "Uint256",
//       },
//       {
//         name: "b",
//         type: "Uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         name: "user",
//         type: "felt",
//       },
//     ],
//     name: "wards",
//     outputs: [
//       {
//         name: "res",
//         type: "felt",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         name: "account",
//         type: "felt",
//       },
//       {
//         name: "amount",
//         type: "Uint256",
//       },
//     ],
//     name: "mint",
//     outputs: [],
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         name: "user",
//         type: "felt",
//       },
//     ],
//     name: "rely",
//     outputs: [],
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         name: "recipient",
//         type: "felt",
//       },
//       {
//         name: "amount",
//         type: "Uint256",
//       },
//     ],
//     name: "transfer",
//     outputs: [
//       {
//         name: "res",
//         type: "felt",
//       },
//     ],
//     type: "function",
//   },
// ] as const;
//
// type DaiAbi = typeof daiAbi;
// type Dai = Contract<DaiAbi>;
//
// let d: Dai;
