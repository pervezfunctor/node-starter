import { expect, it } from 'vitest'
import { pipe } from './pipe'
import { filter, map, reduce } from './pipe_fns'

it('pipe', () => {
  const result = pipe(
    [1, 2, 3, 4, 5],
    filter(x => x % 2 === 0),
    map(x => x * 2),
    reduce((acc, x) => acc * x, 1),
  )

  expect(result).toMatchSnapshot()
})
