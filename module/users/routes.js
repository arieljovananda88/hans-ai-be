const express = require('express')
const usersRouter = express.Router()
const usersController = require('./internal/controller')

usersRouter.get('/', usersController.getUsers)
usersRouter.post('/', usersController.createUser)
usersRouter.patch('/:id', usersController.updateUser)

module.exports = usersRouter