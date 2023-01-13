import {useState} from 'react';
import './css/login.css';

let Login = ({formConnectBehavior,formRegisterBehavior})=>{
    console.log("Rendered Login")

    let [b,setB] = useState(["connect","Log in",null,formConnectBehavior(this)])
    
    return(
        <form onSubmit={b[3]} id="authent">
            <h1>QuizGame</h1>
            <div id="choice">
                <label htmlFor="radioConnect">
                    <input defaultChecked hidden={true} type="radio" name="choice" id="radioConnect"/>
                    <div onClick={()=>{setB(["connect","Log in",null,formConnectBehavior(this)])}}>
                        Log in
                    </div>
                </label>
                <label htmlFor="radioRegister">
                    <input hidden={true} type="radio" name="choice" id="radioRegister"/>
                    <div onClick={()=>{setB(["register","Register",<input type="email" name="email" placeholder="Email"></input>,formRegisterBehavior(this)])}}>
                    Register
                    </div>
                </label>
            </div>

            <input type="text" name="nom" placeholder="Nom d'utilisation"></input>
            {b[2]}
            <input type="password" minLength={8} name="mdp" placeholder="Mot de passe"></input>
            {b[4]}
            <button type="submit" name={b[0]}>{b[1]}</button>
        </form>
    );
}
  
export default Login;