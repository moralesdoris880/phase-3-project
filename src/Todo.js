import React,{useEffect,useState} from "react";

function Todo({username,userId}){
    const[todos,setTodos]=useState([]);
    const[todoid,setTodoId]=useState("");
    const[title,setTitle]=useState("");
    const[display2,setDisplay2]=useState("none");

    useEffect(()=>{
        fetch(`http://localhost:9292/users/${userId}`,{ headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }})
        .then(response => response.json())
        .then(data => setTodos(data.todos))
    },[userId,todos,display2]);

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
        let newArr = todos
        newArr[data.id -1 ]= data
        setTodos(newArr)
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
        .then(data => console.log(data))
        setDisplay2("none")
    }
    function handleCreateBtn(){
        setDisplay2("inline")
    }


    return(
        <div>
            <h1>Hello, {username}!</h1>
            <div>
            <h1>To Do List</h1>
            <button onClick={handleCreateBtn}>+</button>
            </div>
            <form style={{ display: display2}}>
                <input type="text" id="titleedit" name="titleedit" onChange={handleTitle} required></input><br/>
                <input type="submit" value="Create" onClick={handleNewTodo}></input>
            </form>
            <div>
                {todos.map(todo => <div className="todo" key={todo.id} >
                    <li key={todo}>{todo.title}</li>
                    <form id={todo.id}style={{ display: "none"}}>
                        <input type="text" id="titleedit" name="titleedit" onChange={handleTitle}></input><br/>
                        <input id={todo.id} type="submit" value="Done" onClick={(e)=>handlePatch(e,todo.id)}></input>
                    </form>
                    <button id={todo.id} className="editbtn" onClick={handleEdit}>Edit</button>
                    <button id={todo.id} className="rembtn" onClick={handleRemove}>Remove</button>
                    </div>)
                }
            </div>
            
        </div>
    )
}

export default Todo;

/* Implement tasks to Completed Tasks so once it is checked, completed tasks are put onto another table
*/