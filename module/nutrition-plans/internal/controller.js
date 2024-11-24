const database = require('./repository')

async function getNutritionPlans(req, res) {
    try {
        const nutritionPlans = await database.getAllNutritionPlans()
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: [
                ...nutritionPlans
            ]
        })
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            messages: [
                error
            ],
            data: []
        })
    }
}

async function getNutritionPlanById(req, res) {
    try {
        const { id } = req.params

        const nutritionPlan = await database.getNutritionPlanById(id)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: nutritionPlan
        })
    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            messages: [
                err
            ],
            data: []
        })
    }
}

async function createNutritionPlan(req, res) {
    try {
        const newnutritionPlan = await database.createNutritionPlan(req.body)
        res.status(201).json({
            isSuccess: true,
            messages: [],
            data: newnutritionPlan
        })
    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            messages: [
                err
            ],
            data: []
        })
    }
}

async function updateNutritionPlan(req, res) {
    try {
        const { id } = req.params

        const updatednutritionPlan = await database.updateNutritionPlan(id, req.body)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: updatednutritionPlan
        })
    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            messages: [
                err
            ],
            data: []
        })
    }
}

async function deleteNutritionPlan(req, res) {
    try {
        const { id } = req.params

        await database.deleteNutritionPlan(id)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: []
        })
    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            messages: [
                err
            ],
            data: []
        })
    }
}

module.exports = {
    getNutritionPlans,
    getNutritionPlanById,
    createNutritionPlan,
    updateNutritionPlan,
    deleteNutritionPlan
}