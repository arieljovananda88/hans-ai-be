const database = require('./repository')

async function saveRecipe(req, res) {
    try {
        const userId = req.user.id
        const recipeId = req.body.recipeId

        const newSavedRecipe = await database.saveRecipe(userId, recipeId)
        res.status(201).json({
            isSuccess: true,
            messages: [],
            data: newSavedRecipe
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

async function getSavedRecipesByUserId(req, res) {
    try {
        const userId = req.user.id

        const savedRecipes = await database.getSavedRecipesByUserId(userId)
        
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: [
                ...savedRecipes
            ]
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
    saveRecipe,
    getSavedRecipesByUserId
}