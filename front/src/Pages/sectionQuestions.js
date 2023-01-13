import axios from "axios";
import {useState } from "react";
import QuestionAdd from "./Components/questionAdd";
import QuestionItem from "./Components/questionItem";
function SectionQuestions({isProf}){
    let [questions,setQuestions] = useState([])
    if(questions.length===0){
        axios.get("http://localhost:7777/question/",{withCredentials:true})
        .then((response)=>{
            let q=[]
            for(let i of response.data){
                q.push([<QuestionItem questionId={i._id} phrase={i.phrase} qType={i.qType} difficulty={i.difficulty} correctAnswer={i.correctAnswer} wrongAnswer={i.wrongAnswer} isProf={isProf}/>])
            }
            setQuestions([q])
        })
    }
    const [style, setStyle] = useState({
        height:'0px'});
    let [clicked,setClicked]=useState(false)
    const handleClick = () => {
        axios.get("http://localhost:7777/question/",{withCredentials:true})
        .then((response)=>{
            let q=[]
            for(let i of response.data){
                q.push([<QuestionItem questionId={i._id} phrase={i.phrase} qType={i.qType} difficulty={i.difficulty} correctAnswer={i.correctAnswer} wrongAnswer={i.wrongAnswer} isProf={isProf}/>])
            }
            setQuestions([q])
        })
        if(clicked){
            setClicked(false)
            setStyle({
                height:'0px'
            });
        }else{
            setClicked(true)
            setStyle({
                height:'max-content'
            });
        }
  };
    return(
        <section id="sectionQuestions">
            <div onClick={()=>handleClick()} id="questionAdd">Ajouter une question</div>
            <QuestionAdd handler={handleClick} stl={style} />
            {questions}
        </section>
    )
}
export default SectionQuestions;