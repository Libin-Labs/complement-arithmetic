function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function big(value: bigint): bigint {
  if (typeof value !== 'bigint') throw new TypeError('Expected bigint');
  const limit = (1n << 4096n) - 1n;
  if (value > limit || value < -limit) throw new RangeError('4096-bit budget exceeded');
  return value;
}
function modulus(width: number): bigint {
  integer(width, 1, 4096);
  return 1n << BigInt(width);
}
function word(v: bigint, m: bigint): void {
  big(v);
  if (v < 0n || v >= m) throw new RangeError('Word outside width');
}
export function toWord(value: bigint, width: number): bigint {
  const m = modulus(width);
  big(value);
  if (value < -(m >> 1n) || value >= m >> 1n) throw new RangeError('Signed value outside width');
  return value < 0n ? value + m : value;
}
export function fromWord(value: bigint, width: number): bigint {
  const m = modulus(width);
  word(value, m);
  return value >= m / 2n ? value - m : value;
}
export function addWords(
  a: bigint,
  b: bigint,
  width: number,
): { word: bigint; carry: boolean; overflow: boolean } {
  const m = modulus(width);
  word(a, m);
  word(b, m);
  const sum = a + b,
    result = sum % m,
    sign = m / 2n;
  return {
    word: result,
    carry: sum >= m,
    overflow: a >= sign === b >= sign && result >= sign !== a >= sign,
  };
}
