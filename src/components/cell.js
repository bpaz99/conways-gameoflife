export class Cell{
    constructor(x,y,size,state){
      this.x = x
      this.y = y
      this.size = size
      this.state = state
    }
    draw(p){
      if(this.state===1) 
        p.fill(255)
      else
        p.fill(0)
      p.rect(this.x,this.y,this.size-1,this.size-1)

      // p.mousePressed = () => {
      //   if(p.dist(p.mouseX,p.mouseY,this.x,this.y)<this.size/2){
      //     this.state = 1-this.state
      //   }
      // }

    }

    checkClicked = (p) => {
      if(p.dist(p.mouseX,p.mouseY,this.x+this.size/2,this.y+this.size/2)<this.size/2){
        this.state = 1-this.state
      }
    }

}

