const express = require('express')
require('dotenv').config()
const app = express()
const healthCheckRouter = require('../module/health-check/routes')
const usersRouter = require('../module/users/routes')
const pantryItemsRouter = require('../module/pantry-items/routes')
const nutritionPlansRouter = require('../module/nutrition-plans/routes')
const mealLogsRouter = require('../module/meal-logs/routes')
const weightLogsRouter = require('../module/weight-logs/routes')
const generatedRecipesRouter = require('../module/generated-recipes/routes')

app.use(express.json())
app.use('/', healthCheckRouter)
app.use('/users', usersRouter)
app.use('/pantry-items', pantryItemsRouter)
app.use('/nutrition-plans', nutritionPlansRouter)
app.use('/meal-logs', mealLogsRouter)
app.use('/weight-logs', weightLogsRouter)
app.use('/generated-recipes', generatedRecipesRouter)

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})