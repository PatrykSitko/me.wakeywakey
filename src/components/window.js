export function getCorrectedPosition(
  point = { x: undefined, y: undefined },
  dimension = { width: 0, height: 0 },
  styleFormat = true
) {
  const { x, y, width, height } = { ...point, ...dimension };
  const { innerWidth, innerHeight } = window;
  const left = x < innerWidth - width ? x : innerWidth - width;
  const top = y < innerHeight - height ? y : innerHeight - height;
  return styleFormat
    ? { left, top, ...dimension }
    : { x: left, y: top, ...dimension };
}
