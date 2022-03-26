const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
fullname: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
},
username: {
    type: String,
    required: true,
    unique: true
},
isAdmin: {
    type: Boolean,
    default: false
},
subject: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
},
location: {
    type: String,
    required:true 
},
email: {
    type: String,
    required:false  
},
img: {
    type: String,
    required:false  
},
grades: {
    type: String,
    required:true  
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