import * as mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema: mongoose.Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    tname: {
        type: String,
        required: true,
    },
    tdisplay: {
        type: String,
        required: true,
    },
    ticket: {
        type: Number,
        required: true,
        default: 0,
    },
    piece: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model('User', userSchema);