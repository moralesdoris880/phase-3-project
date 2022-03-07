import React from "react";
import {Route, Routes } from "react-router-dom";
import Home from './Home'
import Login from './Login'

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" exact element={<Home />}>
      </Route>
      </Routes>
    </div>
  );
}

export default App;

/* File Structure

App > 
  Home > 
    Login (if login true update state that allows custom stuff)


*/