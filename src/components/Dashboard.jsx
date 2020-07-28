import React from 'react';
import CanvasComponent from './CanvasComponent';

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
        <div className="content">

            <div className="canvas">
            <CanvasComponent size={25} width={800} height={600}/>
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
