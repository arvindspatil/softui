import React from 'react'
import {Line} from 'react-chartjs-2';

function ChartV1({ chartData }) {
    return (
        <div className="chart">
            <Line
                data={chartData}
                // options={
                //     responsive = true,
                //     interaction = {
                //         mode: 'index',
                //         intersect: false,
                //     },
                //     stacked = false,
                //     plugins = {
                //         title: {
                //             display: true,
                //             text: 'Chart JS'
                //         }
                //     },
                //     scales = {
                //         y: {
                //             type: 'linear',
                //             display: true,
                //             position: 'left',
                //         },
                //     }
                // }
                options={{
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    stacked: false,
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

export default ChartV1
