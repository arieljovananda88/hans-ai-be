const express = require('express')
const recipesRouter = express.Router()
const recipesController = require('./internal/controller')

recipesRouter.get('/', recipesController.getRecipes)
recipesRouter.get('/:id', recipesController.getRecipeById)
recipesRouter.post('/', recipesController.createRecipe)
recipesRouter.patch('/:id', recipesController.updateRecipe)
recipesRouter.delete('/:id', recipesController.deleteRecipe)

module.exports = recipesRouter