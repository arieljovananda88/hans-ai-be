const database = require('./repository')
const axios = require('axios');

async function getRecipes(req, res) {
    try {
        const searchName = req.query.name || '';
        const recipes = await database.getAllRecipes(searchName)
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

async function generateRecipe(req, res) {
    try {
        const payload = req.body;
        const response = await axios.post(process.env.AI_SERVICE + '/recipe', payload);

        const recipeText = response.data.recipe;
        let parsedRecipe;
        try {
            parsedRecipe = {
                title: recipeText.match(/## JUDUL ###\n(.*?)\n/)[1],
                karbohidrat: parseFloat(recipeText.match(/## KARBOHIDRAT ##\n(.*?)\sgram/)[1]),
                protein: parseFloat(recipeText.match(/## PROTEIN ##\n(.*?)\sgram/)[1]),
                lemak: parseFloat(recipeText.match(/## LEMAK ##\n(.*?)\sgram/)[1]),
                bahan: recipeText.match(/## BAHAN ##\n([\s\S]*?)\n\n## LANGKAH ##/)[1].trim(),
                langkah: recipeText.match(/## LANGKAH ##\n([\s\S]*)/)[1].trim()
            };
        } catch (matchError) {
            matchError.recipe = recipeText;
            throw matchError;
        }

        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: parsedRecipe
        });

    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            messages: [error.recipe || '', error.message],
            data: []
        });
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
    deleteRecipe,
    generateRecipe
}