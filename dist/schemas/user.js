"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const { Schema } = mongoose;
const userSchema = new Schema({
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
