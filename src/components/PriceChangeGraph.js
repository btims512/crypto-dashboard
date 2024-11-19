import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import { Chart as ChartJS } from "chart.js/auto";

function PriceChangeGraph() {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("30");

  const CACHE_DURATION = 60000; // 1 minute

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Check cache for this timeframe
      const cacheKey = `chartData_${timeframe}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      const cacheTimestamp = sessionStorage.getItem(`${cacheKey}_timestamp`);

      // Use cache if available and within the cache duration
      if (cachedData && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
        setChartData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      // Fetch data if cache is unavailable or expired
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
          {
            params: { vs_currency: "usd", days: timeframe },
          }
        );

        if (response.data && response.data.prices) {
          const prices = response.data.prices;
          const dates = prices.map((price) => {
            const date = new Date(price[0]);
            return timeframe === "1"
              ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
          });
          const dataPoints = prices.map((price) => price[1]);

          const newChartData = {
            labels: dates,
            datasets: [
              {
                label: "Price (USD)",
                data: dataPoints,
                fill: true,
                backgroundColor: "#B2EBF2", // Static color for reliable initial render
                borderColor: "rgba(75,192,192,1)",
                tension: 0.4,
                pointRadius: 0,
              },
            ],
          };

          setChartData(newChartData);

          // Cache the new data and timestamp
          sessionStorage.setItem(cacheKey, JSON.stringify(newChartData));
          sessionStorage.setItem(`${cacheKey}_timestamp`, Date.now());
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false after any attempt to fetch data
      }
    };

    fetchData();
  }, [timeframe]);

  if (loading) {
    return <p>Loading chart...</p>;
  }

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            const value = context.raw || 0;
            return `Price: $${value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        grid: { display: true, drawOnChartArea: false },
        ticks: {
          maxTicksLimit: timeframe === "7" ? 7 : undefined,
          callback: function (value, index, values) {
            return this.getLabelForValue(value);
          },
        },
      },
      y: {
        position: "right",
        grid: { display: true },
        ticks: {
          callback: function (value) {
            return `$${value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          },
        },
      },
    },
  };

  return (
    <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 2, position: "relative" }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ position: "absolute", top: 10, left: 20, fontWeight: "bold", color: "text.primary" }}
      >
        Price Change
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
        <ButtonGroup>
          <Button onClick={() => setTimeframe("1")} variant={timeframe === "1" ? "contained" : "outlined"}>
            24 Hours
          </Button>
          <Button onClick={() => setTimeframe("7")} variant={timeframe === "7" ? "contained" : "outlined"}>
            7 Days
          </Button>
          <Button onClick={() => setTimeframe("30")} variant={timeframe === "30" ? "contained" : "outlined"}>
            30 Days
          </Button>
        </ButtonGroup>
      </Box>

      <Line data={chartData} options={options} />
    </Box>
  );
}

export default PriceChangeGraph;
