const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    employeeEmail: {
        type: String,
        required: true,
        unique: true
    },
    employeeDesignation: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Employee", employeeSchema);