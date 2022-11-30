import { TABLE, REVERSE } from "./tables";
import { encode64, decode64 } from "./encode";

type TABLEVALUES = keyof typeof TABLE;

function generate_seed(permutation_table: Uint8Array) {
  let seed = "";

  for (let i = 0; i < 256; ++i) {
    const lookup = `${permutation_table[i]}` as TABLEVALUES;
    seed += TABLE[lookup];
  }

  return encode64(seed);
}

type REVERSEVALUES = keyof typeof REVERSE;

function parse_seed(seed: string) {
  const decoded = decode64(seed);
  const permutation_table = new Uint8Array(512);

  for (let i = 0, j = 0; i < 256; ++i, j += 2) {
    const lookup = (decoded[j] + decoded[j + 1]) as REVERSEVALUES;
    permutation_table[i] = REVERSE[lookup];
  }

  for (let i = 0; i < 256; ++i) permutation_table[i + 256] = permutation_table[i];

  return permutation_table;
}

export { generate_seed, parse_seed };
