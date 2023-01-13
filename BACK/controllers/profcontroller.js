let Prof = require('../models/profModel')
let User = require('../models/userModel')
async function setAsProf(req,res){
    try{
        if(await User.findById(req.params.id)){
            if(!(await Prof.findById(req.params.id))){
                await Prof.create({profId:req.params.id})
            }
        }
        res.send("User "+req.params.id+ " is now a prof ")
    }catch(err){
        console.log(err)
    }
}

async function removeProf(req,res){
    try{
        if(await User.findById(req.params.id)){
            await Prof.findByIdAndDelete({profId:req.params.id})
        }
        res.redirect("/")
    }catch(err){
        console.log(err)
    }
}

async function checkIfProf(id){
    try{
        let p = await Prof.find({profId:id})
        console.log("checked p : ")
        // console.log(p[0]["profId"])
        if(p[0]){
            console.log("true")
            return true
        }else{
            console.log("false")
            return false
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = {setAsProf,removeProf,checkIfProf}