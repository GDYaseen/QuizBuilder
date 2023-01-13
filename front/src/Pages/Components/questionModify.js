import axios from "axios";
import { useEffect, useState } from "react";

function QuestionsModify({handler,questionId,phrase,qType,difficulty,correctAnswer,wrongAnswer}){
    let [ans,setAns]=useState([])
    let [selectChoice,setSelectChoice]=useState(qType)
    let [nbReponse,setnbReponse]=useState()
    function modifyQuestion(e){
        e.preventDefault()
        let formData = new FormData(e.target)
        let corrects=e.currentTarget.querySelectorAll("input[name='correctAnswer']")
        let wAns = []
        let cAns = []
        for(let c of corrects){
            if(!c.checked){
                if(selectChoice!=="Vrais ou faux") wAns.push(c.nextElementSibling.value)
                else wAns.push(c.nextElementSibling.innerHTML)
            }else{
                if(selectChoice!=="Vrais ou faux") cAns.push(c.nextElementSibling.value)
                else cAns.push(c.nextElementSibling.innerHTML)
            }
        }
        // console.log(wAns)
        // console.log(cAns)
        formData.append("wrongAnswer", JSON.stringify(wAns))
        formData.append("correctAnswer", JSON.stringify(cAns))
        var object = {};
        formData.forEach((value, key) => object[key] = value);
        console.log(object)
        axios.put(`http://localhost:7777/question/${questionId}`,object,{withCredentials:true})
        .then((response) => {
            // if(response.data!=="UserNotFound"){
              console.log(response.data)
              let answers = []
    for(let c of response.data.correctAnswer)
    {
        answers.push(['correctAnswer',c])
    }
    for(let w of response.data.wrongAnswer)
    {
        answers.push(['wrongAnswer',w])
    }
    function scramble(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    scramble(answers)
    let answersBlock=[];
    for(let a of answers){
        answersBlock.push([<li className={a[0]}>{a[1]}</li>])
    }
              handler(response.data.phrase,response.data.difficulty,response.data.qType,answersBlock)
            //   setUser([response.data])
            // }else{alert("Le nom d'utilisateur n'existe pas ou mot de passe incorrect!")}
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    function changeAnswersCount(c,t){
        let a=[]
        if(t===3){
            console.log("vrai ou faux ANSWERS")
            a.push(<div><input type="radio" defaultChecked={function(){return correctAnswer[0]==="Vrai"?true:false}()} name={"correctAnswer"}/><span>Vrai</span></div>)
            a.push(<div><input type="radio" defaultChecked={function(){return correctAnswer[0]==="Faux"?true:false}()} name={"correctAnswer"}/><span>Faux</span></div>)
        }else if(t===2){
            if(c===null){
                for(let o of correctAnswer){
                    a.push(<div><input type="radio" defaultChecked={true} name={"correctAnswer"} /><input defaultValue={o} type="text"/></div>)
                }
                for(let o of wrongAnswer){
                    a.push(<div><input type="radio" name={"correctAnswer"} /><input defaultValue={o} type="text"/></div>)
                }
            }else{
                for(let i=0;i<c;i++){
                    a.push(<div><input type="radio" name={"correctAnswer"} /><input type="text"/></div>)
                }
            }
        }else if(t===1){
            if(c===null){
                for(let o of correctAnswer){
                    a.push(<div><input type="checkbox" defaultChecked={true} name={"correctAnswer"} /><input defaultValue={o} type="text"/></div>)
                }
                for(let o of wrongAnswer){
                    a.push(<div><input type="checkbox" name={"correctAnswer"} /><input defaultValue={o} type="text"/></div>)
                }
            }else{
                for(let i=0;i<c;i++ ){
                    a.push(<div><input type="checkbox" name={"correctAnswer"} /><input type="text"/></div>)
                }
            }
        }
        setAns([a])
    }
    useEffect(()=>{
        switch(selectChoice){
            case "Multichoix":
                setnbReponse(<div id="nbReponses">
            Nombres des réponses: <input defaultValue={correctAnswer.length+wrongAnswer.length} onChange={(e)=>changeAnswersCount(e.target.value,1)} type="number"/></div>)
                    changeAnswersCount(null,1)
                break;
            case "Choix unique":
                setnbReponse(<div id="nbReponses">
            Nombres des réponses: <input defaultValue={correctAnswer.length+wrongAnswer.length} onChange={(e)=>changeAnswersCount(e.target.value,2)} type="number"/></div>)
                    changeAnswersCount(null,2)
                break;
            case "Vrais ou faux":
                changeAnswersCount(2,3)
                setnbReponse()
                break;
            default:
                alert("An error has occured")
                break;
        }
    },[selectChoice,correctAnswer.length,wrongAnswer.length])
    return(
        <form id="myForm" onSubmit={modifyQuestion} >
            Question: <input type="text" name="phrase" defaultValue={phrase} placeholder="Question"/>
            Difficulté: <div id="questAddDiff">
            <div><input type="radio" name="difficulty" defaultChecked={function(){return difficulty==="Facile"?true:false}()} value="Facile"/>Facile</div>
            <div><input type="radio" name="difficulty" defaultChecked={function(){return difficulty==="Moyenne"?true:false}()} value="Moyenne"/>Moyenne</div>
            <div><input type="radio" name="difficulty" defaultChecked={function(){return difficulty==="Difficile"?true:false}()} value="Difficile"/>Difficile</div>
            </div>
            Type: <select name="qType" defaultValue={qType} onChange={(e)=>setSelectChoice(e.target.value)} id="qType">
                    <option value="Multichoix">Multichoix</option>
                    <option value="Choix unique">Choix unique</option>
                    <option value="Vrais ou faux">Vrais ou faux</option>
                </select>
                {nbReponse}
            <div id="answers">
                {ans}
            </div>
            <button type="submit">Modifier</button>
        </form>
    )
}
export default QuestionsModify;