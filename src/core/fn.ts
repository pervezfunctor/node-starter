import { tuple, TypeOf, ZodTypeAny } from 'zod'
import { Unbrand } from './branded'
import { cast, ensure } from './casts'

type Args<T extends [ZodTypeAny, ...ZodTypeAny[]] | []> = {
  [K in keyof T]: Unbrand<TypeOf<T[K]>>
}

export function fn<
  T extends [ZodTypeAny, ...ZodTypeAny[]] | [],
  R extends ZodTypeAny,
>(
  argspecs: T,
  rspec: R,
  fn: (...args: Args<T>) => TypeOf<R>,
): (...args: Args<T>) => TypeOf<R> {
  return (...args) => {
    ensure(tuple(argspecs), args)

    return cast(rspec, fn(...args))
  }
}
