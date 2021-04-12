// import React, { Component } from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './dashboard.css';
// import MyNavBar from './components/MyNavBar';
// import LeftTopNavBar from './components/LeftTopNavBar';
// import DashboardHeader from './components/DashboardHeader';
// import DashboardTable from './components/DashboardTable';
// // import MyChart from './components/MyChart';
// import ChartV1 from './components/ChartV1';

// class App extends Component {
//   constructor() {
//     super()
  
//     this.state = {
//        chartData: {}
//     }
//   }

//   componentWillMount() {
//     this.getChartData();
//   }

//   getChartData() {
//     this.setState({
//       chartData:{
//           labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//           datasets: [
//             {
//               data: [15339, 21345, 18483, 24003, 23489, 24092, 18000],
//               lineTension: 0,
//               backgroundColor: 'transparent',
//               borderColor: '#007bff',
//               borderWidth: 4,
//               pointBackgroundColor: '#007bff'
//             },
//             {
//               data: [14339, 24345, 17483, 25003, 22489, 25092, 17000],
//               lineTension: 0,
//               backgroundColor: 'transparent',
//               borderColor: '#007bff',
//               borderWidth: 4,
//               pointBackgroundColor: '#007bff'
//             },
//             {
//               data: [12339, 26345, 16483, 26003, 21489, 26092, 15000],
//               lineTension: 0,
//               backgroundColor: 'transparent',
//               borderColor: '#007bff',
//               borderWidth: 4,
//               pointBackgroundColor: '#007bff'
//             },
//             {
//               data: [5339, 3345, 8483, 4003, 3489, 4092, 8000],
//               lineTension: 0,
//               backgroundColor: 'transparent',
//               borderColor: '#007bff',
//               borderWidth: 4,
//               pointBackgroundColor: '#007bff'
//             },
//             {
//               data: [13339, 11345, 16483, 12003, 11489, 12092, 13000],
//               lineTension: 0,
//               backgroundColor: 'transparent',
//               borderColor: '#007bff',
//               borderWidth: 4,
//               pointBackgroundColor: '#007bff'
//             },
//             {
//               data: [16339, 28345, 22483, 11003, 21489, 11092, 31000],
//               lineTension: 0,
//               backgroundColor: 'transparent',
//               borderColor: '#108b0f',
//               borderWidth: 4,
//               pointBackgroundColor: '#108b0f'
//             }
//           ]
//         }
//     });
//   }

//   render() {
//     return (
//       <>
//       <MyNavBar/>
//       <LeftTopNavBar/>
//       <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
//         <DashboardHeader/>
//         <ChartV1 chartData={this.state.chartData} />
//         {/* <MyChart chartData={this.state.chartData} /> */}
//         <DashboardTable/>
//       </main>
//       </>
//   );
// }
// }
// export default App;

import React, {useState, useEffect} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import MyNavBar from './components/MyNavBar';
import LeftTopNavBar from './components/LeftTopNavBar';
import DashboardHeader from './components/DashboardHeader';
import DashboardTable from './components/DashboardTable';
// import MyChart from './components/MyChart';
import ChartV1 from './components/ChartV1';


function App() {
  const [chartData, setChartData] = useState({})
  useEffect(() => {
    const fetchChartData = async () => {
      const res = await fetch('http://localhost:8080/api/v1/chart-data')
      const data = await res.json()
      console.log(data)
      setChartData(data)
    }
    fetchChartData()
  }, [])

  // const [chartData, setChartData] = useState({
    //     labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    //     datasets: [
    //       {
    //         data: [15339, 21345, 18483, 24003, 23489, 24092, 18000],
    //         lineTension: 0,
    //         backgroundColor: 'transparent',
    //         borderColor: '#007bff',
    //         borderWidth: 4,
    //         pointBackgroundColor: '#007bff'
    //       },
    //       {
    //         data: [14339, 24345, 17483, 25003, 22489, 25092, 17000],
    //         lineTension: 0,
    //         backgroundColor: 'transparent',
    //         borderColor: '#007bff',
    //         borderWidth: 4,
    //         pointBackgroundColor: '#007bff'
    //       },
    //       {
    //         data: [12339, 26345, 16483, 26003, 21489, 26092, 15000],
    //         lineTension: 0,
    //         backgroundColor: 'transparent',
    //         borderColor: '#007bff',
    //         borderWidth: 4,
    //         pointBackgroundColor: '#007bff'
    //       },
    //       {
    //         data: [5339, 3345, 8483, 4003, 3489, 4092, 8000],
    //         lineTension: 0,
    //         backgroundColor: 'transparent',
    //         borderColor: '#007bff',
    //         borderWidth: 4,
    //         pointBackgroundColor: '#007bff'
    //       },
    //       {
    //         data: [13339, 11345, 16483, 12003, 11489, 12092, 13000],
    //         lineTension: 0,
    //         backgroundColor: 'transparent',
    //         borderColor: '#007bff',
    //         borderWidth: 4,
    //         pointBackgroundColor: '#007bff'
    //       },
    //       {
    //         data: [16339, 28345, 22483, 11003, 21489, 11092, 31000],
    //         lineTension: 0,
    //         backgroundColor: 'transparent',
    //         borderColor: '#108b0f',
    //         borderWidth: 4,
    //         pointBackgroundColor: '#108b0f'
    //       }
    //     ]
    // });

    return (
        <>
            <MyNavBar/>
            <LeftTopNavBar/>
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <DashboardHeader/>
                <ChartV1 chartData={chartData} />
                {/* <MyChart chartData={this.state.chartData} /> */}
                <DashboardTable/>
            </main>
        </>        
    )
}

export default App
