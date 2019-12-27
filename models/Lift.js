//creates the schema for the values and data we will be passing around

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Main schema containing overhead data
const MainSchema = new Schema({
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
    workout: [{ lift: Array, date: Date }],
    date: {
        type: Date,
        default: Date.now
    }
});



module.exports = Lift = mongoose.model('lift', MainSchema);