
import React, { useState, useEffect, useRef  } from 'react';
import CanvasComponent from './CanvasComponent';
import {bridge} from "./presets/bridge"
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ClearIcon from '@material-ui/icons/Clear';
import StopIcon from '@material-ui/icons/Stop';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';

function Dashboard() {
  const [size,setSize] = useState(25)
  const [preset,setPreset] = useState([])
  const [isRunning,setIsRunning] = useState(false)
  const [doNext,setDoNext] = useState(false)
  const [gen,setGen] = useState(0)
  const [clear,setClear] = useState(false)
  const [randomize,setRandomize] = useState(false)
  const [width,setWidth] = useState(0)

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

  const ref = useRef(null)
  useEffect(() => {
    console.log(ref.current.clientHeight)
    setWidth(ref.current.clientHeight*0.9)
  })

  return (
    <div className="dashboard-wrapper">
        <div className="content" ref={ref}>
            <div className="canvas">
              <CanvasComponent size={preset.length>3?preset.length:size} width={width} preset={preset}
              addGeneration={addGeneration} toggleRunning={toggleRunning} isRunning={isRunning} doNext={doNext} 
              toggleNext={toggleNext} clear={clear} toggleClear={toggleClear} randomize={randomize} 
              toggleRandomize={toggleRandomize} setFinished={setFinished}/>
              <div className="controls">
                <p>Generation:{gen}</p>
                <ClearIcon onClick={toggleClear}/>
                {isRunning?<StopIcon onClick={toggleRunning}/>:<PlayArrowIcon onClick={toggleRunning}/>}
                <SkipNextIcon onClick={isRunning?null:toggleNext}></SkipNextIcon>
                <ShuffleIcon onClick={toggleRandomize}></ShuffleIcon>

                {/* <button onClick={toggleClear}>Clear</button>
                <button onClick={toggleRunning}>{isRunning?"Stop":"Resume"}</button>
                <button onClick={isRunning?null:toggleNext}>Do next</button>
                <button onClick={toggleRandomize}>Randomize</button> */}
              </div>
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
