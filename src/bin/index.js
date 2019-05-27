const fs = require('fs').promises
const path = require('path')
const vm = require('vm')
const globby = require('globby')

const runner = require('../runner')

const logger = require('../logger')

const globScope = {...global}
globby(['**/*.test.js', '!node_modules'], {}).then(async (paths) => {



  console.log(paths)
  const tests = await Promise.all(paths.map(p => fs.readFile(p, 'utf8').then(c => ({
    code: c,
    path: p
  }))))

  console.log('tests', tests)

  const passes = []
  const fails = []
  tests.forEach(async t => {
    const describe = require('../describe')({
      passed: (message) => {
        passes.push({ test: t.path, block: message })
      },
      failed: (message, error) => {
        fails.push({ test: t.path, block: message, reason: error })
      },
    })
    code = `'use strict'; async function run() { try { ${t.code}; this.callback(null); } catch(error) { this.callback(error); } }; run.apply(this)`
    const sandbox = { Object, WeakMap, Map, Set, Array, require, setTimeout, describe, console: logger, callback: function(error) {
      if (error) {
          logger.log(error.stack);
      } else {
          logger.log(this.response);
      }
  } };
    vm.createContext(sandbox);
    await vm.runInContext(t.code, sandbox);
  })

  logger.info('passes', passes)
  logger.error('fails', fails)

  const mappedPasses = []


})