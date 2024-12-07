const express = require('express')
const savedRecipesRouter = express.Router()
const recipesController = require('./internal/controller')

savedRecipesRouter.get('/', recipesController.getSavedRecipesByUserId)
savedRecipesRouter.post('/', recipesController.saveRecipe)

module.exports = savedRecipesRouter