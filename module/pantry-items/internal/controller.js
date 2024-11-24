const database = require('./repository')

async function getPantryItems(req, res) {
    try {
        const users = await database.getAllpantryItems()
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

async function getPantryItemById(req, res) {
    try {
        const { id } = req.params

        const user = await database.getpantryItemById(id)
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

async function createPantryItem(req, res) {
    try {
        const newUser = await database.createpantryItem(req.body)
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

async function updatePantryItem(req, res) {
    try {
        const { id } = req.params

        const updatedUser = await database.updatepantryItem(id, req.body)
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

async function deletePantryItem(req, res) {
    try {
        const { id } = req.params

        await database.deletepantryItem(id)
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
    getPantryItems,
    getPantryItemById,
    createPantryItem,
    updatePantryItem,
    deletePantryItem
}