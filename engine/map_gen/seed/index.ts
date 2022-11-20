import { TABLE, REVERSE } from "./tables";

type TABLEVALUES = keyof typeof TABLE;

function generate_seed(permutation_table: Uint8Array) {
  let seed = "";

  for (let i = 0; i < 256; ++i) {
    const lookup = `${permutation_table[i]}` as TABLEVALUES;
    seed += TABLE[lookup] + ":";
  }

  return seed.slice(0, -1);
}

type REVERSEVALUES = keyof typeof REVERSE;

function parse_seed(seed: string) {
  const permutation_table = new Uint8Array(512);
  const split = seed.split(":");

  for (let i = 0; i < 512; ++i) {
    const lookup = split[255 & i] as REVERSEVALUES;
    permutation_table[i] = REVERSE[lookup];
  }

  return permutation_table;
}

export { generate_seed, parse_seed };
