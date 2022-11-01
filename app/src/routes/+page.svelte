<script lang="ts">
  import { gen_opinionated_noise_map, type NoiseMap } from "engine/map_gen";
  import { canvas_draw_grid } from "$lib/canvas";
  import { onMount } from "svelte";

  const height = 250;
  const width = 600;

  let canvas: HTMLCanvasElement;
  let noise_map: NoiseMap;

  function generate() {
    noise_map = gen_opinionated_noise_map(width, height);
    canvas_draw_grid(canvas, noise_map);
  }

  onMount(() => {
    generate();
  });
</script>

<canvas id="canvas" bind:this={canvas} width={width * 2} height={height * 2} />
<button on:click={generate}>Regenerate map</button>
