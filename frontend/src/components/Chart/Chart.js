import React,{Component} from 'react';
import {Bar} from 'react-chartjs-2';
import classes from './Chart.css';
class Chart extends Component {
     render(){
       const data = {
            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
            label: "Runs by "+this.props.team_Name,
            type:this.props.type,
            data: this.props.data_A,
            fill: false,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 80, 80,0.8)',
            pointBorderColor: 'rgba(255, 80, 80,0.8)',
            pointBackgroundColor: 'rgba(255, 80, 80,0.8)',
            pointHoverBackgroundColor: 'rgba(255, 80, 80,0.8)',
            pointHoverBorderColor: 'rgba(255, 80, 80,0.8)',
            yAxisID: 'y-axis-2'
            },{
            type: this.props.type,
            label: 'Runs by Opponent',
            data: this.props.data_B,
            fill: false,
            backgroundColor: 'rgba(0, 204, 255,0.8)',
            borderColor: 'rgba(0, 204, 255,0.8)',
            hoverBackgroundColor: 'rgba(0, 204, 255,0.8)',
            hoverBorderColor: 'rgba(0, 204, 255,0.8)',
            yAxisID: 'y-axis-1'
            }]
            };
            
            const options = {
            responsive: true,
            legend: {
              labels: {
                   fontColor: 'white'
                  }
               },
            labels:this.props.labels,
            tooltips: {
            mode: 'label'
            },
            elements: {
            line: {
            fill: false
            }
            },
            scales: {
            
            xAxes: [
              {
                display: true,
                ticks:{fontColor:'white'},
                scaleLabel: {
                  display: true,
                  labelString: this.props.x_label,
                  fontColor:'white'
                },
                gridLines: {
                  display: true
                },
            
                labels:this.props.labels,
              }
            ],
            yAxes: [
              {
                type: 'linear',
                display: true,
                ticks:{fontColor:'white'},
                scaleLabel: {
                  display: true,
                  labelString: this.props.y_label,
                  fontColor:'white',
                },
                position: 'left',
                id: 'y-axis-1',
                gridLines: {
                  display: false
                },
                labels: {
                  show: true
                }
              },
              {
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-2',
                gridLines: {
                  display: false
                },
                labels: {
                  show: true
                }
              }
            ]
            
            }
            };
            
          
       
        return (
            <div className={classes.Chart}>
                <Bar 
                    data = {data}
                    options={options}
                
                />
            
            </div>
            
        )
    }
}



export default Chart;