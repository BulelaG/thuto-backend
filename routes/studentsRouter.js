const express = require('express')
const router = express.Router()
const Student = require('../models/student')
const CryptoJS = require("crypto-js");

const {
  verifyToken2,
  verifyTokenAndAuthorization2,
  // verifyTokenAndAdmin,
} = require("./verifyToken2");

// C R U D




//UPDATE STUDENT
router.put("/:id", verifyTokenAndAuthorization2, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A STUDENT
router.delete("/:id", verifyTokenAndAuthorization2, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("Student has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A STUDENT
router.get("/find/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const { password, ...others } = student._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});


// STUDENT PROFILE
router.get("/profile/:id", verifyTokenAndAuthorization2, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id);
    const { password, ...others } = student._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL STUDENTS
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const students = query
      ? await Student.find().sort({ _id: -1 }).limit(5)
      : await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET STUDENTS STATS

// router.get("/stats", async (req, res) => {
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//   try {
//     const data = await User.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     res.status(200).json(data)
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router