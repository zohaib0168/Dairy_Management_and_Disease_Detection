// models/disease.js
const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    symptoms: {
        type: [String],
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
{timestamps: true},
);

module.exports = mongoose.model('Disease', DiseaseSchema, 'Diseases');
