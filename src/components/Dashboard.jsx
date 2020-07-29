
import React, { useState } from 'react';
import CanvasComponent from './CanvasComponent';
import {bridge} from "./presets/bridge"

function Dashboard() {
  const [size,setSize] = useState(150)
  const [preset,setPreset] = useState([])
  const [isRunning,setIsRunning] = useState(false)
  const [doNext,setDoNext] = useState(false)
  const [gen,setGen] = useState(0)
  const [clear,setClear] = useState(false)
  const [randomize,setRandomize] = useState(false)

  const toggleRunning = () =>{
    setIsRunning(!isRunning)
  }
  const toggleNext = () =>{
    setDoNext(!doNext)
  }
  const addGeneration = () =>{
    setGen(gen+1)
  }
  const toggleClear = () =>{
    setIsRunning(false)
    setDoNext(0)
    setGen(0)
    setClear(!clear)

  }
  const toggleRandomize = () =>{
    setIsRunning(false)
    setDoNext(false)
    setGen(0)
    setRandomize(!randomize)
  }
  const setFinished = () => {
    setIsRunning(false)
    setDoNext(false)
    // setGen("Ended")
  }

  return (
    <div className="dashboard-wrapper">
        <div className="content">
            <div className="canvas">


              <CanvasComponent size={preset.length>3?preset.length:size} width={1920} height={1080} preset={preset}
              addGeneration={addGeneration} toggleRunning={toggleRunning} isRunning={isRunning} doNext={doNext} 
              toggleNext={toggleNext} clear={clear} toggleClear={toggleClear} randomize={randomize} 
              toggleRandomize={toggleRandomize} setFinished={setFinished}/>
              <div className="controls">Generation:{gen}</div>
              <button onClick={toggleClear}>Clear</button>
              <button onClick={toggleRunning}>{isRunning?"Stop":"Resume"}</button>
              <button onClick={isRunning?null:toggleNext}>Do next</button>
              <button onClick={toggleRandomize}>Randomize</button>
            </div>
            <div className="presets">
            </div>
            <div className="info">
                <h1>Rules</h1>
                <div className="rules">
                    <p>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</p>
                    <p>Any live cell with more than three live neighbours dies, as if by overpopulation.</p>
                    <p>Any live cell with two or three live neighbours lives on to the next generation.</p>
                    <p>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;
