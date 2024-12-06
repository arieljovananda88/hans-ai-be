const express = require('express')
const vertexRouter = express.Router()
const generatedRecipesController = require('./internal/controller')

vertexRouter.get('/', generatedRecipesController.generateRecipeFromVertex)

module.exports = vertexRouter
