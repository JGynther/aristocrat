import { simplex_noise, create_permutation_table } from "./noise";
import octaves from "./octaves";
import create_array_2D from "../utils/array2D";

type NoiseMap = number[][];

function gen_opinionated_noise_map(width: number, height: number): NoiseMap {
  return gen_noise_map(width, height, 16, 0.01);
}

function gen_noise_map(
  width: number,
  height: number,
  num_of_octaves: number,
  freq: number,
  perm: Uint8Array = create_permutation_table()
): NoiseMap {
  const map = create_array_2D<number>(width, height);

  function noise(x: number, y: number) {
    return simplex_noise(x, y, perm);
  }

  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      map[y][x] = octaves(x, y, num_of_octaves, freq, noise);
    }
  }

  return map;
}

export { gen_noise_map, gen_opinionated_noise_map };
export type { NoiseMap };
