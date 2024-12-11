const database = require('./repository')
const axios = require('axios');

async function postCalorieIntake(req, res) {
    try {
        const response = await axios.post(process.env.AI_SERVICE + '/calorie-intake', req.body);

        res.status(200).json({
            isSuccess: true,
            messages: [],
            prediction: response.data.prediction
        });
    } catch (error) {
        console.error('Error fetching calorie intake:', error);

        res.status(500).json({
            isSuccess: false,
            messages: [
                error.message || 'An error occurred while fetching calorie intake.'
            ],
            data: []
        });
    }
}


async function postNewRecipe(req, res) {
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

module.exports = {
    postCalorieIntake,
    postNewRecipe
};