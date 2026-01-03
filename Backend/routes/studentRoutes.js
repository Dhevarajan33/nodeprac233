const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// READ - Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE - Multiple student entry
router.post('/', async (req, res) => {
    const newStudents = req.body;

    try {
        let savedStudents;
        if (Array.isArray(newStudents)) {
            savedStudents = await Student.insertMany(newStudents);
        } else {
            const student = new Student(newStudents);
            savedStudents = await student.save();
        }
        res.status(201).json({
            message: 'Students added successfully',
            students: savedStudents
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE - Multiple 
router.put('/', async (req, res) => {
    const updates = req.body; // array of students

    try {
        const updatePromises = updates.map(update =>
            Student.findOneAndUpdate({ id: update.id }, update, { new: true })
        );
        const updatedStudents = await Promise.all(updatePromises);

        res.json({
            message: 'Students updated successfully',
            students: updatedStudents
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE - Multiple
router.delete('/', async (req, res) => {
    const idsToDelete = req.body; // array of IDs

    try {
        await Student.deleteMany({ id: { $in: idsToDelete } });
        const remainingStudents = await Student.find();

        res.json({
            message: 'Students deleted successfully',
            students: remainingStudents
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;