export type Unary = (arg: any) => any
export type Binary = (fst: any, snd: any) => any

export const pipe = (arg: any, ...fns: Unary[]) => {
  for (const fn of fns) {
    arg = fn(arg)
  }
  return arg
}
