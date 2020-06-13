import React from 'react';
import {Doughnut,Line} from 'react-chartjs-2';

const data = {
    labels: ["Project Tracker","BlockChain","Elastic Search"],
    datasets: [
      {
        label: "First dataset",
        data: [85, 53, 85],
        fill: true,
        backgroundColor: "#C0C0C0",
        borderColor: "#FF6347"
      },
      {
        label: "Second dataset",
        data: [75, 25, 35],
        fill: false,
        borderColor: "#228B22"
      }
    ]
  };

  const data2 = {
    labels: ["User Crud","Admin UI","Project Crud"],
    datasets: [
      {
        data: [1, 2, 3],
        fill: true,
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        borderColor: "#000000"
      }
    ]
  };

  export default function Home(){
      return(
          <div className="Home">

            <div className="row" >
                <Doughnut width="900" data={data2} />
                <h6>Task Data Per Project</h6>

              </div>
            <hr/>

              <div className="row">
              <Line data={data} />
              <h6>Project Engagement Data</h6>

              </div>
          </div>
      )
  }