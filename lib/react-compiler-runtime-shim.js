// React 18 does not export "react/compiler-runtime".
// PortableText only needs the memo cache helper `c` from that entry.
const SENTINEL = Symbol.for("react.memo_cache_sentinel");

export function c(size) {
  const cache = new Array(size);
  for (let i = 0; i < size; i += 1) {
    cache[i] = SENTINEL;
  }
  return cache;
}
