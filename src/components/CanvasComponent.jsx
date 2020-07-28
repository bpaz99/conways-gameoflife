import React from "react";
import p5 from "p5";

class CanvasComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.gridSize = this.props.size
    this.grid = this.Make2Darray()
    
  }
  
  Make2Darray(){
    let grid = new Array(this.gridSize)
    for(let x=0;x<this.gridSize;x++){
      grid[x] = new Array(this.gridSize).fill(0)
    }
    return grid
  }

  randomfiller(){
    this.grid.forEach((row,i)=>{
      row.forEach((col,j)=>{
        this.grid[i][j] = Math.floor(Math.random()*2)
      })
    })
  }

  Sketch = (p) => {
    // let cellSize = this.props.width/this.gridSize
    let cellSize = this.props.width/this.gridSize
    console.log("CELL SIZE",cellSize)
    p.setup = () => {
      p.createCanvas(this.props.width,this.props.height)
    }

    p.draw = () => {
      p.background(0)
      //Create cells
      this.grid.forEach((row,i)=>{
        row.forEach((col,j)=>{

          console.log(this.grid[i][j])

          if(this.grid[i][j] === 1){
            p.fill(255)
            p.rect(i*cellSize,j*cellSize,cellSize-1,cellSize-1)
          }

        })
      })


    }
  }

  componentDidMount(){
    this.myP5 = new p5(this.Sketch,this.myRef.current)
  }

  render(){
    console.log("Grid",this.grid)
    this.randomfiller()

    console.log(this.props.width)
    return (<div ref={this.myRef}></div>)
  }
}

export default CanvasComponent