const Quiz=require("../models/QuizModel")
const User=require("../models/userModel")

async function getQuizs(req,res){
    //Recupérer tous les Quizs dans myBlogdb et envoyer index.pug au client
    try{
        // if(req.session.Quizname){
            let allQuizs;
            if(req.session.isProf==true)
            {
                allQuizs = await Quiz.find()
            }else{
                allQuizs = await Quiz.find({students:{$in: [req.session._id]}})  
            }
            // res.render("index",{Quizs:allQuizs,Quizname:req.session.Quizname})
            res.send(allQuizs)
        // }
        // else{
            // res.redirect("/login")
        // }
    }catch(err)
    {
        console.log(err)
    }
}

async function getQuiz(req,res){
    //Recupérer un Quiz definie par son _id dans myBlogdb et envoyer Quiz.pug au client
   try{
        let thisQuiz = await Quiz.findById(req.params.id)
        // res.render("Quiz",{Quizname:req.session.Quizname,id:req.params.id,titre:thisQuiz.titre,auteur:thisQuiz.auteur,dateCre:thisQuiz.createdAt,dateMod:thisQuiz.updatedAt,resume:thisQuiz.resume,contenu:thisQuiz.content})
        res.send(thisQuiz)
   }catch(err)
   {
    console.log(err)
   }
}
async function addQuiz(req,res){
    //Créer un nouveau Quiz dans myBlogdb et rediriger le client vers /
    try{
            // if(req.session.Quizname){
            let thisQuiz = {nom:req.body.nom,questions:JSON.parse(req.body.questions),startDate:req.body.startDate,
                finishDate:req.body.finishDate,students:JSON.parse(req.body.students),chances:req.body.chances,chancesUsed:req.body.chancesUsed}
                await Quiz.create(thisQuiz)
        //  res.redirect("/")
        res.send("Quiz crée")
        // }
        // else{
        //     res.redirect("/login")
        //          }
    }catch(err)
    {
         res.send("Erreur 500")
         throw err
    }
 
 }

async function editQuiz(req,res){
    //Recupérer un Quiz definie par son _id et renvoyer au client editQuiz.pug avec les donnée de ce Quiz
        try{
            // if(req.session.Quizname){
                let thisQuiz = {result:req.body.checks+"/"+ req.body.corrects, student:req.body.user}
            let aQuiz = await Quiz.findById(req.params.id)
            let chancesU = aQuiz["chancesUsed"]
            let student = chancesU.filter((e)=>{return e["student"]==thisQuiz["student"]})
            if(student==""){
                chancesU.push({student:thisQuiz["student"],tries:1,result:thisQuiz["result"]})
            }else{
                chancesU[chancesU.indexOf(student[0])]["tries"]++;
                chancesU[chancesU.indexOf(student[0])]["result"]=thisQuiz["result"];
            }
            await Quiz.findByIdAndUpdate(req.params.id,{chancesUsed:chancesU})
            res.send("Vous avez finis votre quiz!")
        }catch(err){
            console.log(err)
        }
}
async function updateQuiz(req,res){
    //metre à jour un Quiz et rediriger le client vers ce Quiz
    try{
        let Quiz_Id = req.params.id
        let thisQuiz = {nom:req.body.nom,questions:JSON.parse(req.body.questions),startDate:req.body.startDate,
            finishDate:req.body.finishDate,students:JSON.parse(req.body.students),chances:req.body.chances,chancesUsed:req.body.chancesUsed}
        await Quiz.findByIdAndUpdate(Quiz_Id, thisQuiz)
        // res.redirect("/Quizs/"+Quiz_Id)
        res.send("Quiz modified")
    }catch(err){console.log(err)}
}

async function deleteQuiz(req,res){
    //Suprimer un Quiz et rediriger le client vers /
    try{
        if(await Quiz.findById(req.params.id)){
            await Quiz.findByIdAndDelete({_id:req.params.id})
        }
        // res.redirect("/")
        res.send("Quiz deleted")
    }catch(err){
        console.log(err)
    }
}
async function getQuizesWithNames(req,res){
    try{
        let quizes = await Quiz.findById(req.params.id)
        let chancesU = quizes["chancesUsed"]
        let ch=[]
        for(let c of chancesU){
            let temp = []
            temp.push(c)
            temp.push({nom:(await User.findById(c["student"]))["nom"]})
            ch.push(temp)
        }
        res.send(ch)

    }catch(err){
        console.log(err)
    }
}
module.exports={getQuizs,getQuiz,addQuiz,updateQuiz,editQuiz,deleteQuiz,getQuizesWithNames}