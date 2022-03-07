import React, {useState}from 'react';
import Login from './Login';

function Home(){
    const[loggedin,setLoggedIn]=useState(false);
    return (
        <div>
            <h1>My Daily Planner</h1>
            <div>
                <Login loggedin={loggedin}/>
            </div>
        </div>
    )
}

export default Home;