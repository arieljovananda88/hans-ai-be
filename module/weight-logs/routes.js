const express = require('express')
const weightLogsRouter = express.Router()
const weightLogsController = require('./internal/controller')

weightLogsRouter.get('/', weightLogsController.getWeightLogs)
weightLogsRouter.get('/:id', weightLogsController.getWeightLogById)
weightLogsRouter.post('/', weightLogsController.createWeightLog)
weightLogsRouter.patch('/:id', weightLogsController.updateWeightLog)
weightLogsRouter.delete('/:id', weightLogsController.deleteWeightLog)

module.exports = weightLogsRouter