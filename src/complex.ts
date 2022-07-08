// @ts-nocheck

import { number, object } from 'zod'
import { cast, ensure } from '@core'

const Real = number()
const Imaginary = number()
const ComplexSpec = object({
  real: Real,
  imaginary: Imaginary,
})

function Complex(real: number, imaginary: number) {
  this.real = cast(Real, real)
  this.imaginary = cast(Imaginary, imaginary)
}

Complex.prototype.add = function (c: Complex) {
  ensure(ComplexSpec, this)
  ensure(ComplexSpec, c)
  return new Complex(this.real + c.real, this.imaginary + c.imaginary)
}

Complex.prototype.subtract = function (c: Complex) {
  ensure(ComplexSpec, this)
  ensure(ComplexSpec, c)
  return new Complex(this.real - c.real, this.imaginary - c.imaginary)
}

Complex.prototype.multiply = function (c: Complex) {
  ensure(ComplexSpec, this)
  ensure(ComplexSpec, c)
  return new Complex(
    this.real * c.real - this.imaginary * c.imaginary,
    this.real * c.imaginary + this.imaginary * c.real,
  )
}

Complex.prototype.divide = function (c: Complex) {
  ensure(ComplexSpec, this)
  ensure(ComplexSpec, c)
  const denominator = c.real * c.real + c.imaginary * c.imaginary
  return new Complex(
    (this.real * c.real + this.imaginary * c.imaginary) / denominator,
    (this.imaginary * c.real - this.real * c.imaginary) / denominator,
  )
}

Complex.prototype.equals = function (c: Complex) {
  ensure(ComplexSpec, this)
  ensure(ComplexSpec, c)
  return this.real === c.real && this.imaginary === c.imaginary
}

const c1 = new Complex(1, 2)
const c2 = new Complex(3, 4)
const c3 = c1.add(c2).multiply(c2).divide(c1).subtract(c2)

console.log(c3)
console.log(c1.equals(c2))
