const prisma = require('@prisma/client')
const { PrismaClient } = prisma

const prismaClient = new PrismaClient()

async function getAllRecipes(searchName) {
    try {
        const recipes = await prismaClient.recipes.findMany({
            where: {
                name: {
                    contains: searchName,
                    mode: 'insensitive' // This makes the search case-insensitive
                }
            }
        })
        return recipes
    } catch (error) {
        console.error('Error fetching all Recipes:', error);
        throw error;
    }
}

async function getRecipeById(id) {
    try {
        const recipe = await prismaClient.recipes.findFirst({
            where: {
                id: id
            }
        })

        return recipe
    } catch (err) {
        console.error('Error unable to fetch Recipe:', err)
        throw err
    }
}

async function createRecipe(recipes) {
    try {
        const newRecipe = await prismaClient.recipes.create({
            data: {
                name: recipes.name,
                ingredients: recipes.ingredients,
                instructions: recipes.instructions,
                calories: recipes.calories,
                protein: recipes.protein,
                carbs: recipes.protein,
                fat: recipes.protein,
            }
        })

        return {
            id: newRecipe.id
        }
    } catch (err) {
        console.error('Error unable to add Recipe:', err)
        throw err
    }
}

async function updateRecipe(id, recipes) {
    try {
        await prismaClient.recipes.update({
            where: {
                id: id
            },
            data: {
                name: recipes.name,
                ingredients: recipes.ingredients,
                instructions: recipes.instructions,
                calories: recipes.calories,
                dietaryTags: recipes.dietaryTags
            }
        })
        return {
            id: id
        }
    } catch (err) {
        console.error('Error unable to update Recipe:', err)
        throw err
    }
}

async function deleteRecipe(id) {
    try {
        await prismaClient.recipes.delete({
            where: {
                id: id
            }
        })
    } catch (err) {
        console.error('Error unable to delete Recipe:', err)
        throw err
    }
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
}