import React from "react";

function Login(){
    return (
        <div>
            <form >
                    <h1>Login</h1>
                    <label>Username</label><br/>
                    <input type="text" id="username" name="username"required ></input><br/>
                    <label>Password</label><br/>
                    <input type="text" id="password" name="password" required ></input><br/>
                    <input type="submit" value="Login"></input>
            </form>
        </div>
    )
}

export default Login;