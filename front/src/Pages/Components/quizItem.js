import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionQuizesEdit from '../sectionQuizesEdit';
// import {Link} from 'react-router-dom';
function QuizItem({quizId,name,count,tries,startDate,isProf}){
    //if isProf then enable deleting option, and disable taking the quiz. Otherwise do the opposite for normal user
    //both get to see everyone's results and correction
    //if normal user, and beyond finish date, then disable taking the quiz
    let [block,setBlock] = useState(manageItem)
    
    function manageItem(){
        if(tries!==0){

            return (
                <div className="quizItem">
                <h2>{name}</h2>
                <div className="quizDate">
                    <div>Ouvert le: <div>{startDate}</div></div>
                </div>
                {count} Questions<br/>
                {tries} Essais disponible<br/>
                <div className="buttons">
    
                {function(){if(!isProf) {
                    return <Link to={`/quizplay/?quizId=${quizId}`}><button>Jouez</button></Link>;
                }else{return [<Link to={`/quizResults/?quizId=${quizId}`}><button>Résultats</button></Link>,<button onClick={modifyQuiz}>Modifier</button>,<button onClick={(e)=>deleteQuiz(e)}>Supprimer</button>]}
            }()}
                </div>
            </div>
        )
        }
        return null;
    }
    function modifyQuiz(){
        setBlock(<SectionQuizesEdit quizID={quizId} handler={()=>setBlock(manageItem())}/>)
    }
    function deleteQuiz(e){
        // console.log("the id to be deleted is "+ id)
        axios.delete(`http://localhost:7777/quiz/quiz/${quizId}`)
            .then((response)=>{
                alert(response.data)
                e.target.parentElement.parentElement.outerHTML=""
            })
    }
    return block;
}
export default QuizItem;