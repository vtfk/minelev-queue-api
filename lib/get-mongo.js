const { MongoClient } = require('mongodb')
const { logger } = require('@vtfk/logger')
const { MONGODB_CONNECTION, MONGODB_COLLECTION, MONGODB_NAME } = require('../config')

let client = null

module.exports = () => {
  if (!MONGODB_CONNECTION) {
    logger('error', ['get-mongo', 'missing MONGODB_CONNECTION'])
    throw new Error('Missing MONGODB_CONNECTION')
  }

  if (client && !client.isConnected) {
    client = null
    logger('warn', ['get-mongo', 'mongo connection lost', 'client discarded'])
  }

  if (client === null) {
    client = new MongoClient(MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    logger('info', ['get-mongo', 'mongo client init'])
  } else if (client.isConnected) {
    logger('info', ['get-mongo', 'mongo connection still active', 'using current client'])
    return client.db(MONGODB_NAME).collection(MONGODB_COLLECTION)
  }

  return new Promise((resolve, reject) => {
    client.connect(error => {
      if (error) {
        client = null
        logger('error', ['get-mongo', 'client connect error', error])
        return reject(error)
      }

      logger('info', ['get-mongo', 'client connected'])
      return resolve(client.db(MONGODB_NAME).collection(MONGODB_COLLECTION))
    })
  })
}
