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
            <TableCell
              sx={{
                fontWeight: "bold",
                p: { xs: 0.8, sm: 1 },
                "@media (min-width:517px)": { p: 2 },
              }}
            >
              Coin
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                p: { xs: 0.5, sm: 1 },
                "@media (min-width:517px)": { p: 2 },
              }}
            >
              Current Price
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                p: { xs: 0.5, sm: 1 },
                "@media (min-width:517px)": { p: 2 },
              }}
            >
              24h Change
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                p: { xs: 0.5, sm: 1 },
                display: { xs: "table-cell" },
                "@media (min-width:517px)": { p: 2 },
                "@media (max-width:429px)": {
                  display: "none",
                },
              }}
            >
              Market Cap
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.id}>
              <TableCell
                sx={{
                  p: { xs: 0.5, sm: 1 },
                  "@media (min-width:517px)": { p: 2 },
                }}
              >
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
              <TableCell
                sx={{
                  p: { xs: 0.5, sm: 1 },
                  "@media (min-width:517px)": { p: 2 },
                }}
              >
                $
                {coin.current_price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell
                sx={{
                  p: { xs: 0.5, sm: 1 },
                  color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                  "@media (min-width:517px)": { p: 2 },
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
              <TableCell
                sx={{
                  p: { xs: 0.5, sm: 1 },
                  display: { xs: "table-cell" },
                  "@media (min-width:517px)": { p: 2 },
                  "@media (max-width:429px)": {
                    display: "none",
                  },
                }}
              >
                $
                {coin.market_cap.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TopCoinsTable;
