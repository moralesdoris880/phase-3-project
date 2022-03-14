import React,{ useEffect, useState } from "react";

function Todo ({username,userId}) {

    const [ todos, setTodos ] = useState([]);
    const [ title, setTitle ] = useState("");
    const [ display2, setDisplay2 ] = useState(false);

    useEffect(()=>{
        fetch(`http://localhost:9292/users/${userId}`,{ headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }})
        .then(response => response.json())
        .then(data => setTodos(data.todos))
    },[userId,display2]);

    function handleEdit(e){
        e.preventDefault();
        const form = e.target.previousSibling.id
        document.getElementById(form).style.display="inline"
    }

    function handlePatch(e,id){
        e.preventDefault();
        e.target.parentElement.style.display="none"
        fetch(`http://localhost:9292/todos/${id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "title": `${title}`,
            })
        })
        .then(response => response.json())
        .then(data => handleUpdate(data))
    }

    function handleUpdate(data){
        setTodos(todos.map(todo => todo.id === data.id ? data : todo))
    }

    function handleRemove(e,id){
        e.preventDefault();
        fetch(`http://localhost:9292/todos/${id}`,{method: 'DELETE'})
        .then(response => response.json())
        .then(data =>handleFilter(data))
    }

    function handleFilter(data){
        setTodos(todos.filter(todo => todo.id !== data.id));   
    }

    function handleTitle(e){
        setTitle(e.target.value)
    }

    function handleNewTodo(e){
        e.preventDefault();
        fetch(`http://localhost:9292/todos`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "title": `${title}`,
                "user_id": `${userId}`
            })
        })
        .then(response => response.json())
        .then(data => setTodos(data))
        setDisplay2(false)
    }

    function handleCreateBtn(){
        setDisplay2(true)
    }

    return(
        <div>
            <div id="top">
            <h1 id="todoTitle">To Do</h1>
            <button id="createBtn" onClick={handleCreateBtn}>+</button>
            </div>
            <form style={{ display: display2? "inline":"none"}} onSubmit={handleNewTodo}>
                <input type="text" id="titleEdit" name="titleEdit" required onChange={handleTitle} ></input><br/>
                <input type="submit" value="Create"></input>
            </form>
            <div id="todoContainer">
                {todos.length?todos.map(todo => <div className="todo" key={`todo-${todo.id}`}>
                    <i className="material-icons" onClick={(e)=>handleRemove(e,todo.id)}>check_box_outline_blank</i>
                    <li>{todo.title}</li>
                    <form id={todo.id}style={{ display: "none"}}>
                        <input type="text" id="titleEdit" name="titleEdit" onChange={handleTitle}></input><br/>
                        <input type="submit" value="Done" onClick={(e)=>handlePatch(e,todo.id)}></input>
                    </form>
                    <i className="material-icons" onClick={handleEdit}>edit</i>
                    </div>).reverse()
                :"Loading..."}
            </div>
            
        </div>
    )
}

export default Todo;
