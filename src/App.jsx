import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DataDetails from "./Components/DataDetails";
import DataTable from "./Components/DataTable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataTable />} />
        <Route path="/details/:id" element={<DataDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
