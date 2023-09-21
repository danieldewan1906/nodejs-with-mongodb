const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    sequenceValue: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    versionKey: false
})

const Counters = mongoose.model("counters", CounterSchema)
module.exports = Counters