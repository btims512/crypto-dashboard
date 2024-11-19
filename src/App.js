import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, CircularProgress, Box } from "@mui/material";
import Title from "./components/Title";
import TopCoinsTable from "./components/TopCoinsTable";
import PriceChangeGraph from "./components/PriceChangeGraph";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([]);
  const [chartData, setChartData] = useState([]);

  const MAX_API_CALLS = 5;
  const ONE_MINUTE = 60000;

  const handleRefresh = () => {
    setLoading(true);
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Check localStorage for cached data, API call count, and last API call timestamp
      const cachedCoins = localStorage.getItem("coinsData");
      const cachedChart = localStorage.getItem("chartData");
      let apiCallCount = parseInt(localStorage.getItem("apiCallCount")) || 0;
      let lastApiCallTime =
        parseInt(localStorage.getItem("lastApiCallTime")) || 0;
      const currentTime = Date.now();

      // Reset apiCallCount if more than a minute has passed since the last API call
      if (currentTime - lastApiCallTime >= ONE_MINUTE) {
        console.log("One minute passed, resetting API call count.");
        apiCallCount = 0;
        localStorage.setItem("apiCallCount", apiCallCount);
        localStorage.setItem("lastApiCallTime", currentTime); // Update timestamp
      }

      // Use cache if it exists and we've reached the max API call limit
      if (cachedCoins && cachedChart && apiCallCount >= MAX_API_CALLS) {
        console.log("Loading data from cache");
        setCoins(JSON.parse(cachedCoins));
        setChartData(JSON.parse(cachedChart));
        setLoading(false);
        return;
      }

      console.log("Fetching data from API");
      try {
        const [coinsResponse, chartResponse] = await Promise.all([
          axios.get("http://localhost:4000/api/coins/markets", {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
            },
          }),
          axios.get("http://localhost:4000/api/coins/bitcoin/market_chart", {
            params: {
              vs_currency: "usd",
              days: 7,
            },
          }),
        ]);

        // Set data to state
        setCoins(coinsResponse.data);
        const formattedData = chartResponse.data.prices
          .slice(-7)
          .map((price) => ({
            date: new Date(price[0]).toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
            }),
            price: price[1],
          }));
        setChartData(formattedData);

        // Cache data in localStorage
        localStorage.setItem("coinsData", JSON.stringify(coinsResponse.data));
        localStorage.setItem("chartData", JSON.stringify(formattedData));

        // Increment and store the API call count and update the last call time
        apiCallCount += 1;
        localStorage.setItem("apiCallCount", apiCallCount);
        localStorage.setItem("lastApiCallTime", currentTime); // Store current time
        console.log(`API call count: ${apiCallCount}`);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchData();
  }, [refresh]);

  return (
    <Container>
      <Title onRefresh={handleRefresh} />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TopCoinsTable coins={coins} />
          <PriceChangeGraph data={chartData} />
        </>
      )}
      {/* <Footer /> */}
    </Container>
  );
}

export default App;
