const User=require("../models/userModel")
let {checkIfProf} = require("./profcontroller")
async function getUsers(req,res){
    try{
            let allUsers = await User.find()
            let allUsersWithProf = []
            for(let u of allUsers){
                allUsersWithProf.push([u,await checkIfProf(u._id)])
            }
            res.send(allUsersWithProf)
    }catch(err)
    {
        console.log(err)
    }
}

async function getUser(req,res){
   try{
            let thisUser = await User.findOne({nom:req.body.nom,mdp:req.body.mdp})
            if(thisUser){
                req.session.name=thisUser.nom
                let checkProf = await checkIfProf(thisUser._id)
                req.session.isProf = checkProf
                req.session._id= thisUser._id;
                res.send(req.session)
            }else{
                res.send("UserNotFound")
            }
   }catch(err)
   {
    console.log(err)
   }
}
async function addUser(req,res){
    try{
                if(await User.findOne({nom:req.body.nom}) || await User.findOne({email:req.body.email})){
                    res.send({0:0,1:null})
                }else{
                    let thisUser = {nom:req.body.nom, email:req.body.email, mdp:req.body.mdp}
                    req.session.name=thisUser.nom
                    req.session.isProf = false
                    req.session._id= thisUser._id;    
                    await User.create(thisUser)
                    res.send({0:1,1:req.session})
                }
    }catch(err)
    {
         res.status(500)
         throw err
    }
 }

async function editUser(req,res){
        try{
            let aUser = await User.findById(req.params.id)
            res.send(aUser)
        }catch(err){
            console.log(err)
        }
}
async function updateUser(req,res){
    try{
        let User_Id = req.params.id
        let thisUser = {nom:req.body.nom, email:req.body.email, mdp:req.body.mdp}
        await User.findByIdAndUpdate(User_Id, thisUser)
        res.send("Utilisateur modifié")
    }catch(err){console.log(err)}
}

async function deleteUser(req,res){
    try{
        if(await User.findById(req.params.id)){
            await User.findByIdAndDelete({_id:req.params.id})
        }
        res.send("user deleted")
    }catch{
        console.log(err)
    }
}
function rememberSession(req,res)
{
    console.log(req.session)
    if(req.session.name){
        res.send(req.session)
    }else{
        res.send(null)
    }
}
function logout(req,res){

    // req.session.destroy(()=>{
        req.session.cookie.expires = new Date(Date.now() - 86400 * 1000);
        res.send("logged out")
    // })
    console.log("REQ.SESSION")
    console.log(req.session)
}
module.exports={getUsers,getUser,addUser,updateUser,editUser,deleteUser,rememberSession,logout}
