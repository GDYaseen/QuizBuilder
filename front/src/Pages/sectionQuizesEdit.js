import './css/addQuiz.css';
import axios from 'axios';
import { useState } from 'react';

function SectionQuizesEdit({quizID,handler,userId,isProf}){
    
        let [studentsBlock,setstudentsBlock] = useState([])
        let stud = []
        let [questionsBlock,setquestionsBlock] = useState([])
        let ques = []
        let checkedStudents = [];
        let checkedQuestions = [];
        let [nom,setnom]=useState();
        let [chancesN,setchancesN]=useState();
        let [startDate,setstartDate]=useState();
        let [endDate,setendDate]=useState();
        axios.get(`http://localhost:7777/quiz/quiz/${quizID}`,{withCredentials:true})
        .then((response)=>{
        
        if(response.data){
            setnom(response.data.nom);
            setchancesN(response.data.chances);
            setstartDate(response.data.startDate.slice(0,10));
            setendDate(response.data.finishDate.slice(0,10));

            

            for(let item of response.data.students)
            {
                checkedStudents.push(item)
            }
            for(let item of response.data.questions)
            {
                checkedQuestions.push(item)
            }
        }
    })
    if(studentsBlock.length===0)
    {
        axios.get("http://localhost:7777/user",{withCredentials:true})
            .then((response)=>{
                for(let item of response.data)
                {
                    if(!item[1]){
                        stud.push([<label><input id={item[0]._id} defaultChecked={checkedStudents.includes(item[0]._id)} type="checkbox" name="students" />{item[0].nom}</label>])
                    }
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
                ques.push([<label><input id={item._id} defaultChecked={checkedQuestions.includes(item._id)} type="checkbox" name="questions" />{item.phrase}</label>])
            }
            setquestionsBlock(ques)
        })
        // console.log(ques)
    }
    function modifyQuiz(e)
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
        axios.put(`http://localhost:7777/quiz/quiz/${quizID}`,object,{withCredentials:true})
            .then((response)=>{
                alert(response.data)
                handler()
            })
            console.log(object)
    }
    return  (
            <section onSubmit={(e)=>modifyQuiz(e)} id="quizesSectionAdd">
                <form>
                Nom: <input required type="text" name="nom" defaultValue={nom} placeholder="Nom"/><br/>
                Chances: <input required type="number" name="chances" defaultValue={chancesN} placeholder="Nombre d'essais"/><br/>
                Date début: <input required type="date" name="startDate" defaultValue={startDate} placeholder="Date début"/><br/>
                Date fin: <input required type="date" name="finishDate" defaultValue={endDate} placeholder="Date fin"/><br/>
                Etudiants: <br/>
                <div id="studentsBlock">
                    {studentsBlock}
                </div>
                Questions: <br/>
                <div id="questionsBlock">
                    {questionsBlock}
                </div>
                <button type='submit'>Modifier</button>
                </form>
            </section>
                )
}
export default SectionQuizesEdit;