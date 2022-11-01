import create_noise_function from "./noise";
import octaves from "./octaves";
import { normalize_simplex } from "./normalize";
import create_array_2D from "../utils/array2D";

type NoiseMap = number[][];

function gen_opinionated_noise_map(width: number, height: number): NoiseMap {
  const map = create_array_2D(width, height);
  const _noise = create_noise_function();

  function noise(x: number, y: number) {
    return normalize_simplex(_noise(x, y));
  }

  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      map[y][x] = octaves(x, y, 16, 0.01, noise);
    }
  }

  return map;
}

export { gen_opinionated_noise_map };
