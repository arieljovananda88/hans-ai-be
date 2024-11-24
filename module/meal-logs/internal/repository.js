const prisma = require('@prisma/client')
const { PrismaClient } = prisma

const prismaClient = new PrismaClient()

async function getAllMealLogs() {
    try {
        const mealLogs = await prismaClient.mealLogs.findMany()
        return mealLogs
    } catch (error) {
        console.error('Error fetching all Meal Logs:', error);
        throw error;
    }
}

async function getMealLogById(id) {
    try {
        const mealLog = await prismaClient.mealLogs.findFirst({
            where: {
                id: id
            }
        })

        return mealLog
    } catch (err) {
        console.error('Error unable to fetch Meal Log:', err)
        throw err
    }
}

async function createMealLog(mealLog) {
    try {
        const newMealLog = await prismaClient.mealLogs.create({
            data: {
                userId: mealLog.userId,
                date: new Date(mealLog.date),
                mealType: mealLog.mealType,
                calories: mealLog.calories
            }
        })

        return {
            id: newMealLog.id
        }
    } catch (err) {
        console.error('Error unable to add Meal Log:', err)
        throw err
    }
}

async function updateMealLog(id, mealLog) {
    try {
        await prismaClient.mealLogs.update({
            where: {
                id: id
            },
            data: {
                userId: mealLog.userId,
                date: new Date(mealLog.date),
                mealType: mealLog.mealType,
                calories: mealLog.calories
            }
        })
        return {
            id: id
        }
    } catch (err) {
        console.error('Error unable to update Meal Log:', err)
        throw err
    }
}

async function deleteMealLog(id) {
    try {
        await prismaClient.mealLogs.delete({
            where: {
                id: id
            }
        })
    } catch (err) {
        console.error('Error unable to fetch Meal Log:', err)
        throw err
    }
}

module.exports = {
    getAllMealLogs,
    getMealLogById,
    createMealLog,
    updateMealLog,
    deleteMealLog
}