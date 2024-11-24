const database = require('./repository')

async function getMealLogs(req, res) {
    try {
        const mealLogs = await database.getAllMealLogs()
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: [
                ...mealLogs
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

async function getMealLogById(req, res) {
    try {
        const { id } = req.params

        const mealLog = await database.getMealLogById(id)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: mealLog
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

async function createMealLog(req, res) {
    try {
        const newMealLog = await database.createMealLog(req.body)
        res.status(201).json({
            isSuccess: true,
            messages: [],
            data: newMealLog
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

async function updateMealLog(req, res) {
    try {
        const { id } = req.params

        const updatedMealLog = await database.updateMealLog(id, req.body)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: updatedMealLog
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

async function deleteMealLog(req, res) {
    try {
        const { id } = req.params

        await database.deleteMealLog(id)
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
    getMealLogs,
    getMealLogById,
    createMealLog,
    updateMealLog,
    deleteMealLog
}