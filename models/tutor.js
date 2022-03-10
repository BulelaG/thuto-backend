const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
fullname: {
    type: String,
    required: true
},
subject: {
    type: String,
    required: true
},
subject: {
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

module.exports = mongoose.model('Tutor', tutorSchema)