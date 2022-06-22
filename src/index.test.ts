import {pass, test} from 'tap'
import add from './add'

pass('this test is always passing')

test('add', t => {
  t.equal(add(1, 2), 3)
  t.end()
})
