import { Link } from 'react-router-dom';
// import {Link} from 'react-router-dom';
function QuizItemDone({quizId,name,count,tries,resultat,startDate,isProf}){
    //if isProf then enable deleting option, and disable taking the quiz. Otherwise do the opposite for normal user
    //both get to see everyone's results and correction
    //if normal user, and beyond finish date, then disable taking the quiz
    function manageItem(){
        if(tries===0){

            return (
                <div className="quizItem">
                <h2>{name}</h2>
                <div className="quizDate">
                    <div>Ouvert le: <div>{startDate}</div></div>
                </div>
                {count} Questions<br/>
                Votre résultat: {resultat} <br/>
                <div className="buttons">
                    <Link to={`/quizCorrect/?quizId=${quizId}`}><button>Correction</button></Link>
                </div>
            </div>
        )
        }
        return null;
    }
    // function modifyQuiz(){
    //     setBlock(<SectionQuizesEdit quizID={quizId} handler={()=>setBlock(manageItem())}/>)
    // }
    // function deleteQuiz(e){
    //     // console.log("the id to be deleted is "+ id)
    //     axios.delete(`http://localhost:7777/quiz/quiz/${quizId}`)
    //         .then((response)=>{
    //             alert(response.data)
    //             e.target.parentElement.parentElement.outerHTML=""
    //         })
    // }
    return manageItem();
}
export default QuizItemDone;