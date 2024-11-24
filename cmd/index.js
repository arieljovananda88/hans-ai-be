const express = require('express')
require('dotenv').config()
const app = express()
const healthCheckRouter = require('../module/health-check/routes')
const usersRouter = require('../module/users/routes')
const pantryItemsRouter = require('../module/pantry-items/routes')

app.use(express.json())
app.use('/', healthCheckRouter)
app.use('/users', usersRouter)
app.use('/pantry-items', pantryItemsRouter)

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})