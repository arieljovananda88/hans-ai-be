const express = require('express')
const usersRouter = express.Router()
const usersController = require('./internal/controller')

usersRouter.get('/', usersController.getUsers)
usersRouter.get('/:id', usersController.getUserById)
usersRouter.post('/', usersController.createUser)
usersRouter.patch('/:id', usersController.updateUser)
usersRouter.delete('/:id', usersController.deleteUser)

module.exports = usersRouter