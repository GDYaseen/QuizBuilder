//requirements
const app = require("./app")
let dotenv = require("dotenv").config()
let mongoose = require("mongoose")


// Etablire une connexion à la base de données
mongoose.connect(process.env.DB_URI)

//Démarage du serveur su le le port : PORT dans .env
console.log("server connected on port "+process.env.PORT )
app.listen(process.env.PORT || 7777)
