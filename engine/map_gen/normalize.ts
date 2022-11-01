function normalize(x: number, min: number, max: number) {
  return (x - min) / (max - min);
}

function normalize_simplex(x: number) {
  return (x + 1) / 2;
}

export { normalize, normalize_simplex };
