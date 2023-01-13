import { useState } from "react";

function Quizplayitem({number,questionPhrase,qType,correctAnswers,wrongAnswers}){
    let q=[]
    let [block,setBlock] = useState([])
    let type=""
    if(qType==="Multichoix"){
        type="checkbox"
    }else{type="radio"}
    if(block.length===0){
            
        for(let c of correctAnswers){
            q.push((<label><input type={type} name={number+"choix"} id="correct"/>{c}</label>))
        }
        for(let c of wrongAnswers){
            q.push((<label><input type={type} name={number+"choix"} id="wrong"/>{c}</label>))
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
export default Quizplayitem;