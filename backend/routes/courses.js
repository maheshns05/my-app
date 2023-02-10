const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now}
});

const Course = mongoose.model('course', courseSchema);

router.get('/', async (req, res) => {
    const courses = await Course.find();
    res.send(courses);
});

router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.send(course);
    } catch(error) {
        return res.status(404).send('Course ID not found');
    }
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const course = new Course({
        name: req.body.name
    });

    const result = await course.save();
    res.send(result);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const course = await Course.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name
        }
    }, { new: true });
    
    if(!course) return res.status(404).send('Course ID not found');
    res.send(course);
});

router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id);
    if(!course) return res.status(404).send('Course ID not found');
    res.send(course);
});

function validate(obj) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(10).required()
    });

    return schema.validate(obj);
}

module.exports = router;