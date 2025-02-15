import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import BusBookingForm from "./components/BusBookingForm";
import CabBookingForm from "./components/CabBookingForm";
import TrainBookingForm from "./components/TrainBookingForm";
import BusSearchResults from "./components/BusSearchResults";
import CabSearchResults from "./components/CabSearchResults";
import TrainSearchResults from "./components/TrainSearchResults";
import FlightSearchResults from "./components/FlightSearchResults";
import AirbnbNavbar from "./components/Navbar";
import Services from "./components/Services";

const Layout = ({ children }) => (
  <>
    <AirbnbNavbar />
    {children}
    <Services />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <BookingForm />
            </Layout>
          }
        />
        <Route
          path="/bus-booking"
          element={
            <Layout>
              <BusBookingForm />
            </Layout>
          }
        />
        <Route
          path="/cab-booking"
          element={
            <Layout>
              <CabBookingForm />
            </Layout>
          }
        />
        <Route
          path="/train-booking"
          element={
            <Layout>
              <TrainBookingForm />
            </Layout>
          }
        />

        <Route
          path="/train-search-results"
          element={
            <Layout>
              <TrainSearchResults />
            </Layout>
          }
        />
        <Route
          path="/bus-search-results"
          element={
            <Layout>
              <BusSearchResults />
            </Layout>
          }
        />
        <Route
          path="/cab-search-results"
          element={
            <Layout>
              <CabSearchResults />
            </Layout>
          }
        />
        <Route
          path="/flight-search-results"
          element={
            <Layout>
              <FlightSearchResults />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
