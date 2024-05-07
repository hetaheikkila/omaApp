import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function TrainingCharts() {
  const [chartData, setChartData] = useState({
    series: [{
        name: 'Trainings',
        data: [1.1, 3.1, 5.0, 10.1, 9.5, 6.3, 2.1]
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top'
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: [],
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          }
        }
      },
      title: {
        text: 'This years trainings in a column chart',
        floating: true,
        offsetY: 330,
        align: 'center',
      }
    }
  });

  /*useEffect(() => {
    fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
      .then(response => response.json())
      .then(data => {
        const seriesData = data._embedded.customers.map(customer => customer.trainings);
        setChartData({
          ...chartData,
          series: [{ name: 'Customers', data: seriesData }],
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: seriesData
            }
          }
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); */

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
      <div id="html-dist"></div>
    </div>
  );
}
