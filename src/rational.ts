import { branded, cast, fn } from '@core'
import { boolean, number, object, TypeOf } from 'zod'

const Numerator = branded(number().int(), 'Numerator')
type Numerator = TypeOf<typeof Numerator>

const Denominator = branded(
  number()
    .int()
    .refine(n => n > 0),
  'Denominator',
)
type Denominator = TypeOf<typeof Denominator>

function gcd(x: number, y: number): number {
  return y === 0 ? x : gcd(y, x % y)
}

const Rational = branded(
  object({ num: Numerator, den: Denominator }),
  'Rational',
)
type Rational = TypeOf<typeof Rational>

export const rational = fn(
  [Numerator, Denominator],
  Rational,
  (numerator, denominator) => {
    const g = gcd(numerator, denominator)
    const r = {
      num: (numerator / g) as Numerator,
      den: (denominator / g) as Denominator,
    }
    return r as Rational
  },
)

export const add = fn([Rational, Rational], Rational, (r1, r2) =>
  rational(r1.num * r2.den + r2.num * r1.den, r1.den * r2.den),
)

export const eq = fn(
  [Rational, Rational],
  boolean(),
  (r1, r2) => r1.num === r2.num && r1.den === r2.den,
)

export const mul = fn([Rational, Rational], Rational, (r1, r2) => {
  return rational(r1.num * r2.num, r1.den * r2.den)
})

export const sub = fn([Rational, Rational], Rational, (r1, r2) => {
  return rational(r1.num * r2.den - r2.num * r1.den, r1.den * r2.den)
})

export const div = fn([Rational, Rational], Rational, (r1, r2) => {
  return rational(r1.num * r2.den, r1.den * r2.num)
})

export class CRational {
  readonly #num: Numerator
  readonly #den: Denominator

  get numerator() {
    return this.#num
  }

  get denominator() {
    return this.#den
  }

  constructor(num: number, den: number) {
    const g = gcd(num, den)

    const n = cast(Numerator, num / g)
    const d = cast(Denominator, den / g)
    this.#num = n
    this.#den = d
  }

  add(that: CRational) {
    return new CRational(
      this.#num * that.#den + that.#num * this.#den,
      this.#den * that.#den,
    )
  }

  sub(that: CRational) {
    return new CRational(
      this.#num * that.#den - that.#num * this.#den,
      this.#den * that.#den,
    )
  }

  mul(that: CRational) {
    return new CRational(this.#num * that.#num, this.#den * that.#den)
  }

  div(that: CRational) {
    return new CRational(this.#num * that.#den, this.#den * that.#num)
  }

  eq(that: CRational) {
    return this.#num === that.#num && this.#den === that.#den
  }
}
