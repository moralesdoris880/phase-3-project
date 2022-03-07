import React,{useState,useEffect} from "react";

function Login(){
    const[password,setPassword]=useState("");
    const[username,setUsername]=useState("");

    useEffect (()=>{
        fetch(`http://localhost:9292/${username}`)
        .then(response => response.json())
        .then(data => console.log(data))
    },[]);

    function handleSubmit(e){
        e.preventDefault();    
    }
    function handlePassword(e){
        e.preventDefault();
        setUsername(e.target.value);
    }
    function handleUsername(e){
        e.preventDefault();
        setPassword(e.target.value);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <label>Username</label><br/>
                    <input type="text" id="username" name="username"required onChange={handleUsername}></input><br/>
                    <label>Password</label><br/>
                    <input type="text" id="password" name="password" required onChange={handlePassword}></input><br/>
                    <input type="submit" value="Login"></input>
            </form>
        </div>
    )
}

export default Login;