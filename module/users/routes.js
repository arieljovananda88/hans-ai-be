const express = require('express')
const usersRouter = express.Router()
const usersController = require('./internal/controller')

usersRouter.get('/', usersController.getUsers)
usersRouter.post('/', usersController.createUser)

module.exports = usersRouter