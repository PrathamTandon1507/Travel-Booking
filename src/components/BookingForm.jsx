import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  Train,
  Bus,
  Car,
  ArrowLeftRight,
  ChevronDown,
} from "lucide-react";

import "./BookingForm.css";
import BusBookingForm from "./BusBookingForm";
import TrainBookingForm from "./TrainBookingForm";
import CabBookingForm from "./CabBookingForm";
import flightDataJson from "./flight_data.json";

/* eslint-disable react/prop-types */
const TransportNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "Flights", icon: Plane },
    { id: "Trains", icon: Train },
    { id: "Buses", icon: Bus },
    { id: "Cabs", icon: Car },
  ];

  return (
    <div className="transport-nav">
      {tabs.map(({ id, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`transport-nav-button ${
            activeTab === id ? "transport-nav-button-active" : ""
          }`}
        >
          <Icon
            className={`transport-nav-icon ${
              activeTab === id ? "transport-nav-icon-active" : ""
            }`}
          />
          <span className="transport-nav-text">{id}</span>
        </button>
      ))}
    </div>
  );
};

// TravellerForm Component
/* eslint-disable react/prop-types */
const TravellerForm = ({ onApply, initialValues }) => {
  const [travelClass, setTravelClass] = useState(
    initialValues?.class || "Economy/Premium Economy"
  );
  const [travellers, setTravellers] = useState(initialValues?.count || 1);

  return (
    <div className="traveller-form">
      <div className="traveller-form-space-y-4">
        <div>
          <h3 className="traveller-form-title">Number of Travellers</h3>
          <div className="traveller-form-number-buttons">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => setTravellers(num)}
                className={`traveller-form-number-button ${
                  travellers === num
                    ? "traveller-form-number-button-active"
                    : ""
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="traveller-form-title">Choose Class</h3>
          <div className="traveller-form-class-buttons">
            {["Economy", "Premium Economy", "Business", "First Class"].map(
              (cls) => (
                <button
                  key={cls}
                  onClick={() => setTravelClass(cls)}
                  className={`traveller-form-class-button ${
                    travelClass === cls
                      ? "traveller-form-class-button-active"
                      : ""
                  }`}
                >
                  {cls}
                </button>
              )
            )}
          </div>
        </div>

        <button
          onClick={() => onApply({ count: travellers, class: travelClass })}
          className="traveller-form-done-button"
        >
          Done
        </button>
      </div>
    </div>
  );
};

const FlightForm = () => {
  const [tripType, setTripType] = useState("round-trip");
  const [showTravellerForm, setShowTravellerForm] = useState(false);
  const [selectedFare, setSelectedFare] = useState("regular");
  const [travellerDetails, setTravellerDetails] = useState({
    count: 1,
    class: "Economy/Premium Economy",
  });
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(null);
  const [originLocationCode, setOriginLocationCode] = useState("");
  const [destinationLocationCode, setDestinationLocationCode] = useState("");
  const navigate = useNavigate();

  const fareTypes = [
    { id: "regular", label: "Regular", subtext: "Regular fares" },
    { id: "student", label: "Student", subtext: "Extra discounts/baggage" },
    { id: "senior", label: "Senior Citizen", subtext: "Up to ₹ 600 off" },
    { id: "armed", label: "Armed Forces", subtext: "Up to ₹ 600 off" },
    { id: "doctor", label: "Doctor and Nurses", subtext: "Up to ₹ 600 off" },
  ];

  const handleSearchFlights = (event) => {
    event.preventDefault();

    const formattedDepartureDate = fromDate.toISOString().split("T")[0];
    const formattedReturnDate = toDate
      ? toDate.toISOString().split("T")[0]
      : null;

    navigate("/flight-search-results", {
      state: {
        searchParams: {
          // Passing search parameters as state
          origin: originLocationCode,
          destination: destinationLocationCode,
          departureDate: formattedDepartureDate,
          returnDate: formattedReturnDate,
          tripType: tripType,
          travelClass: travellerDetails.class,
          travellers: travellerDetails.count,
          selectedFare: selectedFare,
        },
      },
    });
  };

  return (
    <div className="app-container">
      <div className="flight-form-space-y-6">
        <form onSubmit={handleSearchFlights}>
          <div className="flight-form-radio-group">
            {["one-way", "round-trip", "multi-stop"].map((type) => (
              <label key={type} className="flight-form-radio-label">
                <input
                  type="radio"
                  checked={tripType === type}
                  onChange={(e) => setTripType(e.target.value)}
                  className="flight-form-radio-input"
                  value={type}
                />
                <span>
                  {type === "one-way"
                    ? "One Way"
                    : type === "round-trip"
                    ? "Round Trip"
                    : "Multi Stop"}
                </span>
              </label>
            ))}
          </div>
          <div className="flight-form-location-grid">
            <div>
              <h2 className="flight-form-location-title">
                <input
                  type="text"
                  id="originLocationCode"
                  className="flight-form-location-input"
                  placeholder="Enter origin city/airport code"
                  value={originLocationCode}
                  onChange={(e) =>
                    setOriginLocationCode(e.target.value.toUpperCase())
                  }
                  required
                />
              </h2>
              <p className="flight-form-location-desc">
                Origin Airport/City Code
              </p>
            </div>
            <button
              type="button"
              className="flight-form-swap-button"
              onClick={() => {
                const temp = originLocationCode;
                setOriginLocationCode(destinationLocationCode);
                setDestinationLocationCode(temp);
              }}
            >
              <ArrowLeftRight className="flight-form-swap-icon" />
            </button>
            <div>
              <h2 className="flight-form-location-title">
                <input
                  type="text"
                  id="destinationLocationCode"
                  className="flight-form-location-input"
                  placeholder="Enter destination city/airport code"
                  value={destinationLocationCode}
                  onChange={(e) =>
                    setDestinationLocationCode(e.target.value.toUpperCase())
                  }
                  required
                />
              </h2>
              <p className="flight-form-location-desc">
                Destination Airport/City Code
              </p>
            </div>
          </div>
          <div className="flight-form-date-grid">
            <div className="flight-form-date-picker-container">
              <label className="flight-form-date-label">From Date</label>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                dateFormat="yyyy-MM-dd"
                className="flight-form-date-input"
                placeholderText="Select date"
                minDate={new Date()}
                required
              />
            </div>

            {tripType === "round-trip" && (
              <div className="flight-form-date-picker-container">
                <label className="flight-form-date-label">To Date</label>
                <DatePicker
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="flight-form-date-input"
                  placeholderText="Select date"
                  minDate={fromDate}
                  required
                />
              </div>
            )}
            {tripType === "multi-stop" && (
              <div className="flight-form-date-picker-container">
                <label className="flight-form-date-label">To Date</label>
                <DatePicker
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="flight-form-date-input"
                  placeholderText="Select date"
                  minDate={fromDate}
                  required
                />
              </div>
            )}

            <div className="flight-form-traveller-selector-relative">
              <button
                type="button"
                onClick={() => setShowTravellerForm(!showTravellerForm)}
                className="flight-form-traveller-selector-button"
              >
                <span>{`${travellerDetails.count} Traveller${
                  travellerDetails.count > 1 ? "s" : ""
                }`}</span>
                <ChevronDown className="w-5 h-5" />
              </button>
              <p className="flight-form-traveller-desc">
                {travellerDetails.class}
              </p>

              {showTravellerForm && (
                <TravellerForm
                  onClose={() => setShowTravellerForm(false)}
                  onApply={(details) => {
                    setTravellerDetails(details);
                    setShowTravellerForm(false);
                  }}
                  initialValues={travellerDetails}
                />
              )}
            </div>
          </div>
          <div>
            <span className="flight-form-extra-savings-badge">
              EXTRA SAVINGS
            </span>
            <div className="flight-form-fare-options">
              {fareTypes.map((fare) => (
                <button
                  type="button"
                  key={fare.id}
                  onClick={() => setSelectedFare(fare.id)}
                  className={`flight-form-fare-button ${
                    selectedFare === fare.id
                      ? "flight-form-fare-button-active"
                      : ""
                  }`}
                >
                  <div className="flight-form-fare-label">{fare.label}</div>
                  <div className="flight-form-fare-subtext">{fare.subtext}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="button-div">
            <button type="submit" className="flight-form-search-button">
              SEARCH
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main BookingForm Component
const BookingForm = () => {
  const [activeTab, setActiveTab] = useState("Flights");

  return (
    <div className="booking-form-container">
      <div className="booking-form-wrapper">
        <TransportNav activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="booking-form-content">
          {activeTab === "Flights" ? (
            <FlightForm />
          ) : activeTab === "Buses" ? (
            <BusBookingForm />
          ) : activeTab === "Trains" ? (
            <TrainBookingForm />
          ) : activeTab === "Cabs" ? (
            <CabBookingForm />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
