// PaymentSuccess.jsx
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Payments() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(location.search);
      const orderId = params.get("order_id");
  
      if (orderId) {
        await axios.get(
          `http://localhost:3000/api/payment/verify/${orderId}`,
          { withCredentials: true }
        );
      }
  
      navigate("/hotel/booking");
    };
  
    verify();
  }, []);
  

  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-semibold">Payment Successful!</h1>
      <p className="text-gray-500 mt-2">Redirecting to your bookings...</p>
    </div>
  );
}

export default Payments;
