function create_array_2D(width: number, height: number) {
  const array2D = Array(height);
  for (let i = 0; i < height; ++i) array2D[i] = Array(width);
  return array2D;
}

export default create_array_2D;
