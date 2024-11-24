const express = require('express')
const nutritionPlansRouter = express.Router()
const nutritionPlansController = require('./internal/controller')

nutritionPlansRouter.get('/', nutritionPlansController.getNutritionPlans)
nutritionPlansRouter.get('/:id', nutritionPlansController.getNutritionPlanById)
nutritionPlansRouter.post('/', nutritionPlansController.createNutritionPlan)
nutritionPlansRouter.patch('/:id', nutritionPlansController.updateNutritionPlan)
nutritionPlansRouter.delete('/:id', nutritionPlansController.deleteNutritionPlan)

module.exports = nutritionPlansRouter