const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostelSchema = {
    name: {
        type: String,
        required: true
    }
}

const Hostels = mongoose.model("Hostel", studentSchema);

module.exports = Hostels;