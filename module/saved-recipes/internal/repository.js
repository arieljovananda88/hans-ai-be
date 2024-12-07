const prisma = require('@prisma/client')
const { PrismaClient } = prisma

const prismaClient = new PrismaClient()

async function saveRecipe(userId, recipeId) {
    try {
        const savedRecipe = await prismaClient.savedRecipes.create({
            data: {
                userId: userId,
                recipeId: recipeId
            }
        })

        return {
            savedRecipeId: savedRecipe.id
        }
    } catch (e) {
        console.error('Error unable to add save recipe:', err)
        throw err
    }
}

async function getSavedRecipesByUserId(userId) {
    try {
        const recipes = await prismaClient.savedRecipes.findMany({
            where: {
                userId: userId
            },
            include: {
                recipe: true
            }
        });

        return recipes.map(savedRecipe => savedRecipe.recipe);
    } catch (e) {
        console.error('Error unable to fetch saved recipes:', err)
        throw err
    }
}

module.exports = {
    saveRecipe,
    getSavedRecipesByUserId
}