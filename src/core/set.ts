import { produce } from 'immer'
import { shift } from './array'

export function set<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  v: T[K],
): T

export function set<T extends object, K extends keyof T, K2 extends keyof T[K]>(
  obj: T,
  key: [K, K2],
  v: T[K][K2],
): T

export function set<
  T extends object,
  K extends keyof T,
  K2 extends keyof T[K],
  K3 extends keyof T[K][K2],
>(obj: T, v: T[K][K2][K3], key: [K, K2, K3]): T

export function set<T extends object, Keys extends string[]>(
  obj: T,
  keys: Keys,
  v: unknown,
): T {
  return produce(obj, (t: any) => {
    for (const k of shift(keys)) {
      t[k] = t[k]
    }
    t[keys.at(-1)!] = v
  })
}
