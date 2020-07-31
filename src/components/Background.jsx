import React from "react";
import p5 from "p5";
/**
 * This is a "Simplified version"
 *  
 */

class CanvasComponent extends React.Component {
    
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.windowRef = React.createRef()
        this.gridSize = 25
        this.state={
        grid : this.Make2Darray()
        }
    }
  
  Make2Darray(value=null){
    let cellSize = 75
    let grid = new Array(this.gridSize)
    for(let i=0;i<this.gridSize;i++){
        grid[i] = new Array(this.gridSize)
        for(let j=0;j<this.gridSize;j++)
          grid[i][j] = new Cell(i*cellSize,j*cellSize,cellSize-1,Math.floor(Math.random()*2))
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
      p.createCanvas(window.outerWidth,window.outerHeight)
    }

    p.draw = () => {
        p.background(0)
        //Draw cells
        this.state.grid.forEach((row,i)=>{
        row.forEach((col,j)=>{
            this.state.grid[i][j].draw(p)
        })})
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
        })}) //End of neighbours check
        p.noLoop()
        if(JSON.stringify(nextGeneration)===JSON.stringify(this.state.grid)){
            setTimeout(()=>{
              this.setState({grid:nextGeneration})
          },2000)
        }else{
            setTimeout(()=>{
                this.setState({grid:nextGeneration})
            },500)
            p.loop()
        }
    }
  }
  
  componentDidMount(){
    this.myP5 = new p5(this.Sketch,this.myRef.current)
    this.setState({grid:this.Make2Darray()})

  }

  render(){
    return (<div ref={this.myRef} className="background"></div>)
  }
}

export default CanvasComponent


class Cell{
    constructor(x,y,size,state){
      this.x = x
      this.y = y
      this.size = size
      this.state = state
    }
    draw(p){
      if(this.state===1) 
        p.fill(30)
      else
        p.fill(0)
      p.strokeWeight(0.5);
      p.stroke(50)
      p.rect(this.x,this.y,this.size-1,this.size-1)
    }

    checkClicked = (p) => {
      if(p.dist(p.mouseX,p.mouseY,this.x+this.size/2,this.y+this.size/2)<this.size/2){
        this.state = 1-this.state
      }
    }

}

