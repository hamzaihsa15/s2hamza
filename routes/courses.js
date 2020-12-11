var express = require('express');
var router = express.Router();
var Course = require("../models/courses");

/* GET home page. */
router.get('/',async function(req, res, next) {
  let courses =await Course.find();
  res.render('courses/list',{title: "Admin Access", courses});

});

router.get('/add',async function(req, res, next) {
  res.render('courses/add');
});

// Store Data In Mongo DB
router.post('/add',async function(req, res, next) {
  let course= new Course();
  course.course_name = req.body.course_name;
  course.course_id = req.body.course_id;
  course.course_duration = req.body.course_duration;
  course.course_fee = req.body.course_fee;
  await course.save();

  res.redirect('/courses');
});

router.get('/edit/:id',async function(req, res, next) { 
  let course = await Course.findById(req.params.id);
  res.render("courses/edit",{course});
});
router.post('/update/:id',async function(req, res, next) { 
  let course = await Course.findById(req.params.id);
  course.course_name = req.body.course_name;
  course.course_id = req.body.course_id;
  course.course_duration = req.body.course_duration;
  course.course_fee = req.body.course_fee;
  await course.save();
  res.redirect("/courses");
});

// Permanent Delete
router.get('/delete/:id',async function(req, res, next) {
  await Course.findByIdAndDelete(req.params.id);
  res.redirect('/courses');
});

module.exports = router;
