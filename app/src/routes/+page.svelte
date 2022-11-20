<script lang="ts">
  import { gen_noise_map, type NoiseMap } from "engine/map_gen";
  import { create_permutation_table } from "engine/map_gen/noise";
  import { canvas_draw_grid } from "$lib/canvas";
  import { onMount } from "svelte";

  const height = 250;
  const width = 600;

  let canvas: HTMLCanvasElement;
  let noise_map: NoiseMap;
  let permutation_table: Uint8Array;

  function generate() {
    permutation_table = create_permutation_table();
    noise_map = gen_noise_map(width, height, 16, 0.01, permutation_table);
    canvas_draw_grid(canvas, noise_map);
  }

  onMount(() => {
    generate();
  });
</script>

<canvas id="canvas" bind:this={canvas} width={width * 2} height={height * 2} />
<button on:click={generate}>Regenerate map</button>
