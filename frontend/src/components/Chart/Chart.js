import React,{Component} from 'react';
import {Bar} from 'react-chartjs-2';
import classes from './Chart.css';
class Chart extends Component {
     render(){
         console.log(this.props)
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
                scaleLabel: {
                  display: true,
                  labelString: this.props.x_label
                },
                gridLines: {
                  display: false
                },
            
                labels:this.props.labels,
              }
            ],
            yAxes: [
              {
                type: 'linear',
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: this.props.y_label
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
            
           const plugins = [{
            afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            }
            }];
          
       
        console.log(this.props.data)
        return (
            <div className={classes.Chart}>
                <Bar 
                    data = {data}
                    options={options}
                    plugins={plugins}
                
                />
            
            </div>
            
        )
    }
}



export default Chart;