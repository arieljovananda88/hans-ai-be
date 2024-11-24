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
        res.status(500).json({
            isSuccess: false,
            messages: [
                error
            ],
            data: []
        })
    }
}

async function createUser(req, res) {
    try {
        const newUser = await database.createUser(req.body)
        res.status(201).json({
            isSuccess: true,
            messages: [],
            data: [
                newUser
            ]
        })
    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            messages: [
                err
            ],
            data: []
        })
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params

        const updatedUser = await database.updateUser(id, req.body)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: [
                updateUser
            ]
        })
    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            messages: [
                err
            ],
            data: []
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser
}