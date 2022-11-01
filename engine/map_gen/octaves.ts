type NoiseFunction = (x: number, y: number) => number;

function octaves(x: number, y: number, octaves: number, freq: number, noise: NoiseFunction) {
  let result = 0;
  let amp = 1;
  let _freq = freq;
  let maxAmp = 0;

  for (let i = 0; i < octaves; ++i) {
    result += noise(x * _freq, y * _freq) * amp;
    maxAmp += amp;
    amp /= 2;
    _freq *= 2;
  }

  return result / maxAmp;
}

export default octaves;
