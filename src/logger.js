const { inspect } = require('util')
const chalk = require('chalk')

module.exports = {
  log:  (...message) => {
    if (message.length === 1 && typeof message[0] === 'string') {
      console.info(chalk.bold(...message))
    } else if (message.length === 1 && typeof message[0] === 'object') {
      console.info(chalk.bold(inspect(message[0], true, 4, true)))
    } else {
      console.info(chalk.bold(...message))
    }

  },
  info: (...message) => {
    console.log(message.length)
    if (message.length === 1 && typeof message[0] === 'string') {
      console.info(chalk.bold(...message))
    } else if (message.length === 1 && typeof message[0] === 'object') {
      console.info(chalk.bold(inspect(message[0], true, 4, true)))
    } else {
      const [first, ...rest] = message
      console.info(chalk.bold(first,...rest.map(m => inspect(m, true, 4, true))))
    }
  },
  error:  (...message) => {
    if (message.length === 1 && typeof message[0] === 'string') {
      console.info(chalk.red.bold(...message))
    } else if (message.length === 1 && typeof message[0] === 'object') {
      console.info(chalk.red.bold(inspect(message[0], true, 4, true)))
    } else {
      const [first, ...rest] = message
      console.info(chalk.red.bold(first,...rest.map(m => inspect(m, true, 4, true))))

    }
  },
}