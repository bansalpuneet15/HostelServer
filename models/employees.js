const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    employeeName: {
        type: String, 
        required: true 
    },
    gender: {
        type: String, 
        required: true 
    },
    employeeType: {
        type: String, 
        required: true 
    },
    designation: {
        type: String, 
        required: true 
    },
    joiningDate: {
        type: Date, 
        required: true 
    },
    address: {
        type: String, 
        required: true 
    },
    salary: {
        type: String, 
        required: true 
    },
    mobileNo: {
        type: String, 
        unique: true, 
        required: true 
    },
    employeeID: {
        type: String, 
        unique: true, 
        required: true 
    },
    photo: Buffer
});

const Employees = mongoose.model("Employee", employeeSchema);

module.exports = Employees