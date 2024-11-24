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

async function getUserById(id) {
    try {
        const user = await prismaClient.users.findFirst({
            where: {
                id: id
            }
        })

        return user
    } catch (err) {
        console.error('Error unable to fetch user:', err)
        throw err
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
        console.error('Error unable to update user:', err)
        throw err
    }
}

async function deleteUser(id) {
    try {
        await prismaClient.users.delete({
            where: {
                id: id
            }
        })
    } catch (err) {
        console.error('Error unable to fetch user:', err)
        throw err
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}