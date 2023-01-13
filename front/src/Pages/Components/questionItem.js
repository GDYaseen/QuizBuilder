// import { useState } from 'react';
import QuestionsModify from "./questionModify"; 
import axios from "axios";
import { useState } from "react";
// import {Link} from 'react-router-dom';
function QuestionItem({questionId,phrase,qType,difficulty,correctAnswer,wrongAnswer}){
    let answers = []
    for(let c of correctAnswer)
    {
        answers.push(['correctAnswer',c])
    }
    for(let w of wrongAnswer)
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
    function deleteQuestion(e){
        axios.delete(`http://localhost:7777/question/${questionId}`,{withCredentials:true})
            .then((response)=>{
                alert(response.data)
                e.currentTarget.outerHTML=""
            })
    }
    function manageItem(p,d,q,a){ return <div className="questionItem">
    <h2>{p}</h2>
    <div className='tags'>
        <div className={d}>
            {d}
        </div>
        <div className='questionType'>
            {q}
        </div>
    </div>
    <label>
    <input type="checkbox" name="" />Réponses
    <ul className='answers'>
    {a}
    </ul>
    </label>
    <div onClick={(e)=>deleteQuestion(e)} id="deleteQuestion"><img src="./delete.png" alt=""/></div>
    <div onClick={modifyQuestion} id="modifyQuestion"><img src="./modify.png" alt=""/></div>
</div>}
    let [block,setBlock] = useState(manageItem(phrase,difficulty,qType,answersBlock))
    function modifyQuestion(){
        setBlock(<QuestionsModify handler={(p,d,q,a)=>setBlock(manageItem(p,d,q,a))} questionId={questionId} phrase={phrase} qType={qType} difficulty={difficulty} correctAnswer={correctAnswer} wrongAnswer={wrongAnswer}/>)
    }
return block
}
export default QuestionItem;