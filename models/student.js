const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
fullname: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
},
img: {
    type: String,
    required: true
},
contact: {
    type: String,
    required: true
},
subject: {
    type: String,
    required: true
},
grade: {
    type: String,
    required: true
},
location: {
    type: String,
    required: true
},



// registeredToPlatform: {
//     type: String,
//     required: true
// },
registerDate: {
    type: Date,
    required: true,
    default: Date.now
}
})

module.exports = mongoose.model('Student', studentSchema)