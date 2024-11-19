import React from "react";
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

function TopCoinsTable({ coins }) {
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
          {coins.map((coin) => {
            return (
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
                <TableCell>
                  $
                  {coin.current_price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>

                <TableCell
                  style={{
                    color:
                      coin.price_change_percentage_24h > 0 ? "green" : "red",
                  }}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
                <TableCell>
                  $
                  {coin.market_cap.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TopCoinsTable;
