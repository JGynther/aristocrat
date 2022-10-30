const GRAD3 = [
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
  [1, 0],
  [-1, 0],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [0, 1],
  [0, -1],
];

function dot(g: number[], x: number, y: number) {
  return g[0] * x + g[1] * y;
}

function create_permutation_table(random: () => number): Uint8Array {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; ++i) p[i] = i;

  for (let i = 255; i > 0; --i) {
    const n = Math.floor(random() * (i + 1));
    const q = p[i];
    p[i] = p[n];
    p[n] = q;
  }

  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; ++i) perm[i] = p[i & 255];

  return perm;
}

function simplex_noise(xin: number, yin: number, perm: Uint8Array): number {
  // https://weber.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf
  let n0, n1, n2;

  const F2 = 0.5 * (Math.sqrt(3) - 1);
  const s = (xin + yin) * F2;
  const i = Math.floor(xin + s);
  const j = Math.floor(yin + s);

  const G2 = (3.0 - Math.sqrt(3)) / 6.0;
  const t = (i + j) * G2;
  const X0 = i - t;
  const Y0 = j - t;
  const x0 = xin - X0;
  const y0 = yin - Y0;

  const i1 = x0 > y0 ? 1 : 0;
  const j1 = x0 > y0 ? 0 : 1;

  const x1 = x0 - i1 + G2;
  const y1 = y0 - j1 + G2;
  const x2 = x0 - 1.0 + 2.0 * G2;
  const y2 = y0 - 1.0 + 2.0 * G2;

  const ii = i & 255;
  const jj = j & 255;
  const gi0 = perm[ii + perm[jj]] % 12;
  const gi1 = perm[ii + i1 + perm[jj + j1]] % 12;
  const gi2 = perm[ii + 1 + perm[jj + 1]] % 12;

  let t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 < 0) n0 = 0.0;
  else {
    t0 = t0 * t0;
    n0 = t0 * t0 * dot(GRAD3[gi0], x0, y0);
  }

  let t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 < 0) n1 = 0.0;
  else {
    t1 = t1 * t1;
    n1 = t1 * t1 * dot(GRAD3[gi1], x1, y1);
  }

  let t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 < 0) n2 = 0.0;
  else {
    t2 = t2 * t2;
    n2 = t2 * t2 * dot(GRAD3[gi2], x2, y2);
  }

  return 70.0 * (n0 + n1 + n2);
}

function create_noise_function(random = Math.random) {
  const perm = create_permutation_table(random);
  return (x: number, y: number) => simplex_noise(x, y, perm);
}

export default create_noise_function;
