// CabBookingForm.jsx
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CabBookingForm.css";
import { useNavigate } from "react-router-dom";

const CabBookingForm = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState("09:00"); // Default time
  const navigate = useNavigate();

  const handleSearch = () => {
    // Format the date to YYYY-MM-DD
    const formattedDate = departureDate.toISOString().split("T")[0];

    // Navigate to CabSearchResults with state
    navigate("/cab-search-results", {
      state: {
        searchParams: {
          fromLocation: fromLocation,
          toLocation: toLocation,
          departureDate: formattedDate,
          pickupTime: pickupTime,
        },
      },
    });
  };

  return (
    <div className="app-container">
      <div className="cab-booking-form-container">
        <div className="cab-form-grid">
          {/* From Location */}
          <div className="cab-form-group">
            <label htmlFor="fromLocation" className="cab-form-label">
              From Location
            </label>
            <input
              type="text"
              id="fromLocation"
              className="cab-form-input"
              placeholder="Enter pickup location"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
            />
          </div>

          {/* To Location */}
          <div className="cab-form-group">
            <label htmlFor="toLocation" className="cab-form-label">
              To Location
            </label>
            <input
              type="text"
              id="toLocation"
              className="cab-form-input"
              placeholder="Enter drop location"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
            />
          </div>

          {/* Departure Date */}
          <div className="cab-form-group">
            <label className="cab-form-label">Departure Date</label>
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              dateFormat="dd MMM yy"
              className="cab-form-date-input"
              placeholderText="Select date"
            />
          </div>

          {/* Pickup Time */}
          <div className="cab-form-group">
            <label htmlFor="pickupTime" className="cab-form-label">
              Pickup Time
            </label>
            <input
              type="time"
              id="pickupTime"
              className="cab-form-input"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <div className="cab-form-search-button-container">
            <button className="cab-form-search-button" onClick={handleSearch}>
              Search Cabs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabBookingForm;
