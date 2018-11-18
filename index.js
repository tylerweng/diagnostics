// Import the appropriate service and chosen wrappers
const {
  actionssdk,
  Image,
} = require('actions-on-google')

const {createClient, setVal, getVal, exitClient} = require('./database.js')

const express = require('express')

// setVal(redisClient, "kappa", 1)
// setVal(redisClient, "keepo", 1)
// exitClient(redisClient)

// Create an app instance
const redisClient = createClient();

// Register handlers for Actions SDK intents

const PORT = process.env.PORT || 5000
express()
  .get('/', (req, res) => {
    console.log(`Received GET req to /`)
    const app = actionssdk()
    app.intent('actions.intent.MAIN', conv => {
      conv.ask('Welcome to diagnostics!')
      conv.ask('Here are a list of actions you may take: how many, bye, cancel')
    })
    
    app.intent('actions.intent.TEXT', (conv, input) => {
      if (input === 'bye' || input === 'cancel') {
        return conv.close('See you later!')
      } else if (input === 'how many?') {
        const numberOfLicks = getVal(redisClient, 'licks')
        conv.ask(`You have ${numberOfLicks} licks`)
        conv.ask('Any other commands?')
      } else {
        conv.ask(`I didn't understand. Can you tell me something else?`)
      }
    })
  })
  .listen(PORT, () => console.log(`Listening on port: ${PORT}`))
