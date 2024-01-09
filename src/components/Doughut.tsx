import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ chartData }) => {
    let keysData = []
    for (const key in chartData[0]) {
    keysData.push(key);
    }
    const dataField= keysData[1];
    const displayText = keysData[0];

    // Extract the years and data values
    const labels = chartData.map(item => item[displayText]);
    const values = chartData.map(item => item[dataField]);


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 15
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(212, 221, 239, 0.8)',
        titleColor: '#001B76',
        bodyColor: '#001B76',
      }
    },
    
  };

  const doughnutGraphData = {
    labels: labels,
    datasets: [
      {
        label: dataField,
        data: values,
        borderColor: ['#00218C', '#A4ADCB', '#030C2E', '#323E66', '#C8CCD8', '#2F51B3', '#498DE9', '#DEE1EC'],
        backgroundColor: ['#00218C', '#A4ADCB', '#030C2E', '#323E66', '#C8CCD8', '#2F51B3', '#498DE9', '#DEE1EC'],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut options={options} data={doughnutGraphData} />;
};

export default DoughnutChart;
