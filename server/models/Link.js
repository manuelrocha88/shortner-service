const { Schema, model } = require('mongoose')

const LinkSchema = new Schema({
    id: {
        type: String,
        required: true,
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