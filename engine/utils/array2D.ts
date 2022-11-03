function create_array_2D<T>(width: number, height: number): T[][] {
  const array2D = Array(height);
  for (let i = 0; i < height; ++i) array2D[i] = Array(width);
  return array2D;
}

export default create_array_2D;
