// BusBookingForm.jsx
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BusBookingForm.css";
import { useNavigate } from "react-router-dom";

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Ahmedabad",
  "Surat",
];

const BusBookingForm = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleSearch = () => {
    const formattedDate = date.toISOString().split("T")[0];

    navigate("/bus-search-results", {
      state: {
        searchParams: {
          fromCity: fromCity,
          toCity: toCity,
          date: formattedDate,
        },
      },
    });
  };

  return (
    <div className="app-container">
      <div className="bus-booking-form-container">
        <div className="bus-form-grid">
          {/* From City */}
          <div className="bus-form-group">
            <label htmlFor="fromCity" className="bus-form-label">
              From City
            </label>
            <select
              id="fromCity"
              className="bus-form-input"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            >
              <option value="">Select departure city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* To City */}
          <div className="bus-form-group">
            <label htmlFor="toCity" className="bus-form-label">
              To City
            </label>
            <select
              id="toCity"
              className="bus-form-input"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
            >
              <option value="">Select destination city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="bus-form-group">
            <label htmlFor="date" className="bus-form-label">
              Date
            </label>
            <DatePicker
              id="date"
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd MMM yy"
              className="bus-form-date-picker-input"
              placeholderText="Select date"
            />
          </div>

          {/* Search Button */}
          <div className="bus-form-search-button-container">
            <button className="bus-form-search-button" onClick={handleSearch}>
              Search Buses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusBookingForm;
