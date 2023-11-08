import "./App.css";
import { useState } from "react";
import VehicleList from "./components/AllVehicleDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VehicleDetails from "./components/VehicleDetails";

function App() {
  const [value, setValue] = useState("");
  return (
    <>
      <Routes>
        <Route path="/" exact element={<VehicleList />} />
        <Route path="/vehicle/:title" element={<VehicleDetails />} />
      </Routes>
    </>
  );
}

export default App;
