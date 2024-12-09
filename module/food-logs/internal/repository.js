const prisma = require('@prisma/client')
const { PrismaClient } = prisma

const prismaClient = new PrismaClient()

async function getFoodLogsByMonth(month, year, userId) {
    const startOfMonth = new Date(year, month - 1, 1)
    const endOfMonth = new Date(year, month, 0)

    return await prismaClient.foodLogs.findMany({
        where: {
            userId: userId,
            date: {
                gte: startOfMonth,
                lte: endOfMonth
            }
        },
        include: {
            FoodLogItems: {
                include: {
                    recipe: {
                        select: {
                            id: true,
                            name: true,
                            protein: true,
                            carbs: true,
                            fat: true,
                            calories: true
                        }
                    }
                }
            }
        },
        orderBy: {
            date: 'asc'
        }
    })
}

async function getFoodLogById(id) {
    try {
        const foodLog = await prismaClient.foodLogs.findUnique({
            where: {
                id: id
            },
            include: {
                FoodLogItems: {
                    include: {
                        recipe: {
                            select: {
                                id: true,
                                name: true,
                                protein: true,
                                carbs: true,
                                fat: true,
                                calories: true
                            }
                        }
                    }
                }
            }
        })

        if (!foodLog) {
            return {
                success: false,
                error: 'Food log not found'
            }
        }

        return {
            success: true,
            data: foodLog
        }

    } catch (error) {
        console.error('Error in getFoodLogById:', error)
        return {
            success: false,
            error: error.message || 'Failed to fetch food log',
            details: error
        }
    }
}


async function saveFoodLog(userId, data) {
    try {
        const startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date()
        endOfDay.setHours(23, 59, 59, 999)

        // Convert snake_case to camelCase for Prisma
        const foodLogData = {
            userId: userId,
            logTitle: data.log_title,
            description: data.description,
            totalProtein: data.total_protein,
            totalCarbs: data.total_carbs,
            totalFat: data.total_fat,
            totalCalories: data.total_calories,
            date: new Date()
        }

        const existingLog = await prismaClient.foodLogs.findFirst({
            where: {
                userId: userId,
                date: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            }
        })

        if (existingLog) {
            // Delete existing food log items
            await prismaClient.foodLogItems.deleteMany({
                where: {
                    foodLogId: existingLog.id
                }
            })

            // Update the food log and create new food log items
            const updatedLog = await prismaClient.foodLogs.update({
                where: {
                    id: existingLog.id
                },
                data: {
                    ...foodLogData,
                    FoodLogItems: {
                        create: data.food_items.map(recipeId => ({
                            recipeId: recipeId
                        }))
                    }
                },
                include: {
                    FoodLogItems: true
                }
            })

            return { success: true, data: updatedLog }
        }

        // Create new log with food items if none exists
        const newLog = await prismaClient.foodLogs.create({
            data: {
                ...foodLogData,
                FoodLogItems: {
                    create: data.food_items.map(recipeId => ({
                        recipeId: recipeId
                    }))
                }
            },
            include: {
                FoodLogItems: true
            }
        })

        return { success: true, data: newLog }

    } catch (error) {
        console.error('Error in saveFoodLog:', error)
        return {
            success: false,
            error: error.message || 'Failed to save food log',
            details: error
        }
    }
}


module.exports = {
    getFoodLogsByMonth,
    getFoodLogById,
    saveFoodLog
}