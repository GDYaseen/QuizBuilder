const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nom:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required: true,
        minlength: 6
    },
    mdp:{
        type: String,
        required: true,
        minlength: 8
    }
},{
    timestamps: true,
})
module.exports = mongoose.model("User",userSchema)