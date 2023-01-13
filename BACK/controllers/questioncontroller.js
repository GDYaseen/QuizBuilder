const Question=require("../models/questionModel")

async function getQuestions(req,res){
    try{
            let allQuestions = await Question.find()
            res.send(allQuestions)
    }catch(err)
    {
        console.log(err)
    }
}

async function getQuestion(req,res){
    //Recupérer un Question definie par son _id dans myBlogdb et envoyer Question.pug au client
   try{
        let thisQuestion = await Question.findById(req.params.id)
        res.send(thisQuestion)
   }catch(err)
   {
    console.log(err)
   }
}
async function addQuestion(req,res){
    try{
            let thisQuestion = {phrase:req.body.phrase, qType:req.body.qType, difficulty:req.body.difficulty,
                 correctAnswer:JSON.parse(req.body.correctAnswer), wrongAnswer:JSON.parse(req.body.wrongAnswer)}
            await Question.create(thisQuestion)
        res.send(thisQuestion)
    }catch(err)
    {
         res.status(500)
         throw err
    }
 
 }

async function getQuestionsAnswers(req,res){
    //Recupérer un Question definie par son _id et renvoyer au client getQuestionsAnswers.pug avec les donnée de ce Question
        try{
            // if(req.session.Questionname){
            let aQuestions = await Question.find({ _id: { $in: req.body } })
            
            // res.render("getQuestionsAnswers",{Questionname:req.session.Questionname,isAdd:false,Question:{id:req.params.id,titre:aQuestion.titre,
            //     auteur:aQuestion.auteur,
            //     resume:aQuestion.resume,
            //     contenu:aQuestion.content}})
            // console.log("req.body from getanswers")
            // console.log(req.body)
            res.send(aQuestions)
        }catch(err){
            console.log(err)
        }
}
async function updateQuestion(req,res){
    try{
        let Question_Id = req.params.id
        let thisQuestion = {phrase:req.body.phrase, qType:req.body.qType, difficulty:req.body.difficulty,
            correctAnswer:JSON.parse(req.body.correctAnswer), wrongAnswer:JSON.parse(req.body.wrongAnswer)}
        await Question.findByIdAndUpdate(Question_Id, thisQuestion)
        res.send(thisQuestion)
    }catch(err){console.log(err)}
}

async function deleteQuestion(req,res){
    try{
        if(await Question.findById(req.params.id)){
            await Question.findByIdAndDelete({_id:req.params.id})
            res.send("Question supprimé")
        }else{
            res.send("Question n'existe pas ou elle a été déja supprimé")
        }
    }catch(err){
        console.log(err)
    }
}

module.exports={getQuestions,getQuestion,addQuestion,updateQuestion,getQuestionsAnswers,deleteQuestion}