const prisma = require('@prisma/client')
const { PrismaClient } = prisma

const prismaClient = new PrismaClient()

async function getAllNutritionPlans() {
    try {
        const nutritionPlans = await prismaClient.nutritionPlans.findMany()
        return nutritionPlans
    } catch (error) {
        console.error('Error fetching all Nutrition Plans:', error);
        throw error;
    }
}

async function getNutritionPlanById(id) {
    try {
        const nutritionPlan = await prismaClient.nutritionPlans.findFirst({
            where: {
                id: id
            }
        })

        return nutritionPlan
    } catch (err) {
        console.error('Error unable to fetch Nutrition Plan:', err)
        throw err
    }
}

async function createNutritionPlan(nutritionPlan) {
    try {
        const newnutritionPlan = await prismaClient.nutritionPlans.create({
            data: {
                userId: nutritionPlan.userId,
                caloriesGoal: nutritionPlan.caloriesGoal,
                startDate: new Date(nutritionPlan.startDate),
                endDate: new Date(nutritionPlan.endDate)
            }
        })

        return {
            id: newnutritionPlan.id
        }
    } catch (err) {
        console.error('Error unable to add Nutrition Plan:', err)
        throw err
    }
}

async function updateNutritionPlan(id, nutritionPlan) {
    try {
        await prismaClient.nutritionPlans.update({
            where: {
                id: id
            },
            data: {
                userId: nutritionPlan.userId,
                caloriesGoal: nutritionPlan.caloriesGoal,
                startDate: new Date(nutritionPlan.startDate),
                endDate: new Date(nutritionPlan.endDate)
            }
        })
        return {
            id: id
        }
    } catch (err) {
        console.error('Error unable to update Nutrition Plan:', err)
        throw err
    }
}

async function deleteNutritionPlan(id) {
    try {
        await prismaClient.nutritionPlans.delete({
            where: {
                id: id
            }
        })
    } catch (err) {
        console.error('Error unable to delete Nutrition Plan:', err)
        throw err
    }
}

module.exports = {
    getAllNutritionPlans,
    getNutritionPlanById,
    createNutritionPlan,
    updateNutritionPlan,
    deleteNutritionPlan
}