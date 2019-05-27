const assert = require('assert')
let executed = false

describe('The describe block', () => {
  console.log('describe')
  assert.equal(true, true, 'The describe is executed')
  executed = true
})
describe('The failed describe block', () => {
  console.log('describe')
  assert.equal(true, false, 'The describe is executed')
  executed = true
})
setTimeout(()=> {
  console.log('executed', executed)
}, 100)

