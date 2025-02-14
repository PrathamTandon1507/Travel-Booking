// TrainBookingForm.jsx
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown } from "lucide-react";
import "./TrainBookingForm.css";
import { useNavigate } from "react-router-dom";

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];

const travelClasses = [
  "All Classes",
  "AC First Class",
  "AC 2 Tier",
  "AC 3 Tier",
  "Sleeper",
  "Second Sitting",
];

const TrainBookingForm = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState(new Date());
  const [travelClass, setTravelClass] = useState("All Classes");
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    // Format the date to YYYY-MM-DD
    const formattedDate = date.toISOString().split("T")[0];

    // Navigate to TrainSearchResults component with state
    navigate("/train-search-results", {
      state: {
        searchParams: {
          fromCity: fromCity,
          toCity: toCity,
          date: formattedDate,
          travelClass: travelClass,
        },
      },
    });
  };

  return (
    <div className="app-container">
      <div className="train-booking-form-container">
        <div className="train-form-grid">
          {/* From City */}
          <div className="train-form-field">
            <label htmlFor="fromCity" className="train-form-label">
              From City
            </label>
            <select
              id="fromCity"
              className="train-form-input"
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
          <div className="train-form-field">
            <label htmlFor="toCity" className="train-form-label">
              To City
            </label>
            <select
              id="toCity"
              className="train-form-input"
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
          <div className="train-form-field">
            <label className="train-form-label">Date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd MMM yy"
              className="train-form-date-input"
              placeholderText="Select date"
            />
          </div>

          {/* Class Selector */}
          <div className="train-form-field train-form-class-selector-relative">
            <label className="train-form-label">Class</label>
            <button
              onClick={() => setShowClassDropdown(!showClassDropdown)}
              className="train-form-class-selector-button"
            >
              <span>{travelClass}</span>
              <ChevronDown className="train-form-class-selector-icon" />
            </button>

            {showClassDropdown && (
              <div className="train-form-class-dropdown">
                {travelClasses.map((cls) => (
                  <button
                    key={cls}
                    onClick={() => {
                      setTravelClass(cls);
                      setShowClassDropdown(false);
                    }}
                    className={`train-form-class-dropdown-item ${
                      travelClass === cls
                        ? "train-form-class-dropdown-item-active"
                        : ""
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Search Button - outside grid but inside form container */}
        <div className="train-form-search-button-container">
          <button className="train-form-search-button" onClick={handleSearch}>
            Search Trains
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainBookingForm;
