const repo = require('./repository')

async function generateRecipeFromVertex(req, res) {
    try {
        const { ingredients } = req.query
        const prompt = `You have the following ingredients: ${ingredients}. Please generate a recipe for me.`

        const generatedRecipe = await repo.generateRecipeFromVertex(prompt)

        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: generatedRecipe,
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
    generateRecipeFromVertex
}
