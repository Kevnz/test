const logger = require('./logger')


module.exports = (emitter) => {

  logger.info('emitter', emitter)

  return async (message, block) => {
      logger.info('START>Describe')
      logger.info(message)
      logger.info(block)
      try {
        await block()
        emitter.passed(message)
      } catch (error) {
        logger.error(error)
        emitter.failed( {
          message,
          error
        })
      }

      logger.info('END>Describe')
    }

}