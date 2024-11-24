const database = require('./repository')

async function getWeightLogs(req, res) {
    try {
        const weightLogs = await database.getAllWeightLogs()
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: [
                ...weightLogs
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

async function getWeightLogById(req, res) {
    try {
        const { id } = req.params

        const weightLog = await database.getWeightLogById(id)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: weightLog
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

async function createWeightLog(req, res) {
    try {
        const newWeightLog = await database.createWeightLog(req.body)
        res.status(201).json({
            isSuccess: true,
            messages: [],
            data: newWeightLog
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

async function updateWeightLog(req, res) {
    try {
        const { id } = req.params

        const updatedWeightLog = await database.updateWeightLog(id, req.body)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: updatedWeightLog
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

async function deleteWeightLog(req, res) {
    try {
        const { id } = req.params

        await database.deleteWeightLog(id)
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
    getWeightLogs,
    getWeightLogById,
    createWeightLog,
    updateWeightLog,
    deleteWeightLog
}