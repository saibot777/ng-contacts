const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

contactSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

contactSchema.set('toJSON', {
    virtuals: true
});

exports.Contact = mongoose.model('Contact', contactSchema);
