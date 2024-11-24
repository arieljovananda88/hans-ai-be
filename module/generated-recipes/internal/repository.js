const prisma = require('@prisma/client')
const { PrismaClient } = prisma

const prismaClient = new PrismaClient()

async function getAllGeneratedRecipes() {
    try {
        const generatedRecipes = await prismaClient.generatedRecipes.findMany()
        return generatedRecipes
    } catch (error) {
        console.error('Error fetching all Generated Recipes:', error);
        throw error;
    }
}

async function getGeneratedRecipeById(id) {
    try {
        const generatedRecipe = await prismaClient.generatedRecipes.findFirst({
            where: {
                id: id
            }
        })

        return generatedRecipe
    } catch (err) {
        console.error('Error unable to fetch Generated Recipe:', err)
        throw err
    }
}

async function createGeneratedRecipe(generatedRecipe) {
    try {
        const newGeneratedRecipe = await prismaClient.generatedRecipes.create({
            data: {
                userId: generatedRecipe.userId,
                recipeId: generatedRecipe.recipeId,
                generatedDate: new Date(generatedRecipe.generatedDate),
                ingredientAdjustments: generatedRecipe.ingredientAdjustments
            }
        })

        return {
            id: newGeneratedRecipe.id
        }
    } catch (err) {
        console.error('Error unable to add Generated Recipe:', err)
        throw err
    }
}

async function updateGeneratedRecipe(id, generatedRecipe) {
    try {
        await prismaClient.generatedRecipes.update({
            where: {
                id: id
            },
            data: {
                userId: generatedRecipe.userId,
                recipeId: generatedRecipe.recipeId,
                generatedDate: new Date(generatedRecipe.generatedDate),
                ingredientAdjustments: generatedRecipe.ingredientAdjustments
            }
        })
        return {
            id: id
        }
    } catch (err) {
        console.error('Error unable to update Generated Recipe:', err)
        throw err
    }
}

async function deleteGeneratedRecipe(id) {
    try {
        await prismaClient.generatedRecipes.delete({
            where: {
                id: id
            }
        })
    } catch (err) {
        console.error('Error unable to delete Generated Recipe:', err)
        throw err
    }
}

module.exports = {
    getAllGeneratedRecipes,
    getGeneratedRecipeById,
    createGeneratedRecipe,
    updateGeneratedRecipe,
    deleteGeneratedRecipe
}