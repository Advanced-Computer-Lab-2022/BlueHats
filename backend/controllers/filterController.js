const course = require("../models/course");
const mongoose = require("mongoose");

const filterByPrice = async (req, res) => {
  const price = req.query.price;

  if (price) {
    const courses = await course.find({ price: price });
    res.status(200).json(courses);
  } else {
    res.status(400).json({ error: `No courses found for this data` });
  }
};
const filterBySubject = async (req, res) => {
  const subject = req.query.subject;

  if (subject) {
    if (subject == "AllSubjects") {
      const courses = await course.find({}).sort({ createdAt: -1 });
      res.status(200).json(courses);
    } else {
      const courses = await course.find({ subject: subject });
      res.status(200).json(courses);
    }
  } else {
    res.status(400).json({ error: `No courses found for this data` });
  }
};
const getSubjects = async (req, res) => {
  const subjects = await course
    .find({}, { subject: 1 })
    .sort({ createdAt: -1 });
  res.status(200).json(subjects);
  console.log(subjects);
};

module.exports = {
  filterByPrice,
  filterBySubject,
  getSubjects,
};
