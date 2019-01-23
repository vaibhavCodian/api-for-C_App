const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const shitSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: {
        type: String,
        required: true
    },
    catagory: Number,
    key: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
		default: Date.now,
    }
});
shitSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Shit', shitSchema);