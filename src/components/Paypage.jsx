import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import paymentImage from "./image.png"; // Import the image

function Paypage() {
  const location = useLocation();
  const cost = location.state?.cost; // Access the cost parameter
  const [isHovered, setIsHovered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("creditCard"); // Default payment method
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending"); // 'pending', 'success', 'failed'

  const handlePayment = () => {
    setPaymentStatus("processing"); // Indicate payment processing

    // Simulate payment processing delay (replace with actual payment gateway integration)
    setTimeout(() => {
      // In a real application, you would integrate with a payment gateway here
      // and check for transaction success/failure.
      // For this example, we'll just simulate success after a delay.

      // **Basic Validation (Client-side - for demonstration only, server-side validation is crucial in real apps)**
      if (!cardNumber || !expiry || !cvv) {
        setPaymentStatus("failed");
        alert("Please fill in all payment details."); // Basic error message
        return;
      }

      // Simulate successful payment
      setPaymentStatus("success");
    }, 2000); // 2 seconds processing time
  };

  let paymentMessage;
  if (paymentStatus === "success") {
    paymentMessage = (
      <p className="text-green-500 font-semibold">Payment Successful!</p>
    );
  } else if (paymentStatus === "failed") {
    paymentMessage = (
      <p className="text-red-500 font-semibold">
        Payment Failed. Please check details and try again.
      </p>
    );
  } else if (paymentStatus === "processing") {
    paymentMessage = (
      <p className="text-blue-500 font-semibold">Processing Payment...</p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {" "}
          {/* Changed items-center to items-start */}
          {/* Payment Form Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Payment Details
            </h1>
            {cost !== undefined ? (
              <p className="text-gray-700 text-lg">
                Total Cost:{" "}
                <span className="font-semibold text-indigo-700">₹ {cost}</span>
              </p>
            ) : (
              <p className="text-red-600">Cost information not available.</p>
            )}
            {paymentMessage} {/* Display payment status message */}
            {paymentStatus !== "success" && ( // Show payment form only if payment is not successful
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="paymentMethod"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="creditCard">Credit Card</option>
                    <option value="debitCard">Debit Card</option>
                    {/* Add more payment methods as needed */}
                  </select>
                </div>
                {paymentMethod === "creditCard" ||
                paymentMethod === "debitCard" ? ( // Show card details for card payments
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Card Number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="cardNumber"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter card number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="expiry"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiry Date (MM/YY)
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="expiry"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVV
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="cvv"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="CVV"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}{" "}
                {/* Conditionally render other payment method forms here if needed */}
                <button
                  onClick={handlePayment}
                  className="group flex items-center justify-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                  disabled={paymentStatus === "processing"} // Disable button during processing
                >
                  <span>
                    {paymentStatus === "processing"
                      ? "Processing..."
                      : "Pay Now"}
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            )}
          </div>
          {/* Decorative Image Section - Moved to the right */}
          <div
            className="relative aspect-square rounded-2xl overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={`
              absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20
              transition-opacity duration-500
              ${isHovered ? "opacity-100" : "opacity-0"}
            `}
            />

            <div
              className={`
              relative w-full h-full transform transition-all duration-700
              ${isHovered ? "scale-105" : "scale-100"}
            `}
            >
              <img
                src={paymentImage} // Use the imported image variable here
                alt="Secure Payment"
                className="w-full h-full object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500"
              />

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full opacity-50 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-200 rounded-full opacity-50 blur-2xl" />

              {/* Hover Overlay Content */}
              <div
                className={`
                absolute inset-0 flex items-center justify-center
                bg-gradient-to-br from-indigo-600/80 to-purple-600/80
                transition-opacity duration-500 rounded-2xl
                ${isHovered ? "opacity-100" : "opacity-0"}
              `}
              >
                <div className="text-white text-center p-6 transform transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-2">Secure Payment</h3>
                  <p className="text-white/90">
                    Your payment is processed securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paypage;
