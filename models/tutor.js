const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
fullname: {
    type: String,
    required: true
},
username: {
    type: String,
    required: true
},
isAdmin: {
    type: Boolean,
    default: false
},
subject: {
    type: String,
    required: false
},
password: {
    type: String,
    required: true
},
location: {
    type: String,
    required:false 
},
img: {
    type: String,
    required:false  
},
grades: {
    type: String,
    required:false  
},
document: {
    type: String,
    required:false  
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

module.exports = mongoose.model('Tutor', tutorSchema)