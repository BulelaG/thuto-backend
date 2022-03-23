const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  contact: {
    type: String,
    required: false,
  },
  subject: {
    type: String,
    required: false,
  },
  grade: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },

  // ToPlatform: {
  //     type: String,
  //     required: true
  // },
  registerDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", studentSchema);
