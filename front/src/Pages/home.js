import './css/home.css';
import axios from 'axios';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import SectionHome from './sectionHome';
import SectionQuizesEdit from './sectionQuizesEdit';
import SectionQuizPlay from './sectionQuizPlay';
import QuizesAdd from './quizesAdd';
import SectionQuestions from './sectionQuestions';
import SectionUsers from './sectionUsers';
import NavBar from './navBar';
import SectionQuizesDone from './sectionQuizesDone';
import SectionQuizCorrection from './sectionQuizCorrection';
import SectionQuizResult from './sectionQuizResult';

export default function Home({userId,username,logout,isProf}){
    let page = (<div id="HomeBody">
        <header>
            <img alt="" src="./brain.svg"/>
            <h2>QuizGame{function (){if(isProf){return <div id="profTag">Prof</div>}}()}</h2>
            {/* <input type="text" name="" placeholder="Rechercher un cours"/> */}
            <div id="headerAccount">
                <h5 style={{margin:"0px"}}>
                    {username}
                </h5>
                <div><img alt="" onClick={()=>disconnect()} src="./exit.svg"/></div>
                </div>
            </header>
        <div id="main">
            <BrowserRouter>
                <NavBar isProf={isProf} />
                <Routes>
                <Route path="/" element={<SectionHome userId={userId} isProf={isProf}/>}/>
                <Route path="/quizEdit" element={<SectionQuizesEdit isProf={isProf}/>}/>
                <Route path="/quizAdd" element={<QuizesAdd isProf={isProf}/>}/>
                <Route path="/questions" element={<SectionQuestions isProf={isProf}/>}/>
                <Route path="/users" element={<SectionUsers isProf={isProf}/>}/>
                <Route path="/quizesresults" element={<SectionQuizesDone userId={userId} isProf={isProf}/>}/>
                <Route path="/quizplay/" element={<SectionQuizPlay userId={userId} isProf={isProf}/>}/>
                <Route path="/quizCorrect/" element={<SectionQuizCorrection userId={userId} isProf={isProf}/>}/>
                <Route path="/quizResults/" element={<SectionQuizResult userId={userId} isProf={isProf}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    </div>
    );
    return page;

    function disconnect(){
        axios.post('http://localhost:7777/user/logout',{withCredentials:true})
        .then(response =>{
                if(response.data){
                    logout()
                }
            }
        )
    }
}
