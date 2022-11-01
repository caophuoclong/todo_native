export const unionKeys = <T extends object>(objs: T[]): (keyof T)[] => {
  const keys = objs.map(obj => Object.keys(obj));
  const union = Array.from(new Set(keys.flat())) as (keyof T)[];
  return union;
}
