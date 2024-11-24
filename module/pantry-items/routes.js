const express = require('express')
const pantryItemsRouter = express.Router()
const pantryItemsController = require('./internal/controller')

pantryItemsRouter.get('/', pantryItemsController.getPantryItems)
pantryItemsRouter.get('/:id', pantryItemsController.getPantryItemById)
pantryItemsRouter.post('/', pantryItemsController.createPantryItem)
pantryItemsRouter.patch('/:id', pantryItemsController.updatePantryItem)
pantryItemsRouter.delete('/:id', pantryItemsController.deletePantryItem)

module.exports = pantryItemsRouter