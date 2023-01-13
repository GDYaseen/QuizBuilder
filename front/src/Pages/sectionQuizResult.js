import axios from "axios"
import { useState } from "react"
import './css/resultat.css';
function SectionQuizResult(){
    let quizId = window.location.search.replace("?quizId=", "")
    let [results,setResults] = useState([])
    if(results.length===0){

        axios.get(`http://localhost:7777/quiz/results/${quizId}`,{withCredentials:true})
        .then((response)=>{
            let q=[]
            for(let i of response.data){
                q.push(<div className="userResult">{i[1]["nom"]} Score:<span>{i[0]["result"]}</span></div>)
            }
            // console.log(response.data)
            // console.log(q)
            setResults([q])
        })
    }
    return(
        <section id="sectionResults">
            {results}
        </section>
    )
}
export default SectionQuizResult;