import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { CircularProgress, Box } from "@mui/material";

function PriceChangeGraph({ refresh, setLoading }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
          {
            params: {
              vs_currency: "usd",
              days: 7,
            },
          }
        );

        const formattedData = response.data.prices.slice(-7).map((price, index) => ({
          date: new Date(price[0]).toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
          }),
          price: price[1],
        }));
        

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh, setLoading]);

  return (
    <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 2 }}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default PriceChangeGraph;
