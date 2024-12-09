const express = require('express')
const foodLogRouter = express.Router()
const foodLogController = require('./internal/controller')

foodLogRouter.get('/', foodLogController.getFoodLogs)
foodLogRouter.get('/:id', foodLogController.getFoodLogById)
foodLogRouter.post('/', foodLogController.saveFoodLog)

module.exports = foodLogRouter
