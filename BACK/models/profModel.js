const mongoose = require("mongoose")

const profSchema = new mongoose.Schema({
    profId:{
        type: String,
        required:true,
        unique:true
    }
},{
    
})
module.exports = mongoose.model("Prof",profSchema)