const prisma = require('@prisma/client')
const { PrismaClient } = prisma

const prismaClient = new PrismaClient()

async function getAllpantryItems() {
    try {
        const pantryItems = await prismaClient.pantryItems.findMany()
        return pantryItems
    } catch (error) {
        console.error('Error fetching all pantryItems:', error);
        throw error;
    }
}

async function getpantryItemById(id) {
    try {
        const pantryItem = await prismaClient.pantryItems.findFirst({
            where: {
                id: id
            }
        })

        return pantryItem
    } catch (err) {
        console.error('Error unable to fetch pantryItem:', err)
        throw err
    }
}

async function createpantryItem(pantryItem) {
    try {
        const newpantryItem = await prismaClient.pantryItems.create({
            data: pantryItem
        })

        return {
            id: newpantryItem.id
        }
    } catch (err) {
        console.error('Error unable to add pantryItem:', err)
        throw err
    }
}

async function updatepantryItem(id, pantryItem) {
    try {
        await prismaClient.pantryItems.update({
            where: {
                id: id
            },
            data: pantryItem
        })
        return {
            id: id
        }
    } catch (err) {
        console.error('Error unable to update pantryItem:', err)
        throw err
    }
}

async function deletepantryItem(id) {
    try {
        await prismaClient.pantryItems.delete({
            where: {
                id: id
            }
        })
    } catch (err) {
        console.error('Error unable to fetch pantryItem:', err)
        throw err
    }
}

module.exports = {
    getAllpantryItems,
    getpantryItemById,
    createpantryItem,
    updatepantryItem,
    deletepantryItem
}