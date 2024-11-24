const express = require('express')
const mealLogsRouter = express.Router()
const mealLogsController = require('./internal/controller')

mealLogsRouter.get('/', mealLogsController.getMealLogs)
mealLogsRouter.get('/:id', mealLogsController.getMealLogById)
mealLogsRouter.post('/', mealLogsController.createMealLog)
mealLogsRouter.patch('/:id', mealLogsController.updateMealLog)
mealLogsRouter.delete('/:id', mealLogsController.deleteMealLog)

module.exports = mealLogsRouter