import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./BusSearchResults.css";
import busDataJson from "./bus_data.json";

export default function BusSearchResults() {
  const location = useLocation();
  const searchParams = location.state?.searchParams || {}; // Access search parameters from state
  const [busData, setBusData] = useState(busDataJson);
  const [filteredBusData, setFilteredBusData] = useState([]);
  const [busTypeFilters, setBusTypeFilters] = useState([]);

  useEffect(() => {
    // Initial filtering based on search parameters
    let initialFilteredBuses = busDataJson.filter((bus) => {
      const fromCityMatch =
        !searchParams.fromCity ||
        bus.route.toLowerCase().includes(searchParams.fromCity.toLowerCase()); // using includes as route might be "CityA - CityB"
      const toCityMatch =
        !searchParams.toCity ||
        bus.route.toLowerCase().includes(searchParams.toCity.toLowerCase()); // using includes as route might be "CityA - CityB"
      return fromCityMatch && toCityMatch;
    });
    setFilteredBusData(initialFilteredBuses);
  }, [searchParams.fromCity, searchParams.toCity]);

  useEffect(() => {
    applyBusTypeFilters();
  }, [busTypeFilters]);

  const applyBusTypeFilters = () => {
    // Apply initial city filters first
    let tempData = busDataJson.filter((bus) => {
      const fromCityMatch =
        !searchParams.fromCity ||
        bus.route.toLowerCase().includes(searchParams.fromCity.toLowerCase());
      const toCityMatch =
        !searchParams.toCity ||
        bus.route.toLowerCase().includes(searchParams.toCity.toLowerCase());
      return fromCityMatch && toCityMatch;
    });

    // Then apply bus type filters
    if (busTypeFilters.length > 0) {
      tempData = tempData.filter((bus) => busTypeFilters.includes(bus.busType));
    }
    setFilteredBusData(tempData);
  };

  const handleBusTypeFilterChange = (type, isChecked) => {
    if (isChecked) {
      setBusTypeFilters([...busTypeFilters, type]);
    } else {
      setBusTypeFilters(busTypeFilters.filter((filter) => filter !== type));
    }
  };

  return (
    <div className="bus-search-results-container">
      {/* Filters Sidebar for Buses */}
      <aside className="filters-sidebar">
        <div className="filters-section">
          <h3>Filter Buses</h3>
          <div className="filter-group">
            <h4>Bus Type</h4>
            {["AC Sleeper", "AC Semi-Sleeper", "Non-AC Seater", "AC Volvo"].map(
              (type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    value={type}
                    checked={busTypeFilters.includes(type)}
                    onChange={(e) =>
                      handleBusTypeFilterChange(type, e.target.checked)
                    }
                  />
                  {type} ({busData.filter((bus) => bus.busType === type).length}
                  )
                </label>
              )
            )}
          </div>
        </div>
      </aside>
      {/* Main Content Area for Bus Results */}
      <main className="results-content">
        {/* Search Information for Buses */}
        <section className="search-info">
          <p>
            Showing buses for:
            {searchParams.fromCity && ` From City: ${searchParams.fromCity}`}
            {searchParams.toCity && ` To City: ${searchParams.toCity}`}
            {searchParams.date && ` Date: ${searchParams.date}`}
          </p>
        </section>

        {/* Bus Results Section */}
        <section className="bus-results">
          <h2>Available Buses</h2>
          <div className="bus-listing">
            {filteredBusData.map((bus) => (
              <div key={bus.id} className="bus-card">
                <div className="bus-details">
                  <h3>
                    {bus.operator} - {bus.busType}
                  </h3>
                  <p>Route: {bus.route}</p>
                  <p>
                    Departure: {bus.departureTime}, Arrival: {bus.arrivalTime}
                  </p>
                  <p>Duration: {bus.duration}</p>
                  <p>Features: {bus.features.join(", ")}</p>
                </div>
                <div className="bus-price-book">
                  <p className="price">₹ {bus.price}</p>
                  <button className="book-now-button">BOOK NOW</button>
                </div>
              </div>
            ))}
            {filteredBusData.length === 0 && (
              <p>No buses match your filters.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
