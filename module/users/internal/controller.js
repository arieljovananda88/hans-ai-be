const database = require('./repository')

async function getUsers(req, res) {
    try {
        const users = await database.getAllUsers()
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: [
                ...users
            ]
        })
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

async function createUser(req, res) {
    try {
        const newUser = await database.createUser(req.body)
        res.status(201).json({
            isSuccess: true,
            messages: [],
            data: [
                ...newUser
            ]
        })
    } catch (err) {
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    getUsers,
    createUser
}