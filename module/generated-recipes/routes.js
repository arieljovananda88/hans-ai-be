const express = require('express')
const generatedRecipesRouter = express.Router()
const generatedRecipesController = require('./internal/controller')

generatedRecipesRouter.get('/', generatedRecipesController.getGeneratedRecipes)
generatedRecipesRouter.get('/:id', generatedRecipesController.getGeneratedRecipeById)
generatedRecipesRouter.post('/', generatedRecipesController.createGeneratedRecipe)
generatedRecipesRouter.patch('/:id', generatedRecipesController.updateGeneratedRecipe)
generatedRecipesRouter.delete('/:id', generatedRecipesController.deleteGeneratedRecipe)

module.exports = generatedRecipesRouter