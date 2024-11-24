const prisma = require('@prisma/client')
const { PrismaClient } = prisma

const prismaClient = new PrismaClient()

async function getAllWeightLogs() {
    try {
        const weightLogs = await prismaClient.weightLogs.findMany()
        return weightLogs
    } catch (error) {
        console.error('Error fetching all Weight Logs:', error);
        throw error;
    }
}

async function getWeightLogById(id) {
    try {
        const weightLog = await prismaClient.weightLogs.findFirst({
            where: {
                id: id
            }
        })

        return weightLog
    } catch (err) {
        console.error('Error unable to fetch Weight Log:', err)
        throw err
    }
}

async function createWeightLog(weightLog) {
    try {
        const newweightLog = await prismaClient.weightLogs.create({
            data: {
                userId: weightLog.userId,
                date: new Date(weightLog.date),
                weight: weightLog.weight,
            }
        })

        return {
            id: newweightLog.id
        }
    } catch (err) {
        console.error('Error unable to add Weight Log:', err)
        throw err
    }
}

async function updateWeightLog(id, weightLog) {
    try {
        await prismaClient.weightLogs.update({
            where: {
                id: id
            },
            data: {
                userId: weightLog.userId,
                date: new Date(weightLog.date),
                weight: weightLog.weight,
            }
        })
        return {
            id: id
        }
    } catch (err) {
        console.error('Error unable to update Weight Log:', err)
        throw err
    }
}

async function deleteWeightLog(id) {
    try {
        await prismaClient.weightLogs.delete({
            where: {
                id: id
            }
        })
    } catch (err) {
        console.error('Error unable to delete Weight Log:', err)
        throw err
    }
}

module.exports = {
    getAllWeightLogs,
    getWeightLogById,
    createWeightLog,
    updateWeightLog,
    deleteWeightLog
}