import axios from "axios";
import { useEffect, useState } from "react";

function QuestionsAdd({stl,handler}){
    let [ans,setAns]=useState([])
    let [selectChoice,setSelectChoice]=useState("Multichoix")
    let [nbReponse,setnbReponse]=useState()
    function addQuestion(e){
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
        axios.post('http://localhost:7777/question/',object,{withCredentials:true})
        .then((response) => {
            // if(response.data!=="UserNotFound"){
              console.log(response.data)
              handler()
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
            a.push(<div><input type="radio" name={"correctAnswer"}/><span>Vrai</span></div>)
            a.push(<div><input type="radio" name={"correctAnswer"}/><span>Faux</span></div>)
        }else if(t===2){
            for(let i=0;i<c;i++){
                a.push(<div><input type="radio" name={"correctAnswer"} /><input type="text"/></div>)
            }
        }else if(t===1){
            for(let i=0;i<c;i++){
                a.push(<div><input type="checkbox" name={"correctAnswer"} /><input type="text"/></div>)
            }
        }
        setAns(a)
    }
    useEffect(()=>{
        switch(selectChoice){
            case "Multichoix":
                changeAnswersCount(1,0)
                setnbReponse(<div id="nbReponses">
            Nombres des réponses: <input onChange={(e)=>changeAnswersCount(e.target.value,1)} type="number"/></div>)
                break;
            case "Choix unique":
                changeAnswersCount(2,0)
                setnbReponse(<div id="nbReponses">
            Nombres des réponses: <input onChange={(e)=>changeAnswersCount(e.target.value,2)} type="number"/></div>)
                break;
            case "Vrais ou faux":
                changeAnswersCount(2,3)
                setnbReponse()
                break;
            default:
                alert("An error has occured")
                break;
        }
    },[selectChoice])
    return(
        <form id="myForm" onSubmit={addQuestion} style={stl}>
            Question: <input type="text" name="phrase" placeholder="Question"/>
            Difficulté: <div id="questAddDiff">
            <div><input defaultChecked type="radio" name="difficulty" value="Facile"/>Facile</div><div><input type="radio" name="difficulty" value="Moyenne"/>Moyenne</div><div><input type="radio" name="difficulty" value="Difficile"/>Difficile</div>
            </div>
            Type: <select name="qType" onChange={(e)=>setSelectChoice(e.target.value)} id="qType">
                    <option value="Multichoix">Multichoix</option>
                    <option value="Choix unique">Choix unique</option>
                    <option value="Vrais ou faux">Vrais ou faux</option>
                </select>
                {nbReponse}
            <div id="answers">
                {ans}
            </div>
            <button type="submit">Ajouter</button>
        </form>
    )
}
export default QuestionsAdd;