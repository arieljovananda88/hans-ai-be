const express = require('express')
const authRouter = express.Router()
const authController= require('./internal/controllers')

authRouter.post('/login', authController.login)

module.exports = authRouter