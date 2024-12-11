const express = require('express')
require('dotenv').config()
const app = express()
const authenticateToken = require("../middleware/middleware")
const healthCheckRouter = require('../module/health-check/routes')
const {usersRouter, protectedUsersRouter} = require('../module/users/routes')
const pantryItemsRouter = require('../module/pantry-items/routes')
const nutritionPlansRouter = require('../module/nutrition-plans/routes')
const mealLogsRouter = require('../module/meal-logs/routes')
const weightLogsRouter = require('../module/weight-logs/routes')
const generatedRecipesRouter = require('../module/generated-recipes/routes')
const recipesRouter = require('../module/recipes/routes')
const savedRecipesRouter = require('../module/saved-recipes/routes')
const authRouter = require('../module/auth/routes')
const foodLogRouter = require('../module/food-logs/routes')
const predictRouter = require('../module/predict/routes')

app.use(express.json())
app.use('/', healthCheckRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)

app.use(authenticateToken)
app.use('/predict', predictRouter)
app.use('/users', protectedUsersRouter)
app.use('/food-logs', foodLogRouter)
app.use('/pantry-items', pantryItemsRouter)
app.use('/nutrition-plans', nutritionPlansRouter)
app.use('/meal-logs', mealLogsRouter)
app.use('/weight-logs', weightLogsRouter)
app.use('/generated-recipes', generatedRecipesRouter)
app.use('/recipes', recipesRouter)
app.use('/savedRecipes', savedRecipesRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})