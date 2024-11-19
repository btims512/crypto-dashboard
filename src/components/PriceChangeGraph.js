import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Box, Typography, Select, MenuItem, TextField } from "@mui/material";
import { Chart as ChartJS } from "chart.js/auto";
import Footer from "../components/Footer";

function PriceChangeGraph() {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("30");
  const [coin, setCoin] = useState("bitcoin");

  const CACHE_DURATION = 60000;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Check cache for this timeframe
      const cacheKey = `chartData_${coin}_${timeframe}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      const cacheTimestamp = sessionStorage.getItem(`${cacheKey}_timestamp`);

      // Use cache if available and within the cache duration
      if (
        cachedData &&
        cacheTimestamp &&
        Date.now() - cacheTimestamp < CACHE_DURATION
      ) {
        setChartData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      // Fetch data if cache is unavailable or expired
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
          {
            params: { vs_currency: "usd", days: timeframe },
          }
        );

        if (response.data && response.data.prices) {
          const prices = response.data.prices;
          const dates = prices.map((price) => {
            const date = new Date(price[0]);
            return timeframe === "1"
              ? date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : date.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                });
          });
          const dataPoints = prices.map((price) => price[1]);

          const newChartData = {
            labels: dates,
            datasets: [
              {
                data: dataPoints,
                fill: true,
                backgroundColor: "#B2EBF2",
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
        setLoading(false);
      }
    };

    fetchData();
  }, [timeframe, coin]);

  if (loading) {
    return <p>Loading chart...</p>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
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
          maxTicksLimit:
            timeframe === "7"
              ? 7
              : timeframe === "1"
              ? 12
              : timeframe === "30"
              ? 30
              : undefined,
          callback: function (value, index, values) {
            if (timeframe === "1") {
              if (index % 2 !== 0) return "";

              const label = this.getLabelForValue(value);
              const [hourString, minutes] = label.split(":");
              let hour = parseInt(hourString, 10);
              const isAM = hour < 12;

              if (hour === 0) {
                hour = 12;
              } else if (hour > 12) {
                hour -= 12;
              }
              const period = isAM ? "AM" : "PM";
              return `${hour}:00 ${period}`;
            } else if (timeframe === "30") {
              if (index % 2 !== 0) return "";

              return this.getLabelForValue(value);
            }
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
    <Box
      sx={{
        backgroundColor: "white",
        padding: 2,
        borderRadius: 2,
        position: "relative",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontWeight: 300,
          color: "text.primary",
          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem", lg: "2.5rem" },
          textAlign: "start",
          marginBottom: 2,
        }}
      >
        Price Change
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          marginBottom: 2,
        }}
      >
        <TextField
          select
          label="Select coin"
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            minWidth: 150,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "text.disabled",
              },
              "&:hover fieldset": {
                borderColor: "primary.dark",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
            "& .MuiInputLabel-root": {
              color: "text.disabled",
            },
          }}
        >
          <MenuItem value="bitcoin">Bitcoin</MenuItem>
          <MenuItem value="ethereum">Ethereum</MenuItem>
          <MenuItem value="tether">Tether</MenuItem>
          <MenuItem value="solana">Solana</MenuItem>
          <MenuItem value="binancecoin">BNB</MenuItem>
          <MenuItem value="ripple">XRP</MenuItem>
          <MenuItem value="dogecoin">Dogecoin</MenuItem>
          <MenuItem value="usd-coin">USDC</MenuItem>
          <MenuItem value="staked-ether">Lido Staked Ether (STETH)</MenuItem>
          <MenuItem value="cardano">Cardano (ADA)</MenuItem>
        </TextField>

        <TextField
          select
          label="Select timeframe"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            minWidth: 150,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "text.disabled",
              },
              "&:hover fieldset": {
                borderColor: "primary.dark",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
            "& .MuiInputLabel-root": {
              color: "text.disabled",
            },
          }}
        >
          <MenuItem value="1">24 Hours</MenuItem>
          <MenuItem value="7">7 Days</MenuItem>
          <MenuItem value="30">30 Days</MenuItem>
        </TextField>
      </Box>

      <Line data={chartData} options={options} />
      <Footer />
    </Box>
  );
}

export default PriceChangeGraph;
