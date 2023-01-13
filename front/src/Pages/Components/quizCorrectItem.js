import { useState } from "react";

function QuizCorrectitem({questionPhrase,qType,correctAnswers,wrongAnswers}){
    let q=[]
    let [block,setBlock] = useState([])
    let type=""
    if(qType==="Multichoix"){
        type="checkbox"
    }else{type="radio"}
    if(block.length===0){
            
        for(let c of correctAnswers){
            q.push((<div id="Rcorrect">{c}</div>))
        }
        for(let c of wrongAnswers){
            q.push((<div id="Rwrong">{c}</div>))
        }
        scramble(q)
        setBlock([q])
    }
    return (
        <div className="quizplayitem">
            <h4>{questionPhrase}</h4>
            <div className="quizAnswers">
                {block}
            </div>
        </div>
    )

    function scramble(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}
export default QuizCorrectitem;