import React from "react";
import {Route, Routes } from "react-router-dom";
import Home from './Home'
import Login from './Login'

function App() {
  return (
    <div className="App">
      <h1>My Daily Planner</h1>
      <Routes>
      <Route path="/" exact element={<Login />}>
      </Route>
      </Routes>
    </div>
  );
}

export default App;