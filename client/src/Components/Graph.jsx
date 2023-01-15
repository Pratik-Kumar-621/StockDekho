import React from "react";
import { data } from "../Data/output";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Graph = () => {
  const [posts, setPost] = React.useState(null);

  React.useEffect(() => {
    axios
      .post("http://localhost:3001/getNSE", {
        data: {
          startDate: "2018-01-15",
          endDate: "2018-01-20",
        },
      })
      .then((response) => {
        setPost(response.data);
      });
  }, []);
  console.log(posts);
  const value = data.map((item) => ({
    x: new Date(item.Date),
    y: [item.High, item.Low, item.Open, item.Close],
  }));
  const series = [
    {
      data: value,
    },
  ];
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <div>
      <h1>
        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height={350}
        />
      </h1>
    </div>
  );
};

export default Graph;
