export const fibo = (n: number): number[] => {
  const fibo: number[] = [0, 1]

  if (n <= 2) {
    return fibo.slice(n)
  }

  for (let i = 2; i < n; i++) {
    fibo.push(fibo.at(-1)! + fibo.at(-2)!)
  }

  return fibo
}

type FiboResult =
  | { value: number; done: false }
  | { value: undefined; done: true }

export const fibo2 = (n: number): { next: () => FiboResult } => {
  let lo = 0
  let hi = 1
  return {
    next: () => {
      if (n-- === 0) {
        return { done: true, value: undefined }
      }

      const value = lo
      hi = hi + lo
      lo = hi - lo
      return { value, done: false }
    },
  }
}

export class Fibo {
  #count: number
  #lo: number
  #hi: number

  constructor(count: number) {
    this.#count = count
    this.#lo = 0
    this.#hi = 1
  }

  next() {
    if (this.#count === 0) {
      return
    }
    this.#count--
    const t = this.#lo
    this.#hi = this.#hi + this.#lo
    this.#lo = this.#hi - this.#lo
    return t
  }
}

export function* ifibo(n: number): IterableIterator<number> {
  let lo = 0
  let hi = 1

  for (let i = 0; i < n; i++) {
    yield lo
    hi = hi + lo
    lo = hi - lo
  }
}
