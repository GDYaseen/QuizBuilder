import './App.css';
import Login from './Pages/login';
import Home from './Pages/home';
import axios from 'axios';
import { useState,useEffect } from 'react';
function App() {
  let [user,setUser]= useState([])
  let [block,setBlock]= useState(<Login formConnectBehavior={()=>ConnectBehavior} formRegisterBehavior={()=>RegisterBehavior}/>)
  if(user.length===0){

    axios.get('http://localhost:7777/user/remember',{withCredentials:true})
    .then(response =>{
                if(response.data!=null){
                  setUser([response.data])
                }
          }
          )
        }
          useEffect(()=>{

            if(user[0]!=='' && user.length!==0){
              console.log(user)
              setBlock(<Home logout={()=>setBlock(<Login formConnectBehavior={()=>ConnectBehavior} formRegisterBehavior={()=>RegisterBehavior}/>)} username={user[0].name} userId={user[0]._id} isProf={user[0].isProf}/>)
            }
          },[user])

  let ConnectBehavior = (e) => {
    e.preventDefault()
    let formData = new FormData(e.target)
    var object = {};
    formData.forEach((value, key) => object[key] = value);
    console.log(object)
    axios.post('http://localhost:7777/user/find',object,{withCredentials:true})
    .then((response) => {
        if(response.data!=="UserNotFound"){
          console.log(response.data)
          setUser([response.data])
        }else{alert("Le nom d'utilisateur n'existe pas ou mot de passe incorrect!")}
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  let RegisterBehavior = (e) => {
    let formData = new FormData(e.target)
    var object = {};
    formData.forEach((value, key) => object[key] = value);
    console.log(object)
    axios.post('http://localhost:7777/user',object,{withCredentials:true})
    .then((response) => {
        if(response.data[0]!==0){
            setUser([response.data[1]])
          }else{ alert("user already exist")}
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div className="App">
    {block}
    </div>
      );
}




export default App;
