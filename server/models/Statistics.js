const { Schema, model } = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const StatisticsSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: () => uuidv4()
    },
    linkId: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
})

const Statistics = model('statistics', StatisticsSchema)

module.exports = Statistics