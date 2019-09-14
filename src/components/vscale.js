export function vmin(value) {
  return window.innerHeight <= window.innerWidth
    ? window.innerHeight * (value / 100)
    : window.innerWidth * (value / 100);
}

export function vmax(value) {
  return window.innerHeight >= window.innerWidth
    ? window.innerHeight * (value / 100)
    : window.innerWidth * (value / 100);
}
