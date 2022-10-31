<script lang="ts">
  import create_noise_function from "engine/map_gen/noise";
  import { onMount } from "svelte";

  const _noise = create_noise_function();
  function noise(x: number, y: number) {
    return _noise(x, y) / 2 + 0.5;
  }

  function octaves(x: number, y: number, octaves: number) {
    let result = 0;
    let freq = 0.01;
    let amp = 1;
    let maxAmp = 0;

    for (let i = 0; i < octaves; ++i) {
      result += noise(x * freq, y * freq) * amp;
      maxAmp += amp;
      amp /= 2;
      freq *= 2;
    }

    result /= maxAmp;
    return result;
  }

  const height = 250;
  const width = 600;

  onMount(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        const value = octaves(x, y, 10) * 255;
        context.fillStyle = `rgb(${value}, ${value}, ${value})`;
        context.fillRect(x * 2, y * 2, 2, 2);
      }
    }
  });
</script>

<canvas id="canvas" width={width * 2} height={height * 2} />
