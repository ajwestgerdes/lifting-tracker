//creates the schema for the values and data we will be passing around

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a schema
const LiftSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    goal: {
        type: Number,
        required: false
    },
    reps: {
        type: Number,
        required: false
    },
    max: {
        type: Number,
        required: false
    },
    volume: {
        type: Number,
        required: false
    },
    workout: {
        type: Array,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Lift = mongoose.model('lift', LiftSchema);