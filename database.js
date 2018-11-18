const redis = require("redis")

const createClient = () => redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD
})
const exitClient = redisClient => redisClient.quit()
const setVal = (redisClient, key, value) => redisClient.set(key, value)
const getVal = (redisClient, key) => redisClient.get(key)

module.exports = {
  createClient: createClient,
  setVal: setVal,
  getVal: getVal,
  exitClient: exitClient
}
