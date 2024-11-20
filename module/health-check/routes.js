const express = require('express')
const healthCheckRouter = express.Router()
const healthCheckController = require('./internal/controllers')

healthCheckRouter.get('/', healthCheckController.getHealthCheck)

module.exports = healthCheckRouter