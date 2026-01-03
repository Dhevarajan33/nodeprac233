const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Keeping 'id' as per existing logic, though _id exists
    name: { type: String, required: true },
    dept: { type: String, required: true },
    age: { type: Number, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
