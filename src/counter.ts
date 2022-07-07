import { TypeOf, z } from 'zod'
import { cast } from './core/casts'

const Positive = z.number().int().positive()
type Positive = TypeOf<typeof Positive>

export class Counter {
  #count: Positive

  constructor(count: Positive) {
    this.#count = cast(Positive, count)
  }

  next() {
    return this.#count++
  }
}

export class ACounter {
  readonly #count: Positive

  constructor(count: Positive) {
    this.#count = cast(Positive, count)
  }

  get value() {
    return this.#count
  }

  next() {
    return new ACounter(this.#count + 1)
  }
}

export const acounter = (count: number = 0) => {
  const value = () => count
  const inc = () => counter(count + 1)

  return { inc, value }
}

const counter = (count: Positive) => {
  return {
    get value() {
      return count
    },
    next() {
      return counter(count + 1)
    },
  }
}

// const count = new Counter(100)
// count.next()
// count.next()
// count.next()

// let acount = new ACounter(100)
// acount = acount.next()
// acount.value
// acount = acount.next()
// acount.value
// acount = acount.next()
// acount.value

// let cnt = counter(100)
// cnt = cnt.next()
// cnt.value
// cnt = cnt.next()
// cnt.value
// cnt = cnt.next()
// cnt.value
