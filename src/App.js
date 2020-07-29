import React, { useState } from 'react';
import Dashboard from "./components/Dashboard"
import Information from "./components/Information"
import CanvasComponent from "./components/CanvasComponent"
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="title">
        <h1>Conway's game of life</h1>
      </div>
      <Dashboard></Dashboard>
      {/* <Information></Information> */}
    </div>
  );
}

export default App;
