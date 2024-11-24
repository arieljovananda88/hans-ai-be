const database = require('./repository')

async function getRecipes(req, res) {
    try {
        const recipes = await database.getAllRecipes()
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: [
                ...recipes
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

async function getRecipeById(req, res) {
    try {
        const { id } = req.params

        const recipe = await database.getRecipeById(id)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: recipe
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

async function createRecipe(req, res) {
    try {
        const newRecipe = await database.createRecipe(req.body)
        res.status(201).json({
            isSuccess: true,
            messages: [],
            data: newRecipe
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

async function updateRecipe(req, res) {
    try {
        const { id } = req.params

        const updatedrecipe = await database.updateRecipe(id, req.body)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: updatedrecipe
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

async function deleteRecipe(req, res) {
    try {
        const { id } = req.params

        await database.deleteRecipe(id)
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
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
}