const database = require('./repository')

async function getPantryItems(req, res) {
    try {
        const pantryItems = await database.getAllpantryItems()
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: [
                ...pantryItems
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

        const pantryItem = await database.getpantryItemById(id)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: pantryItem
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
        const newpantryItem = await database.createpantryItem(req.body)
        res.status(201).json({
            isSuccess: true,
            messages: [],
            data: newpantryItem
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

        const updatedPantryItem = await database.updatepantryItem(id, req.body)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: updatedPantryItem
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