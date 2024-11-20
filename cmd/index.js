const express = require('express')
const app = express()
const healthCheckRouter = require('../module/health-check/routes')

app.use('/', healthCheckRouter)

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})