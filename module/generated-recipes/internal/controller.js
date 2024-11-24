const database = require('./repository')

async function getGeneratedRecipes(req, res) {
    try {
        const generatedRecipes = await database.getAllGeneratedRecipes()
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: [
                ...generatedRecipes
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

async function getGeneratedRecipeById(req, res) {
    try {
        const { id } = req.params

        const generatedRecipe = await database.getGeneratedRecipeById(id)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: generatedRecipe
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

async function createGeneratedRecipe(req, res) {
    try {
        const newgeneratedRecipe = await database.createGeneratedRecipe(req.body)
        res.status(201).json({
            isSuccess: true,
            messages: [],
            data: newgeneratedRecipe
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

async function updateGeneratedRecipe(req, res) {
    try {
        const { id } = req.params

        const updatedgeneratedRecipe = await database.updateGeneratedRecipe(id, req.body)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: updatedgeneratedRecipe
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

async function deleteGeneratedRecipe(req, res) {
    try {
        const { id } = req.params

        await database.deleteGeneratedRecipe(id)
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
    getGeneratedRecipes,
    getGeneratedRecipeById,
    createGeneratedRecipe,
    updateGeneratedRecipe,
    deleteGeneratedRecipe
}