import axios from 'axios';
import { useState } from 'react';
import QuizItemDone from './Components/quizItemDone';
function SectionQuizesDone({userId,isProf}){
    let [quizes,setQuizes] = useState([])
    if(quizes.length===0){

        axios.get("http://localhost:7777/quiz/",{withCredentials:true})
        .then((response)=>{
            let q=[]
            for(let i of response.data){
                let chancesU = i.chancesUsed.filter((e)=>{return e["student"]===userId})
                console.log("chancesU: ")
                console.log(chancesU)
                if(chancesU==="") {
                    chancesU.push({0:{tries:0}})
                }
                q.push([<QuizItemDone resultat={chancesU[0]["result"]} quizId={i._id} name={i.nom} count={i.questions.length} tries={i.chances-chancesU[0]["tries"]} startDate={i.startDate} isProf={isProf}/>])
            }
            setQuizes([q])
        })
    }
    return(
        <section id="sectionQuizes">
            {/* {function(){
                if(isProf)
                {
                    return (<Link to="/quizadd">
                    <div id="quizAdd">Ajouter un quiz</div>
                    </Link>)
                }
            }()
            } */}
            {quizes}
        </section>
    )
}
export default SectionQuizesDone;