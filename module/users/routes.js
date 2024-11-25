const express = require('express')
const usersRouter = express.Router()
const protectedUsersRouter = express.Router()
const usersController = require('./internal/controller')

usersRouter.post('/', usersController.createUser)

protectedUsersRouter.get('/', usersController.getUsers)
protectedUsersRouter.get('/:id', usersController.getUserById)
protectedUsersRouter.patch('/:id', usersController.updateUser)
protectedUsersRouter.delete('/:id', usersController.deleteUser)

module.exports = {
    protectedUsersRouter,
    usersRouter
}