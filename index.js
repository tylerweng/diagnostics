// Import the appropriate service and chosen wrappers
const {
  actionssdk,
  Image,
} = require('actions-on-google')

const {createClient, setVal, getVal, exitClient} = require('./database.js')

// setVal(redisClient, "kappa", 1)
// setVal(redisClient, "keepo", 1)
// exitClient(redisClient)

// Create an app instance
const redisClient = createClient();
const app = actionssdk()

// Register handlers for Actions SDK intents

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