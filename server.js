const express = require("express");
const axios = require("axios");
const cors = require("cors"); 
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/api/coins/markets", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.get("/api/coins/bitcoin/market_chart", async (req, res) => {
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
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chart data" });
  }
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
