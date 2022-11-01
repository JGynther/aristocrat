<script lang="ts">
  import { gen_opinionated_noise_map } from "engine/map_gen";
  import draw_canvas_grid from "$lib/canvas";
  import { onMount } from "svelte";

  const height = 250;
  const width = 600;

  let canvas: HTMLCanvasElement;
  let noise_map = gen_opinionated_noise_map(width, height);

  function regenerate() {
    noise_map = gen_opinionated_noise_map(width, height);
    draw_canvas_grid(canvas, noise_map);
  }

  onMount(() => {
    draw_canvas_grid(canvas, noise_map);
  });
</script>

<canvas id="canvas" bind:this={canvas} width={width * 2} height={height * 2} />
<button on:click={regenerate}>Regenerate map</button>
