import axios from "axios";
import { useEffect } from "react";
import { setBooking } from "../../Redux/Booking";

useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const orderId = params.get("order_id");
  
      if (!orderId) return;
  
      await axios.get(
        `http://localhost:3000/api/payment/verify/${orderId}`
      );
  
      const bookingRes = await axios.get(
        "http://localhost:3000/api/booking/my",
        { withCredentials: true }
      );
  
      dispatch(setBooking(bookingRes.data.bookings));
    };
  
    verifyPayment();
  }, []);