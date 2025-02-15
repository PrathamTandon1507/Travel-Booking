import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./CabSearchResults.css";
import cabDataJson from "./cab_data.json";

export default function CabSearchResults() {
  const location = useLocation();
  const searchParams = location.state?.searchParams || {}; // Access search parameters from state
  const [cabData, setCabData] = useState(cabDataJson);
  const [filteredCabData, setFilteredCabData] = useState([]);
  const [cabTypeFilters, setCabTypeFilters] = useState([]);

  useEffect(() => {
    // Initial filtering based on search parameters
    let initialFilteredCabs = cabDataJson.filter((cab) => {
      const fromCityMatch =
        !searchParams.fromLocation || // Use fromLocation from searchParams (form input name)
        cab.fromCity
          ?.toLowerCase()
          .includes(searchParams.fromLocation.toLowerCase()); // Filter by cab.fromCity from data
      const toCityMatch =
        !searchParams.toLocation || // Use toLocation from searchParams (form input name)
        cab.toCity
          ?.toLowerCase()
          .includes(searchParams.toLocation.toLowerCase()); // Filter by cab.toCity from data
      return fromCityMatch && toCityMatch;
    });
    setFilteredCabData(initialFilteredCabs);
  }, [searchParams.fromLocation, searchParams.toLocation]);

  useEffect(() => {
    applyFilters();
  }, [cabTypeFilters]);

  const applyFilters = () => {
    // Apply initial city filters first
    let tempData = cabDataJson.filter((cab) => {
      const fromCityMatch =
        !searchParams.fromLocation ||
        cab.fromCity
          ?.toLowerCase()
          .includes(searchParams.fromLocation.toLowerCase());
      const toCityMatch =
        !searchParams.toLocation ||
        cab.toCity
          ?.toLowerCase()
          .includes(searchParams.toLocation.toLowerCase());
      return fromCityMatch && toCityMatch;
    });

    if (cabTypeFilters.length > 0) {
      tempData = tempData.filter((cab) => cabTypeFilters.includes(cab.cabType));
    }
    setFilteredCabData(tempData);
  };

  const handleCabTypeFilterChange = (type, isChecked) => {
    if (isChecked) {
      setCabTypeFilters([...cabTypeFilters, type]);
    } else {
      setCabTypeFilters(cabTypeFilters.filter((filter) => filter !== type));
    }
  };

  return (
    <div className="cab-search-results-container">
      {/* Filters Sidebar for Cabs */}
      <aside className="filters-sidebar">
        <div className="filters-section">
          <h3>Filter Cabs</h3>
          <div className="filter-group">
            <h4>Cab Type</h4>
            {["Hatchback", "Sedan", "SUV", "MUV"].map(
              (
                type // Added "MUV" to cab types to match data
              ) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    value={type}
                    checked={cabTypeFilters.includes(type)}
                    onChange={(e) =>
                      handleCabTypeFilterChange(type, e.target.checked)
                    }
                  />
                  {type} (
                  {cabDataJson.filter((cab) => cab.cabType === type).length})
                </label>
              )
            )}
          </div>
          {/* Add more filter groups as needed */}
        </div>
      </aside>
      {/* Main Content Area for Cab Results */}
      <main className="results-content">
        {/* Search Information for Cabs */}
        <section className="search-info">
          <div className="search-info-box">
            <h2>Showing cabs for:</h2>
            <div>
              {searchParams.fromLocation && (
                <span>
                  <strong>From City:</strong> {searchParams.fromLocation}
                  &nbsp;&nbsp;&nbsp;
                </span>
              )}
              {searchParams.toLocation && (
                <span>
                  <strong>To City:</strong> {searchParams.toLocation}
                  &nbsp;&nbsp;&nbsp;
                </span>
              )}
              {searchParams.departureDate && (
                <span>
                  <strong>Date:</strong> {searchParams.departureDate}&nbsp;&nbsp;&nbsp;
                </span>
              )}
              {searchParams.pickupTime && (
                <span>
                  <strong>Pickup Time:</strong> {searchParams.pickupTime}
                  &nbsp;&nbsp;&nbsp;
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Cab Results Section */}
        <section className="cab-results">
          <h2>Available Cabs</h2>
          <div className="cab-listing">
            {filteredCabData.map((cab) => (
              <div key={cab.id} className="cab-card">
                <div className="cab-details">
                  <h3>
                    {cab.model} - {cab.cabType}
                  </h3>
                  <p>Fuel Type: {cab.fuelType}</p>
                  <p>Seats: {cab.seats}</p>
                  <p>
                    Rating: {cab.rating}/5 ({cab.ratingsCount} ratings)
                  </p>
                  <p>Cancellation: {cab.cancellation}</p>
                  <p>Features: {cab.features.join(", ")}</p>
                </div>
                <div className="cab-price-book">
                  <p className="price">₹ {cab.price}</p>
                  <button className="book-now-button">BOOK NOW</button>
                </div>
              </div>
            ))}
            {filteredCabData.length === 0 && <p>No cabs match your filters.</p>}
          </div>
        </section>
      </main>
    </div>
  );
}
