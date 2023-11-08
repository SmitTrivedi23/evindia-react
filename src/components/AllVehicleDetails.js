// import React, { useState, useEffect } from "react";

// const AllVehicleDetails = () => {
//   const [vehicleDetails, setVehicleDetails] = useState("");
//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//           const response = await fetch('http://localhost:8000/getAllBrand');
//           if (!response.ok) {
//             throw new Error('Failed to fetch data');
//           }
//           const data = await response.json();
//           setVehicleDetails(data);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       };
//       console.log(vehicleDetails)
//       fetchData();

//   }, []);
//   return <div>AllVehicleDetails</div>;
// };

// export default AllVehicleDetails;

import React, { useEffect, useState } from "react";
import "./VehicleList.css" 
import { useNavigate,Link } from "react-router-dom";

function VehicleList() {
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/getAllBrand"); // Update the URL
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setVehicleDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    console.log(vehicleDetails);
    fetchData();
  }, []);

  const handleVehicleClick = async (title) => {
    try {
      const response = await fetch(`http://localhost:8000/getVehicleByTitle/${title}`);
      
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      setSelectedVehicle(data);
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      // Handle the error gracefully, e.g., show an error message to the user
    }
  };

  const getVehicleTypeLabel = (vehicleType) => {
    switch (vehicleType) {
      case 1:
        return "Two-wheeler";
      case 2:
        return "Four-wheeler";
      case 3:
        return "All";
      default:
        return "Unknown";
    }
  };

  return (
    <div>
      <h1>Vehicle List</h1>
      <div className="grid-container">
        {vehicleDetails.map((vehicle) => (
          <div key={vehicle._id} className="grid-item">
            <Link to={`/vehicle/${vehicle.title}`}>View Details</Link>
            <div className="details-container">
              <img src={vehicle.logo} alt="Logo" className="logo" />
              <div className="details-text">
                <h2 onClick={() => handleVehicleClick(vehicle.title) } style={{ cursor: 'pointer' }}>
                  {vehicle.title}
                </h2>
                <p className="vehicle-type-label">Vehicle Type: {getVehicleTypeLabel(vehicle.vehicleType)}</p>
                <p>Address: {vehicle.address}</p>
                <p>Mobile: {vehicle.mobile}</p>
                <p>Website URL: {vehicle.websiteURL}</p>
              </div>

            </div>
          </div>
        ))}
      </div>

      {selectedVehicle && (
        <div className="selected-vehicle-details">
          <h2>{selectedVehicle.title}</h2>
          <p className="vehicle-type-label">Vehicle Type: {getVehicleTypeLabel(selectedVehicle.vehicleType)}</p>
          <p>Address: {selectedVehicle.address}</p>
          <p>Mobile: {selectedVehicle.mobile}</p>
          <p>Website URL: {selectedVehicle.websiteURL}</p>
          <button onClick={() => setSelectedVehicle(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
}

export default VehicleList;
