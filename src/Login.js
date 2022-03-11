import React,{useState,useEffect} from "react";
import Todo from "./Todo";

function Login(){
    const[password,setPassword]=useState("coolapple1234");
    const[username,setUsername]=useState("bloodinia");
    const[usernames,setUsernames]=useState([]);
    const[display,setDisplay]=useState("inline");
    const[displaytodo,setDisplayTodo]=useState("none");
    const[userId,setUserId]=useState(1);

    useEffect (()=>{
        fetch(`http://localhost:9292/users`)
        .then(response => response.json())
        .then(data => setUsernames(data))
    },[]);

    function handleSubmit(e){
        e.preventDefault(); 
        console.log(localStorage);
        usernames.forEach(user => checkUserInfo(user)) 
    }
    function checkUserInfo(user){
        if(user.username === username && user.password === password){
            console.log("logging in...")
            localStorage.setItem('loggedin','true')
            setDisplay("none");
            setDisplayTodo("inline");
            setUserId(user.id); 
        }
        else{
            console.log("Please Try Again");
        }
    }
           
    function handlePassword(e){
        e.preventDefault();
        
        setPassword(e.target.value);
        console.log(e.target.value)
    }
    function handleUsername(e){
        e.preventDefault();
        setUsername(e.target.value);
        console.log(e.target.value)
    }

    return (
        <div>
            <form id="loginform" onSubmit={handleSubmit} style={{ display: display}}>
                    <label>Username</label><br/>
                    <input type="text" id="username" name="username"required onChange={handleUsername} value={username}></input><br/>
                    <label>Password</label><br/>
                    <input type="text" id="password" name="password" required onChange={handlePassword} value={password}></input><br/>
                    <input type="submit" value="Login"></input>
            </form>
            <div id="todolist" style={{display:displaytodo}} >
                <Todo username={username} userId={userId}/>
            </div> 

        </div>
    )
}

export default Login;

/* Implement handleSubmit so it can stop the looping thru array */