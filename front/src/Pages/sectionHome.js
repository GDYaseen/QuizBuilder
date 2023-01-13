import QuizItem from './Components/quizItem'
import axios from 'axios';
import { useState } from 'react';
import {Link} from 'react-router-dom';
function SectionHome({userId,isProf}){
    let [quizes,setQuizes] = useState([])
    if(quizes.length===0){

        axios.get("http://localhost:7777/quiz/",{withCredentials:true})
        .then((response)=>{
            let q=[]
            for(let i of response.data){
                if(isProf){
                    q.push([<QuizItem quizId={i._id} name={i.nom} count={i.questions.length} tries={i.chances} startDate={i.startDate} isProf={isProf}/>])
                }else{

                    let chancesU = i.chancesUsed.filter((e)=>{return e["student"]===userId})
                    if(chancesU==="") chancesU.push({0:{tries:0}})
                    q.push([<QuizItem quizId={i._id} name={i.nom} count={i.questions.length} tries={i.chances-chancesU[0]["tries"]} startDate={i.startDate} isProf={isProf}/>])
                }
            }
            console.log(q)
            setQuizes([q])
        })
    }
    return(
        <section id="sectionQuizes">
            {function(){
                if(isProf)
                {
                    return (<Link to="/quizadd">
                    <div id="quizAdd">Ajouter un quiz</div>
                    </Link>)
                }
            }()
            }
            {quizes}
        </section>
    )
}
export default SectionHome;