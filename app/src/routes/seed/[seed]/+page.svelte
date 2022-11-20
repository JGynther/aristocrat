<script lang="ts">
  import { gen_noise_map, type NoiseMap } from "engine/map_gen";
  import { parse_seed } from "engine/map_gen/seed";
  import { canvas_draw_grid } from "$lib/canvas";
  import { onMount } from "svelte";

  import { page } from "$app/stores";

  const height = 250;
  const width = 600;

  const permutation_table = parse_seed($page.params.seed);
  let canvas: HTMLCanvasElement;
  let noise_map: NoiseMap;

  function generate() {
    noise_map = gen_noise_map(width, height, 16, 0.01, permutation_table);
    canvas_draw_grid(canvas, noise_map);
  }

  onMount(() => {
    generate();
  });
</script>

<canvas id="canvas" bind:this={canvas} width={width * 2} height={height * 2} />
