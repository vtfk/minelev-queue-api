const withJWT = require('../lib/with-jwt')
const { logger } = require('@vtfk/logger')
const HTTPError = require('../lib/http-error')
const mongo = require('../lib/get-mongo')
const getResponse = require('../lib/get-response-object')

const handleQueue = async (context, req) => {
  try {
    const logs = await mongo()
    logger('info', ['queue', 'get next document in queue'])
    const documents = await logs.find({ isQueued: true }).sort({ timestamp: 1 }).limit(1).toArray()
    if (documents.length > 0) {
      logger('info', ['queue', 'get next document in queue', 'success', documents[0]._id])
      logger('info', ['queue', 'get next document in queue', 'success', documents[0]._id, 'set to not in queue'])
      await logs.updateOne({ _id: documents[0]._id }, { $set: { isQueued: false } })
      logger('info', ['queue', 'get next document in queue', 'success', documents[0]._id, 'set to not in queue', 'success'])
    } else {
      logger('info', ['queue', 'get next document in queue', 'success', 'no documents in queue'])
    }
    return getResponse(documents)
  } catch (error) {
    logger('error', ['queue', 'error', error])
    return new HTTPError(500, 'An unknown error occured', error).toJSON()
  }
}

module.exports = (context, req) => withJWT(context, req, handleQueue)
