import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./FlightSearchResults.css";
import flightDataJson from "./flight_data.json";

export default function FlightSearchResults() {
  const location = useLocation();
  const searchParams = location.state?.searchParams || {}; // Access search parameters from state
  const [flightData, setFlightData] = useState(flightDataJson);
  const [filteredFlightOffers, setFilteredFlightOffers] = useState([]);
  const [airlineFilters, setAirlineFilters] = useState([]);

  useEffect(() => {
    // Initial filtering based on search parameters
    let initialFilteredFlights = flightDataJson.filter((flight) => {
      const originMatch =
        !searchParams.origin || // if origin is not in searchParams, don't filter by origin
        flight.origin?.toLowerCase() === searchParams.origin?.toLowerCase();
      const destinationMatch =
        !searchParams.destination || // if destination is not in searchParams, don't filter by destination
        flight.destination?.toLowerCase() ===
          searchParams.destination?.toLowerCase();
      return originMatch && destinationMatch;
    });
    setFilteredFlightOffers(initialFilteredFlights);
  }, [searchParams.origin, searchParams.destination]);

  useEffect(() => {
    applyAirlineFilters();
  }, [airlineFilters]);

  const applyAirlineFilters = () => {
    // Apply origin/destination filters first again to the base data
    let tempData = flightDataJson.filter((flight) => {
      const originMatch =
        !searchParams.origin ||
        flight.origin?.toLowerCase() === searchParams.origin?.toLowerCase();
      const destinationMatch =
        !searchParams.destination ||
        flight.destination?.toLowerCase() ===
          searchParams.destination?.toLowerCase();
      return originMatch && destinationMatch;
    });

    // Then apply airline filters
    if (airlineFilters.length > 0) {
      tempData = tempData.filter((flight) =>
        airlineFilters.includes(flight.airline)
      );
    }
    setFilteredFlightOffers(tempData);
  };

  const handleAirlineFilterChange = (airline, isChecked) => {
    if (isChecked) {
      setAirlineFilters([...airlineFilters, airline]);
    } else {
      setAirlineFilters(airlineFilters.filter((filter) => filter !== airline));
    }
  };

  const uniqueAirlines = [
    ...new Set(flightDataJson.map((flight) => flight.airline)),
  ];

  return (
    <div className="flight-search-results-container">
      <aside className="filters-sidebar">
        <div className="filters-section">
          <h3>Filter Flights</h3>
          <div className="filter-group">
            <h4>Airline</h4>
            {uniqueAirlines.map((airline) => (
              <label key={airline}>
                <input
                  type="checkbox"
                  value={airline}
                  checked={airlineFilters.includes(airline)}
                  onChange={(e) =>
                    handleAirlineFilterChange(airline, e.target.checked)
                  }
                />
                {airline} (
                {
                  flightDataJson.filter((flight) => flight.airline === airline)
                    .length
                }
                )
              </label>
            ))}
          </div>
          {/* Add more filter groups as needed - for price range, stops, etc. */}
        </div>
      </aside>

      <main className="results-content">
        <section className="search-info">
          {/* Display search parameters */}
          <div className="search-info-box">
            <h2>Showing flights for:</h2>
            <div>
              {searchParams.origin && (
                <span>
                  <strong>Origin:</strong> {searchParams.origin}
                  &nbsp;&nbsp;&nbsp;
                </span>
              )}
              {searchParams.destination && (
                <span>
                  <strong>Destination:</strong> {searchParams.destination}
                  &nbsp;&nbsp;&nbsp;
                </span>
              )}
              {searchParams.departureDate && (
                <span>
                  <strong>Departure Date:</strong> {searchParams.departureDate}
                  &nbsp;&nbsp;&nbsp;
                </span>
              )}
              {searchParams.returnDate && (
                <span>
                  <strong>Return Date:</strong> {searchParams.returnDate}
                  &nbsp;&nbsp;&nbsp;
                </span>
              )}
              {searchParams.tripType && (
                <span>
                  <strong>Trip Type:</strong> {searchParams.tripType}
                  &nbsp;&nbsp;&nbsp;
                </span>
              )}
              {searchParams.travelClass && (
                <span>
                  <strong>Class:</strong> {searchParams.travelClass}
                  &nbsp;&nbsp;&nbsp;
                </span>
              )}
              {searchParams.travellers && (
                <span>
                  <strong>Travellers:</strong> {searchParams.travellers}
                  &nbsp;&nbsp;&nbsp;
                </span>
              )}
              {searchParams.selectedFare && (
                <span>
                  <strong>Fare Type:</strong> {searchParams.selectedFare}
                  &nbsp;&nbsp;&nbsp;
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="flight-results">
          <h2>Available Flights</h2>
          <div className="flight-listing">
            {filteredFlightOffers.map((flight) => (
              <div key={flight.id} className="flight-card">
                <div className="flight-details">
                  <h3>
                    {flight.airline} - {flight.flightNumber}
                  </h3>
                  <p>
                    Route: {flight.origin} to {flight.destination}
                  </p>
                  <p>
                    Departure: {flight.departureTime}, Arrival:{" "}
                    {flight.arrivalTime}
                  </p>
                  <p>Duration: {flight.duration}</p>
                  <p>Class: {flight.class}</p>
                  <p>
                    Stops: {flight.stops}{" "}
                    {flight.stopDetails ? `(${flight.stopDetails})` : ""}
                  </p>
                  <p>Features: {flight.features.join(", ")}</p>
                </div>
                <div className="flight-price-book">
                  <p className="price">₹ {flight.price}</p>
                  <button className="book-now-button">BOOK NOW</button>
                </div>
              </div>
            ))}
            {filteredFlightOffers.length === 0 && (
              <p>No flight offers found for your criteria.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
