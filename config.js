module.exports = {
  MONGODB_CONNECTION: process.env.MONGODB_CONNECTION || undefined,
  MONGODB_COLLECTION: process.env.MONGODB_COLLECTION || undefined,
  MONGODB_NAME: process.env.MONGODB_NAME || undefined,
  JWT_SECRET: undefined || process.env.JWT_SECRET,
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST || undefined,
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || undefined,
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME || undefined
}
