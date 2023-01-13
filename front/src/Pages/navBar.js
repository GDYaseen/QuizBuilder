import {Link} from 'react-router-dom';
function NavBar({isProf}){
    return (
        <aside>
                    <Link to="/"><div className='navBarItem'>
                        HOME
                    </div>
                    </Link>
                    
                    {function ()
                    {if(isProf) return (
                    <Link to="/questions">
                    <div className='navBarItem' >
                        QUESTIONS
                    </div>
                    </Link>)}()}
                    {function ()
                    {if(isProf) return (
                    <Link to="/users">
                    <div className='navBarItem' >
                        UTILISATEURS
                    </div>
                    </Link>)}()}
                    {function ()
                    {if(!isProf) return (
                    <Link to="/quizesresults">
                        <div className='navBarItem'>
                        RESULTATS
                    </div>
                    </Link>)}()}
                </aside>
        
    );
} 
export default NavBar;