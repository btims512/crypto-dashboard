import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
} from "@mui/material";

function TopCoinsTable({ refresh, setLoading }) {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);  // Start loading spinner
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
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false);  // Stop loading spinner
      }
    };

    fetchCoins();
  }, [refresh, setLoading]);

  return (
    <TableContainer component={Paper} sx={{ marginBottom: "40px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Coin</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Current Price</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>24h Change</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Market Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.id}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Avatar
                    src={coin.image}
                    alt={coin.name}
                    sx={{ width: 24, height: 24, marginRight: 1 }}
                  />
                  <Box sx={{ pl: 1 }}>
                    {coin.name}
                    <br />
                    <small style={{ color: "gray" }}>
                      {coin.symbol.toUpperCase()}
                    </small>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>${coin.current_price.toLocaleString()}</TableCell>
              <TableCell
                style={{
                  color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
              <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TopCoinsTable;
