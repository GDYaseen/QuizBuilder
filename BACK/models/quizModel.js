// Possède un id, nom
// est composé d’un ensemble de questions
// possède une date de démarrage
// possède une date d’arrêt
// Possède une listes des étudiants
// Possède le nombre de tentatives possibles par utilisateur.
// Possède une liste des tentatives effectuées par des utilisateurs.
let mongoose = require("mongoose")

let Quiz = mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    questions:{
        type:[String],
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    finishDate:{
        type:Date,
        required:true
    },
    students:{
        type:[String],
        required:true
    },
    chances:{
        type:Number,
        required:true
    },
    chancesUsed:[{
        student:{
            type:String,
            required:true
        },
        tries:{
            type:Number,
            required:true,
            default:0
        },
        result:{
            type:String,
            required:true
        }
    }
    // required:true
    ]
})

module.exports = mongoose.model("Quiz",Quiz)