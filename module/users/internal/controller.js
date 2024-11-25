const database = require('./repository')
const bcrypt = require('bcrypt');

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

async function getUserById(req, res) {
    try {
        const { id } = req.params

        const user = await database.getUserById(id)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: user
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

async function createUser(req, res) {
    try {
        const user = await database.getUserByEmail(req.body.email)
        if(user){
            return res.status(400).json({
                isSuccess: false,
                messages: [
                    "user already exists"
                ],
                data:[]
            })
        }
        const { password, ...otherUserData } = req.body;
        const saltRounds = 10;
    
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await database.createUser({
          ...otherUserData,
          password: hashedPassword,
        });

        res.status(201).json({
            isSuccess: true,
            messages: [],
            data: newUser
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
            data: updatedUser
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

async function deleteUser(req, res) {
    try {
        const { id } = req.params

        await database.deleteUser(id)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: []
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
    getUserById,
    createUser,
    updateUser,
    deleteUser
}