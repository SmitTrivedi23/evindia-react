import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VehicleDetails() {
  const { title } = useParams();
  const [vehicleDetails, setVehicleDetails] = useState(null);

  useEffect(() => {
    // Fetch vehicle details by title and set it to the 'vehicleDetails' state
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getVehicleByTitle/${title}`);
        if (response.ok) {
          const data = await response.json();
          setVehicleDetails(data);
        } else {
          console.error("Failed to fetch vehicle details");
        }
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      }
    };

    fetchDetails();
  }, [title]);

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
      {vehicleDetails ? (
        <div>
          <h1>{vehicleDetails.title}</h1>
          <p>Vehicle Type: {getVehicleTypeLabel(vehicleDetails.vehicleType)}</p>
          <p>Address: {vehicleDetails.address}</p>
          <p>Mobile: {vehicleDetails.mobile}</p>
          <p>Website URL: {vehicleDetails.websiteURL}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default VehicleDetails;
