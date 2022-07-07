import { Binary, Unary } from './pipe'

export const map = (fn: Unary) => (arr: any[]) => arr.map(fn)

export const filter = (fn: Unary) => (arr: any[]) => arr.filter(fn)

export const reduce = (fn: Binary, seed: any) => (arr: any[]) =>
  arr.reduce(fn, seed)

export const concat = (arr: any[]) => (arr2: any[]) => arr.concat(arr2)

export const flat = (arr: any[]) => arr.flat()
export const flatMap = (fn: Unary) => (arr: any[]) => arr.flatMap(fn)

export const slice = (start?: number, end?: number) => (arr: any[]) =>
  arr.slice(start, end)

export const take = (n: number) => (arr: any[]) => arr.slice(0, n)
export const drop = (n: number) => (arr: any[]) => arr.slice(n)

export const takeWhile = (fn: Unary) => (arr: any[]) => {
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i])) {
      return arr.slice(0, i)
    }
  }

  return arr
}
export const dropWhile = (fn: Unary) => (arr: any[]) => {
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i])) {
      return arr.slice(i)
    }
  }

  return []
}
