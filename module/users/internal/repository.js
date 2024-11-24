const prisma = require('@prisma/client')
const { PrismaClient } = prisma

const prismaClient = new PrismaClient()

async function getAllUsers() {
    try {
        const users = await prismaClient.users.findMany()
        return users
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
}

async function createUser(user) {
    try {
        const newUser = await prismaClient.users.create({
            data: user
        })

        return {
            id: newUser.id
        }
    } catch (err) {
        console.error('Error unable to add user:', err)
        throw err
    }
}

async function updateUser(id, user) {
    try {
        await prismaClient.users.update({
            where: {
                id: id
            },
            data: user
        })
        return {
            id: id
        }
    } catch (err) {
        console.error('Error unable to add user:', err)
        throw err
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser
}