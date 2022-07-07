export function get<T extends object, K extends keyof T>(obj: T, key: K): T[K]

export function get<T extends object, K extends keyof T, K2 extends keyof T[K]>(
  obj: T,
  key: [K, K2],
): T[K][K2]

export function get<
  T extends object,
  K extends keyof T,
  K2 extends keyof T[K],
  K3 extends keyof T[K][K2],
>(obj: T, key: [K, K2, K3]): T[K][K2][K3]

export function get<T extends object, Keys extends string[]>(
  obj: T,
  keys: Keys,
): unknown {
  return keys.reduce((acc, key) => (acc as any)[key], obj)
}
