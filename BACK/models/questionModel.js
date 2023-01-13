let mongoose = require("mongoose")

let questionModel = mongoose.Schema({
    phrase:{
        type:String,
        required:true
    },
    qType:{
        type:String,
        enum: [ "Multichoix", "Choix unique", "Vrais ou faux"],
        default:"Choix unique",
        required:true
    },
    difficulty:{
        type:String,
        enum: [ "Facile", "Moyenne", "Difficile"],
        default:"Facile",
        required:true
    },
    correctAnswer:{
        type:[String],
        required:true
    },
    wrongAnswer:{
        type:[String],
        required:true
    }
})

module.exports = mongoose.model("Question",questionModel)