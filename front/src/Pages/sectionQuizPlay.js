import './css/quizplay.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Quizplayitem from './Components/quizplayitem';
function SectionQuizPlay({userId,isProf}){
    let quizId = window.location.search.replace("?quizId=", "")
    let [nom,setnom]=useState();
    let [questions,setQuestions] = useState([])
    let quests = []
    let [questionsBlock,setQuestionsBlock]=useState([])
    if(questions.length===0){

        axios.get(`http://localhost:7777/quiz/quiz/${quizId}`,{withCredentials:true})
        .then((response)=>{
            setnom(response.data.nom);
            setQuestions(response.data.questions)
            // prepareblock()
        })
    }
        
    // function prepareblock(){
        
    // }
    useEffect(()=>{
        let gotAll = false
        if(!gotAll){
            axios.post("http://localhost:7777/question/getQuestionsAnswers/",questions,{withCredentials:true})
            .then((response)=>{
                if(response.data){
                    gotAll = true
                    for(let q of response.data){
                        quests.push([<Quizplayitem number={response.data.indexOf(q)} qType={q.qType} questionPhrase={q.phrase} correctAnswers={q.correctAnswer} wrongAnswers={q.wrongAnswer}/>])
                    }
                    setQuestionsBlock([quests])}
                })
            }
    },[questions])
    return(
        <section id="sectionQuizPlay">
            <h2>{nom}</h2>
            {questionsBlock}
            <button onClick={checkAnswers}>Terminer</button>
        </section>
    )
    function checkAnswers(){
        let checkedNumber = document.querySelectorAll("#correct:checked").length
        let correctNumber = document.querySelectorAll("#correct").length
        axios.put(`http://localhost:7777/quiz/editQuiz/${quizId}`,{checks:checkedNumber,corrects:correctNumber,user:userId},{withCredentials:true})
            .then((response)=>{
                if(response.data){
                    alert(response.data)
                }}
            )
            
    }
}
export default SectionQuizPlay;