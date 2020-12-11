const { text } = require('express');
var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    course_name: String,
    course_id: String,
    course_duration: String,
    course_fee: String,

});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;