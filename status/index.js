const withJWT = require('../lib/with-jwt')
const { ObjectId } = require('mongodb')
const { logger } = require('@vtfk/logger')
const HTTPError = require('../lib/http-error')
const mongo = require('../lib/get-mongo')
const getResponse = require('../lib/get-response-object')

const handleStatus = async (context, req) => {
  const { id } = req.params
  const { data } = req.body

  try {
    if (id === undefined) {
      throw new HTTPError(400, 'Missing id', null)
    }

    if (data === undefined) {
      throw new HTTPError(400, 'Missing data', null)
    }

    const _id = ObjectId(id)
    const logs = await mongo()
    const status = {
      status: data.status,
      timestamp: new Date().getTime()
    }
    logger('info', ['status', 'update', 'id', id])
    const result = await logs.updateOne({ _id }, { $push: { status: status } })
    logger('info', ['status', 'update', 'id', id, 'success', data.status])
    return getResponse(result)
  } catch (error) {
    logger('error', ['status', 'error', error])
    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, 'An unknown error occured', error).toJSON()
  }
}

module.exports = (context, req) => withJWT(context, req, handleStatus)
