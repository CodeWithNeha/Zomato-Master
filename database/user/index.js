import mongoose from "mongoose";
//Creating Schema
const UserSchema = new mongoose.Schema({
    fullname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    address:[{detail: {type: String}, for:{type:String}}],
    phoneNumber: [{type: Number}]

});

export const UserModel = mongoose.model("Users",UserSchema);