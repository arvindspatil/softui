import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class MyChart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             chartData:props.chartData
        }
    }
    
    render() {
        return (
            <div className="chart">
                <Line
                    data={this.state.chartData}
                    options={{
                        scales: {
                          yAxes: [{
                            ticks: {
                              beginAtZero: false
                            }
                          }]
                        },
                        legend: {
                          display: false,
                        }
                      }}
                    height="380"
                    width="900"
                />       
            </div>
        )
    }
}

export default MyChart
