import React from "react";
import { Typography, Container } from "@mui/material";
import TopCoinsTable from "./components/TopCoinsTable";
import PriceChangeGraph from "./components/PriceChangeGraph";
import Test from "./components/Test";

function App() {
  return (
    <Container>
      <Test />
      {/* <Typography variant="h4" component="h1" gutterBottom>
        Crypto Dashboard
      </Typography> */}
      {/* <TopCoinsTable /> */}
      {/* <PriceChangeGraph /> */}
    </Container>
  );
}

export default App;
