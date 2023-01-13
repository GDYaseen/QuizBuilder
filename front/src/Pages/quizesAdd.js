import axios from 'axios';
import { useState } from 'react';
import './css/addQuiz.css';
function QuizesAdd({isProf}){
    let [studentsBlock,setstudentsBlock] = useState([])
    let stud = []
    let [questionsBlock,setquestionsBlock] = useState([])
    let ques = []
    if(studentsBlock.length===0)
    {
        axios.get("http://localhost:7777/user",{withCredentials:true})
            .then((response)=>{
                for(let item of response.data)
                {
                    if(!item[1])
                    stud.push([<label><input id={item[0]._id} type="checkbox" name="students" />{item[0].nom}</label>])
                }
                setstudentsBlock(stud)
            })
            // console.log(stud)
    }
    if(questionsBlock.length===0)
    {
        axios.get("http://localhost:7777/question",{withCredentials:true})
            .then((response)=>{
                // console.log(response.data)
                for(let item of response.data)
                {
                    ques.push([<label><input id={item._id} type="checkbox" name="questions" />{item.phrase}</label>])
                }
                setquestionsBlock(ques)
            })
            // console.log(ques)
    }
    function addQuiz(e)
    {
        e.preventDefault()
        let formData = new FormData(e.target)
        let students=e.currentTarget.querySelectorAll("input[name='students']")
        let questions=e.currentTarget.querySelectorAll("input[name='questions']")
        let st = []
        let qu = []
        for(let s of students){
            if(s.checked){
                //         if(selectChoice!=="Vrais ou faux") wAns.push(c.nextElementSibling.value)
                st.push(s.id)
            }
        }
        for(let s of questions){
            if(s.checked){
                //         if(selectChoice!=="Vrais ou faux") wAns.push(c.nextElementSibling.value)
                qu.push(s.id)
            }
        }
        formData.append("students", JSON.stringify(st))
        formData.append("questions", JSON.stringify(qu))
        var object = {};
        formData.forEach((value, key) => object[key] = value);
        axios.post("http://localhost:7777/quiz/quiz",object,{withCredentials:true})
            .then((response)=>{
                alert(response.data)
            })
            console.log(object)
    }
    return(
        <section onSubmit={(e)=>addQuiz(e)} id="quizesSectionAdd">
            <form>
            Nom: <input required type="text" name="nom" placeholder="Nom"/><br/>
            Chances: <input required type="number" name="chances" placeholder="Nombre d'essais"/><br/>
            Date début: <input required type="date" name="startDate" placeholder="Date début"/><br/>
            Date fin: <input required type="date" name="finishDate" placeholder="Date fin"/><br/>
            Etudiants: <br/>
            <div id="studentsBlock">
                {studentsBlock}
            </div>
            Questions: <br/>
            <div id="questionsBlock">
                {questionsBlock}
            </div>
            <button type='submit'>Ajouter</button>
            </form>
        </section>
    )
}
export default QuizesAdd;