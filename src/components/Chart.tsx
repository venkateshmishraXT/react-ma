import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LinearChart = ({ chartData }) => {

  console.log('inside chart ----' + JSON.stringify(chartData));

  let keysData = []
  for (const key in chartData[0]) {
  keysData.push(key);
  }
  const dataField= keysData[1];
  const dateText = keysData[0];

  // Extract the years and data values
  const months = chartData.map(item => item[dateText]);
  //const values = chartData.data.map(item => item[dataField]);
  //const values = chartData.map(item => item[dataField]);

  const values = chartData.map(item => item.transactions.map(transaction => transaction.amount))
  .reduce((acc, amounts) => acc.concat(amounts), []);

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: false,
        text: "",
      },
      legend: {
        display: false,
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
      },
    },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: chartData.axisinfo? chartData.axisinfo.xaxis : dateText,
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: chartData.axisinfo? chartData.axisinfo.yaxis : dataField,
          }
        },
    }
  };

  const lineGraphData = {
    labels: months,
    datasets: [
      {
        label: "Amount",
        data: values,
        borderColor: 'rgb(75, 192, 192)',
        yAxisID: "y",
        pointBorderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(255, 99, 132)'
      },
    ],
  };

  return <Line options={options} data={lineGraphData} />;
};

export default LinearChart;
