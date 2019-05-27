const assert = require('assert')
let executed = false
const delay = time => new Promise(resolve => {
  return setTimeout(()=> {
    console.log('executed delay')
    return resolve()
  }, time)
})
describe('The first describe block', async () => {
  console.log('describe')
  assert.equal(true, true, 'The describe is executed')
  executed = true
  await delay(100)
})
describe('The first failed describe block', () => {
  console.log('describe')
  assert.equal(true, false, 'The describe is executed')
  executed = true
})


