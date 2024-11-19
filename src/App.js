import React, { useState } from "react";
import { Container, CircularProgress, Box } from "@mui/material";
import Title from "./components/Title";
import TopCoinsTable from "./components/TopCoinsTable";
import PriceChangeGraph from "./components/PriceChangeGraph";
import Footer from "./components/Footer"

import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setRefresh((prev) => !prev);
  };

  return (
    <Container>
      <Title onRefresh={handleRefresh} />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TopCoinsTable refresh={refresh} setLoading={setLoading} />
          <PriceChangeGraph refresh={refresh} setLoading={setLoading} />
        </>
      )}
      <Footer />
    </Container>
  );
}

export default App;
