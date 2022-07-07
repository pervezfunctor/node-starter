import {
  any,
  array,
  boolean,
  number,
  record,
  string,
  TypeOf,
  z,
  ZodSchema,
} from 'zod'

function is<T extends ZodSchema>(spec: T, value: unknown): value is TypeOf<T> {
  return spec.safeParse(value).success
}

export function equal(x: unknown, y: unknown): boolean {
  if (
    is(string(), x) ||
    is(number(), x) ||
    is(boolean(), x) ||
    is(z.null(), x) ||
    is(z.undefined(), x)
  ) {
    return x === y
  }

  if (is(array(any()), x) && is(array(any()), y)) {
    return x.every((x, i) => equal(x, y[i]))
  }

  if (is(record(string(), any()), x) && is(record(string(), any()), y)) {
    return Object.keys(x).every(key => equal(x[key], y[key]))
  }

  return x === y
}
