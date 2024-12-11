const express = require('express')
const predictRouter = express.Router()
const predictController = require('./internal/controller')

predictRouter.post('/recipe', predictController.postNewRecipe)
predictRouter.post('/calorie-intake', predictController.postCalorieIntake)

module.exports = predictRouter