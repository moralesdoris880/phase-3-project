import React,{useEffect,useState} from "react";

function Todo({username,userId}){
    const[todos,setTodos]=useState([]);
    const[todoid,setTodoId]=useState("");
    const[completedtasks,setCompletedTasks]=useState([]);

    useEffect (()=>{
        fetch(`http://localhost:9292/users/${userId}`,{ headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }})
        .then(response => response.json())
        .then(data => setTodos(data.todos))
    },[userId]);

    function handleEdit(e){
        e.preventDefault();
        console.log(e.target.parentElement)
        
        
    }
    function handleRemove(e){
        e.preventDefault();
        setTodoId(e.target.id)
        fetch(`http://localhost:9292/todos/${todoid}`,{method: 'DELETE'})
        .then(response => response.json())
        .then(data => handleFilter(data))  
    }
    function handleFilter(data){
        setTodos(todos.filter(todo => todo.id !== data.id));   
    }

    return(
        <div>
            <h1>Hello, {username}!</h1>
            <h1>To Do List</h1>
            <div>
                {todos.map(todo => <div className="todo" key={todo.id} >
                    <li key={todo}>{todo.title}</li>
                    <button id={todo.id} className="editbtn" onClick={handleEdit}>Edit</button>
                    <button id={todo.id} className="rembtn" onClick={handleRemove}>Remove</button>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Todo;

/*
fetch(`http://localhost:9292/todos/${e.target.id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "title": `${fullname}`,
                "content": `${email}`
        })
        .then(response => response.json())
        .then(data => console.log(data))
*/

/* Implement tasks to Completed Tasks so once it is checked, completed tasks are put onto another table
*/