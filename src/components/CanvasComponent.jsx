import React from "react";
import p5 from "p5";
import {Cell} from "./cell"

class CanvasComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.gridSize = this.props.size
    // this.grid = this.props.preset.length>1?this.props.preset:this.Make2Darray()
    this.state={
      grid : this.Make2Darray()
    }
  }
  
  Make2Darray(value=null){
    let cellSize = this.props.width/this.gridSize
    let grid = new Array(this.gridSize)
    for(let i=0;i<this.gridSize;i++){
      grid[i] = new Array(this.gridSize)
      for(let j=0;j<this.gridSize;j++){
        if (value!=null)
          grid[i][j] = new Cell(i*cellSize,j*cellSize,cellSize-1,value)
        else if(this.props.preset.length>1){
          grid[i][j] = new Cell(i*cellSize,j*cellSize,cellSize-1,this.props.preset[i][j])
        }
        else if(this.props.randomize)
          grid[i][j] = new Cell(i*cellSize,j*cellSize,cellSize-1,Math.floor(Math.random()*2))
        else
          grid[i][j] = new Cell(i*cellSize,j*cellSize,cellSize-1,0)
      }
    }
    return grid
  }

  checkNeighbours(x,y){
    let total = 0
    // Counts the elements surrounding the element
    for(let i=-1;i<=1;i++)
      for(let j=-1;j<=1;j++)
        total += this.state.grid[x-i][y-j].state
    total -= this.state.grid[x][y].state //Substract the current element as the loop counts it as well
    return total
  }

  Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(this.props.width,this.props.width)
    }

    p.draw = () => {
      p.background(0)
      //Draw cells
      this.state.grid.forEach((row,i)=>{
        row.forEach((col,j)=>{
          this.state.grid[i][j].draw(p)
        })
      })

      p.mousePressed = () =>{
        if(!this.props.isRunning){
          this.state.grid.forEach((row,i)=>{
            row.forEach((col,j)=>{
              this.state.grid[i][j].checkClicked(p)
            })
          })
        }
      }
      // Check if stop button has been pressed - if so it will draw the previous canvas...
      if(this.props.isRunning || this.props.doNext){
        //Check next generation
        let nextGeneration = this.Make2Darray(0)
        //Neighbours chech
        this.state.grid.forEach((row,i)=>{
          row.forEach((col,j)=>{
            if (i===0||i===this.gridSize-1||j===0||j===this.gridSize-1){
              nextGeneration[i][j].state=0
            }else{
              let neighbours = this.checkNeighbours(i,j)
              if(this.state.grid[i][j].state === 0 && neighbours===3 )
                nextGeneration[i][j].state = 1
              else if(this.state.grid[i][j].state === 1 &&( neighbours<2 ||neighbours>3))
                nextGeneration[i][j].state=0
              else
                nextGeneration[i][j].state=this.state.grid[i][j].state
            }
          })
        }) //End of neighbours check
        p.noLoop()
        if(JSON.stringify(nextGeneration)===JSON.stringify(this.state.grid)){
          // this.props.toggleRunning()
          this.props.setFinished()
          p.loop()
        }else{
          if(this.props.doNext){
            this.props.toggleNext()
          }
          setTimeout(()=>{
            this.setState({grid:nextGeneration})
            this.props.addGeneration()
            p.loop()
          },this.props.speed)
        }
      }
    }
  }
  
  componentDidMount(){
    this.myP5 = new p5(this.Sketch,this.myRef.current)
    this.setState({grid:this.Make2Darray()})
  }

  componentDidUpdate(){
    if(this.gridSize!==this.props.size){
      this.gridSize = this.props.size
      this.setState({grid:this.Make2Darray()})
    }
    if(!this.props.isRunning){
      if(this.props.clear){
        this.setState({grid:this.Make2Darray(0)})
        this.props.toggleClear()
      }else if(this.props.randomize){
        this.setState({grid:this.Make2Darray()})
        this.props.toggleRandomize()
      }
    }
    if(this.props.preset.length>0){ 
      if(this.props.gen<1)
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.grid=this.Make2Darray()
        // this.setState({grid:this.Make2Darray()}) //For some reason this is not working...
    }
    if(this.props.save){
      //In here we create a new file for download
      let grid = new Array(this.gridSize)
      for(let i=0;i<this.gridSize;i++){
        grid[i] = new Array(this.gridSize)
        for(let j=0;j<this.gridSize;j++){
          grid[i][j] = this.state.grid[i][j].state
        }
      }
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(new Blob([JSON.stringify(grid)], { type: 'application/json' }));
      a.download = `Preset_${Date.now()}`;

      // Append anchor to body.
      document.body.appendChild(a)
      a.click();

      // Remove anchor from body
      document.body.removeChild(a)



      this.props.toggleSave()
    }
  }

  render(){
    return (<div ref={this.myRef} className="p5canvas-wrapper"></div>)
  }
}

export default CanvasComponent

