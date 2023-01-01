const course = require("../models/course");
const Instructor = require('../models/instructorModel')
const mongoose = require("mongoose");

const filterByPrice = async (req, res) => {
  const { price } = req.params;

  if (price) {
    const courses = await course.find({ price: { $lte: price } });
    if (courses.length == 0) {
      res.json([]);
    }
    res.status(200).json(courses);
  } else {
    res.status(400).json({ error: `No courses found for this data` });
  }
};

const filterBySubject = async (req, res) => {
  const { subject } = req.params;

  if (subject) {
    if (subject == "AllSubjects") {
      const courses = await course.find({}).sort({ createdAt: -1 });
      res.status(200).json(courses);
    } else {
      const courses = await course.find({ subject: subject });
      if (courses.length == 0) {
        res.json([]);
      }
      res.status(200).json(courses);
    }
  } else {
    res.status(400).json({ error: `No courses found for this data` });
  }
};

const filterByRate = async (req, res) => {
  const { rate } = req.params;

  if (rate) {
    const courses = await course
      .find({ courseRating: { $gte: rate } })
      .sort({ courseRating: 1 });
    if (courses.length == 0) {
      res.json([]);
    }
    res.status(200).json(courses);
  } else {
    res.status(400).json({ error: `No courses found for this data` });
  }
};

const sortByPopularity = async (req, res) => {
  const courses = await course.find({}).sort({ enrolled: -1 });
  res.status(200).json(courses);
};
const sortByPriceA = async (req, res) => {
  const courses = await course.find({}).sort({ price: 1 });
  res.status(200).json(courses);

};const sortByPriceD = async (req, res) => {
  const courses = await course.find({}).sort({ price: -1 });
  res.status(200).json(courses);
};

const updatePromotions = async (req, res) => {
  
  const courses = await course.find({})
  for (let index = 0; index < courses.length; index++) {
    await courses[index].update({...req.body}); 
  }
  res.status(200).json(courses);
};


module.exports = {
  filterByPrice,
  filterBySubject,
  filterByRate,
  sortByPopularity,
  sortByPriceA,
  sortByPriceD,
  updatePromotions
};
