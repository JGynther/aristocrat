const RADIX64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

function hexStringToRadix64(str: string) {
  let int = parseInt(str, 16);
  let encoded = "";
  while (int > 0) {
    encoded = RADIX64[int % 64] + encoded;
    int = Math.floor(int / 64);
  }
  return encoded;
}

function radix64ToHex(str: string) {
  const limit = str.length;
  let result = 0;
  for (let i = 0; i < limit; ++i) {
    result = 64 * result + RADIX64.indexOf(str[i]);
  }
  return result.toString(16);
}

function encode64(seed: string) {
  let encoded = "";

  for (let i = 0; i < seed.length; i += 8) {
    const sub = seed.substring(i, i + 8);
    let radix64 = hexStringToRadix64(sub);
    while (radix64.length < 6) {
      radix64 = "+" + radix64;
    }
    encoded += radix64;
  }

  return encoded;
}

function decode64(encoded: string) {
  let seed = "";

  for (let i = 0; i < encoded.length; i += 6) {
    const sub = encoded.substring(i, i + 6);
    const fixed = sub.replaceAll("+", "");
    let hex = radix64ToHex(fixed);
    while (hex.length < 8) {
      hex = "0" + hex;
    }
    seed += hex;
  }

  return seed.toUpperCase();
}

export { encode64, decode64 };
