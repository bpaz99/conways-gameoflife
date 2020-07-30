import React from 'react';
import Dashboard from "./components/Dashboard"
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="title">
        <h1>Conway's game of life</h1>
      </div>
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
