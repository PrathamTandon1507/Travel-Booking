import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import BusBookingForm from "./components/BusBookingForm";
import CabBookingForm from "./components/CabBookingForm";
import TrainBookingForm from "./components/TrainBookingForm";
import BusSearchResults from "./components/BusSearchResults";
import CabSearchResults from "./components/CabSearchResults";
import TrainSearchResults from "./components/TrainSearchResults";
import FlightSearchResults from "./components/FlightSearchResults";
import Services from "./components/Services";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingForm />} />
        <Route path="/bus-booking" element={<BusBookingForm />} />
        <Route path="/cab-booking" element={<CabBookingForm />} />
        <Route path="/train-booking" element={<TrainBookingForm />} />
        <Route path="/train-search-results" element={<TrainSearchResults />} />
        <Route path="/bus-search-results" element={<BusSearchResults />} />
        <Route path="/cab-search-results" element={<CabSearchResults />} />
        <Route
          path="/flight-search-results"
          element={<FlightSearchResults />}
        />
      </Routes>
      <Services />
    </BrowserRouter>
  );
}

export default App;
