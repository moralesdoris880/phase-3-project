import React from "react";
import {Route, Routes } from "react-router-dom";
import Home from './Home';



function App() {

  return (
    <div>
      <h1 id="title" >My Daily Planner</h1>
      <Routes>
      <Route path="/" exact element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
