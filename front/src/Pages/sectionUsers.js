import axios from 'axios';
import { useState } from 'react';
import './css/users.css';
function SectionUsers({isProf}){
    let [users,setUsers]=useState([])
    let [modificationBody,setModifBod]=useState(<></>)
    let v = []
    if(users.length===0){
        axios.get("http://localhost:7777/user/",{withCredentials:true})
        .then((response)=>{
            for(let u of response.data)
            {
                let td = <tr><td>{u[0].nom}</td><td>{u[0].email}</td><td>{u[0].mdp}</td><td>{u[1].toString()}</td><td><div className="userModify" onClick={(e)=>modifyUser(e,u[0]._id)}><img src="./modify.png" alt=""/></div>{function(){if(!u[1]) return <div className="userDelete" onClick={(e)=>deleteUser(e,u[0]._id)}>x</div>}()}</td></tr>
                v.push(td)
            }
            setUsers([v])
        })
    }
    function deleteUser(e,id){
        axios.delete(`http://localhost:7777/user/${id}`,{withCredentials:true})
        .then((response)=>{
            alert(response.data)
            e.target.parentElement.parentElement.outerHTML=""
        })
    }
    function modifyAndHide(e,id){
        e.preventDefault()
        let formData = new FormData(e.target)
        var object = {};
        formData.forEach((value, key) => object[key] = value);
        axios.put(`http://localhost:7777/user/${id}`,object,{withCredentials:true})
        .then((response)=>{
            alert(response.data)
            setModifBod()
        })
    }
    function modifyUser(e,id){
        setModifBod(<div>
            <h5>Modification</h5>
            <form id="modifyForm" onSubmit={(i)=>modifyAndHide(i,id)}>
            Nom: <input type="text" name="nom" defaultValue={e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML}/>
            Email: <input type="email" name="email" defaultValue={e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML}/>
            Mot de passe: <input type="password" name="mdp" defaultValue={e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.innerHTML}/>
                <button type="submit">Modifier</button>
            </form>
        </div>)
    }
    return(
        <section id="usersSection">
                {modificationBody}
            <table border='0' cellSpacing="0">
                <thead>

                <th>Nom d'utilisateur</th>
                <th>Email</th>
                <th>Mot de passe</th>
                <th>Est Admin</th>
                <th></th>
                </thead>
                <tbody>

                {users}
                </tbody>
            </table>
        </section>
    )
}
export default SectionUsers;