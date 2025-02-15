import { motion } from "framer-motion";
import "./Services.css";

export default function Services() {
  return (
    <motion.div
      className="services"
      style={{
        backgroundImage:
          "url('https://cdn.britannica.com/54/237654-050-9DD5E536/Macro-image-of-all-major-credit-card-companies.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "400px",
        overflow: "hidden",
      }}
    >
      <h4>Our Booking Services</h4>
      <div className="service-box">
        <div className="service-div">
          <h6>Flight & Transport Booking</h6>
          <p>
            Book flights, trains, buses, and cabs effortlessly. Compare prices,
            check availability, and secure the best deals on all your travel
            options, ensuring a smooth and budget-friendly journey.
          </p>
        </div>
        <div className="service-div">
          <h6>Hotel & Stay Reservations</h6>
          <p>
            Find and book accommodations that fit your style and budget. From
            luxury hotels to budget stays and cozy homestays, we provide
            verified options for a comfortable stay at your destination.
          </p>
        </div>
        <div className="service-div">
          <h6>Exclusive Travel Deals</h6>
          <p>
            Unlock special discounts and offers on flights, hotels, and holiday
            packages. Our exclusive partnerships ensure you get the best rates
            and additional perks for your bookings.
          </p>
        </div>
        <div className="service-div">
          <h6>24/7 Travel Support</h6>
          <p>
            Need assistance? Our support team is available round the clock to
            help with itinerary changes, cancellations, and any travel
            emergencies, making your trip hassle-free.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
