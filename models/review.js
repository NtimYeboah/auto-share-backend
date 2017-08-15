const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: {
        type: 'String',
        required: true
    },
    message: {
        type: 'String',
        required: true
    },
    cuid: {
        type: 'String',
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    dateUpdated: {
        type: Date
    }
});

let Review = mongoose.model('Review', reviewSchema);

module.exports = Review;