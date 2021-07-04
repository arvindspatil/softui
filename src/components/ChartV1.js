import React from 'react'
import {Line} from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { FaBluetooth } from 'react-icons/fa';

function ChartV1({ chartData }) {
    return (
        <div className="chart">
            <Bar
                data={chartData}
                options={{
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    stacked: false,
                    scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                            userCallback: function(value, index, values) {
                                // Convert the number to a string and splite the string every 3 charaters from the end
                                value = value.toString();
                                value = value.split(/(?=(?:...)*$)/);
                    
                                // Convert the array to a string and format the output
                                value = value.join(',');
                                return '$' + value;
                            }
                        }
                    }]
                    },
                    legend: {
                    display: true,
                    color: 'blue'
                    },
                    animation: {
                        duration : 1,
                        onComplete : function() {
                            var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
        
                            // ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
        
                            this.data.datasets.forEach(function(dataset, i) {
                                var meta = chartInstance.controller.getDatasetMeta(i);
                                meta.data.forEach(function(bar, index) {
                                    if (dataset.data[index] > 0) {
                                        var data = dataset.data[index];
                                        var value = data.toString();

                                        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                                        // value = value.split(/(?=(?:...)*$)/);                            
                                        // Convert the array to a string and format the output
                                        // value = value.join(',');
                                        value = '$' + value;
        
                                        ctx.fillText(value, bar._model.x, bar._model.y);
                                    }
                                });
                            });
                        }
                    }
                }}
                height="380"
                width="900"
            />       
        </div>
    )
}

export default ChartV1
