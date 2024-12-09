const database = require('./repository')

async function getFoodLogs(req, res) {
    try {
        const { month, year } = req.query
        const foodLogs = await database.getFoodLogsByMonth(month, year)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: [
                ...foodLogs
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

async function getFoodLogById(req, res) {
    try {
        const { id } = req.params
        const foodLog = await database.getFoodLogById(id)
        res.status(200).json({
            isSuccess: true,
            messages: [],
            data: foodLog
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

async function saveFoodLog(req, res) {
    try {
        const newFoodLog = await database.saveFoodLog(req.user.id, req.body)
        res.status(201).json({
            isSuccess: true,
            messages: [],
            data: newFoodLog
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

module.exports = {
    getFoodLogs,
    getFoodLogById, 
    saveFoodLog
}
