function draw_canvas_grid(canvas: HTMLCanvasElement, grid: number[][]) {
  const context = canvas.getContext("2d");

  if (!context) return;

  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      const value = grid[y][x] * 255;
      context.fillStyle = `rgb(${value}, ${value}, ${value})`;
      context.fillRect(x * 2, y * 2, 2, 2);
    }
  }
}

export default draw_canvas_grid;
