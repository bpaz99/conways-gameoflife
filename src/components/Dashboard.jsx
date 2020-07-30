
import React, { useState, useEffect, useRef  } from 'react';
import CanvasComponent from './CanvasComponent';
import {presets} from "./Presets"
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ClearIcon from '@material-ui/icons/Clear';
import StopIcon from '@material-ui/icons/Stop';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Preset from './Preset';

function Dashboard() {
  const [size,setSize] = useState(25)
  const [preset,setPreset] = useState([])
  const [isRunning,setIsRunning] = useState(false)
  const [doNext,setDoNext] = useState(false)
  const [gen,setGen] = useState(0)
  const [clear,setClear] = useState(false)
  const [randomize,setRandomize] = useState(false)
  const [width,setWidth] = useState(0)
  const [speed,setSpeed] = useState(100)

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
    setPreset([])
    setClear(!clear)

  }
  const toggleRandomize = () =>{
    setIsRunning(false)
    setDoNext(false)
    setGen(0)
    setPreset([])
    setRandomize(!randomize)
  }
  const setFinished = () => {
    setIsRunning(false)
    setDoNext(false)
  }
  const updateSpeed = (speed) => {
    setSpeed(200-speed)
  }

  const ref = useRef(null)
  useEffect(() => {
    setWidth(ref.current.clientHeight*0.9)
  },[])

  return (
    <div className="dashboard-wrapper">
        <div className="content" ref={ref}>
            <div className="canvas">
              <CanvasComponent size={preset.length>0?preset.length:size} width={width} preset={preset} gen={gen}
              addGeneration={addGeneration} toggleRunning={toggleRunning} isRunning={isRunning} doNext={doNext} 
              toggleNext={toggleNext} clear={clear} toggleClear={toggleClear} randomize={randomize} 
              toggleRandomize={toggleRandomize} setFinished={setFinished} speed={speed}/>
              <div className="controls">
                <p>Generation: {gen}</p>
                <ClearIcon onClick={toggleClear}/>
                {isRunning?<StopIcon onClick={toggleRunning}/>:<PlayArrowIcon onClick={toggleRunning}/>}
                <SkipNextIcon onClick={isRunning?null:toggleNext}></SkipNextIcon>
                <ShuffleIcon onClick={toggleRandomize}></ShuffleIcon>
                <div className="slider">
                  <Typography id="discrete-slider" gutterBottom>
                    Simulation Speed
                  </Typography>
                  <Slider
                    defaultValue={100}
                    getAriaValueText={updateSpeed}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks={false}
                    min={1}
                    max={200}/>
                  </div>
              </div>
            </div>
            <div className="presets">
              <h1>Presets</h1>
              {presets.map((preset,i)=>{
                  return <div className="preset-wrapper" onClick={(e)=>{e.preventDefault();setGen(0);setPreset(preset.grid)}}>
                    <Preset key={i} data={preset}/>
                </div>
                
                
                // 
                // <div className="preset">
                //   {preset.name}
                // </div>
              })}
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
