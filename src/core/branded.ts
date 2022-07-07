import { Schema, TypeOf, ZodTypeAny } from 'zod'

export type Branded<T, Name> = T & { readonly __brand: Name }

export const branded = <Spec extends ZodTypeAny, Name extends string>(
  x: Spec,
  _: Name,
) => x as Schema<Branded<TypeOf<Spec>, Name>>

export type Unbrand<B> = B extends Branded<infer T, any> ? T : B
