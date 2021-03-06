// Import the appropriate service and chosen wrappers
// const {
//   actionssdk,
//   dialogflow
// } = require('actions-on-google')


const {createClient, setVal, getVal, exitClient} = require('./database.js')

const bodyParser = require('body-parser')

const express = require('express')
const router = express.Router()
const redisClient = createClient()

router.post('/set', (req, res) => {
  console.log(`POST req to /redis/set`)
  setVal(redisClient, req.body.key, req.body.value)
  res.json({
    speech: 'speech',
    displayText: 'displayText',
    source: 'source'
  });
})

router.get('/licks', (req, res) => {
  console.log(`GET req to /redis/licks`)
  redisClient.get("licks", (err, licks) =>
    res.json({
      speech: licks,
      displayText: licks,
      source: 'source'
    })
  )
})

const app = express()
const PORT = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/redis', router)
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

