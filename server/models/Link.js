const { Schema, model } = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const LinkSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: () => uuidv4()
    },
    shortId: {
        type: String,
        required: true,
    },
    redirectToUrl: {
        type: String,
        required: true,
    },
})

const Link = model('link', LinkSchema)

module.exports = Link