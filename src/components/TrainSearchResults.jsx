import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TrainSearchResults.css";
import trainDataJson from "./train_data.json";

export default function TrainSearchResults() {
  const location = useLocation();
  const searchParams = location.state?.searchParams || {}; // Access search parameters from state
  const [trainData, setTrainData] = useState(trainDataJson);
  const [filteredTrainData, setFilteredTrainData] = useState([]);
  const [classFilters, setClassFilters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial filtering based on search parameters
    let initialFilteredTrains = trainDataJson.filter((train) => {
      const fromCityMatch =
        !searchParams.fromCity ||
        train.departureStation
          ?.toLowerCase()
          .includes(searchParams.fromCity.toLowerCase());
      const toCityMatch =
        !searchParams.toCity ||
        train.arrivalStation
          ?.toLowerCase()
          .includes(searchParams.toCity.toLowerCase());
      return fromCityMatch && toCityMatch;
    });
    setFilteredTrainData(initialFilteredTrains);
  }, [searchParams.fromCity, searchParams.toCity]);

  useEffect(() => {
    applyFilters();
  }, [classFilters]);

  const applyFilters = () => {
    // Apply initial city filters first
    let tempData = trainDataJson.filter((train) => {
      const fromCityMatch =
        !searchParams.fromCity ||
        train.departureStation
          ?.toLowerCase()
          .includes(searchParams.fromCity.toLowerCase());
      const toCityMatch =
        !searchParams.toCity ||
        train.arrivalStation
          ?.toLowerCase()
          .includes(searchParams.toCity.toLowerCase());
      return fromCityMatch && toCityMatch;
    });

    if (classFilters.length > 0) {
      tempData = tempData.filter((train) => {
        return (
          Array.isArray(train.classes) &&
          train.classes.some((cls) => classFilters.includes(cls))
        );
      });
    }
    setFilteredTrainData(tempData);
  };

  const handleClassFilterChange = (cls, isChecked) => {
    if (isChecked) {
      setClassFilters([...classFilters, cls]);
    } else {
      setClassFilters(classFilters.filter((filter) => filter !== cls));
    }
  };

  return (
    <div className="train-search-results-container">
      <aside className="filters-sidebar">
        <div className="filters-section">
          <h3>Filter Trains</h3>
          <div className="filter-group">
            <h4>Travel Class</h4>
            {[
              "AC First Class",
              "AC 2 Tier",
              "AC 3 Tier",
              "Sleeper",
              "Second Sitting",
            ].map((cls) => {
              // Calculate filtered length outside JSX for clarity
              const filteredLength = Array.isArray(trainData)
                ? trainData.filter(
                    (train) =>
                      Array.isArray(train.classes) &&
                      train.classes.includes(cls)
                  ).length
                : 0;

              return (
                <label key={cls}>
                  <input
                    type="checkbox"
                    value={cls}
                    checked={classFilters.includes(cls)}
                    onChange={(e) =>
                      handleClassFilterChange(cls, e.target.checked)
                    }
                  />
                  {cls} ({filteredLength})
                </label>
              );
            })}
          </div>
        </div>
      </aside>
      <main className="results-content">
        <section className="search-info">
          <div className="search-info-box">
            <h2>Showing trains for:</h2>
            <div>
              {searchParams.fromCity && (
                <span>
                  <strong>From City:</strong> {searchParams.fromCity}
                  &nbsp;&nbsp;&nbsp;
                </span>
              )}
              {searchParams.toCity && (
                <span>
                  <strong>To City:</strong> {searchParams.toCity}
                  &nbsp;&nbsp;&nbsp;
                </span>
              )}
              {searchParams.date && (
                <span>
                  <strong>Date:</strong> {searchParams.date}&nbsp;&nbsp;&nbsp;
                </span>
              )}
              {searchParams.travelClass && (
                <span>
                  <strong>Class:</strong> {searchParams.travelClass}
                  &nbsp;&nbsp;&nbsp;
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="train-results">
          <h2>Available Trains</h2>
          <div className="train-listing">
            {filteredTrainData.map((train) => (
              <div key={train.id} className="train-card">
                <div className="train-details">
                  <h3>
                    {train.trainName} - {train.trainNumber}
                  </h3>
                  <p>
                    Route: {train.departureStation} to {train.arrivalStation}
                  </p>
                  <p>
                    Departure: {train.departureTime}, Arrival:{" "}
                    {train.arrivalTime}
                  </p>
                  <p>Duration: {train.duration}</p>
                  <p>Classes: {train.classes && train.classes.join(", ")}</p>
                  <p>Features: {train.features && train.features.join(", ")}</p>
                </div>
                <div className="train-price-book">
                  <p className="price">
                    ₹ {train.price && train.price[train.classes?.[0]]} onwards
                  </p>
                  <button
                    className="book-now-button"
                    onClick={() =>
                      navigate("/pay", { state: { price: train.price } })
                    } // Pass price in state - CORRECT WAY
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            ))}
            {filteredTrainData.length === 0 && (
              <p>No trains match your filters.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
