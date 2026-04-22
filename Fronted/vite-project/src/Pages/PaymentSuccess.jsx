import axios from "axios";
import { useEffect } from "react";
import { setBooking } from "../../Redux/Booking";
const API_URL = import.meta.env.VITE_API_URL;
useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const orderId = params.get("order_id");
  
      if (!orderId) return;
  
      await axios.get(
        `${API_URL}/api/payment/verify/${orderId}`,
        { withCredentials: true }
      );
  
      const bookingRes = await axios.get(
        `${API_URL}/api/booking/my`,
        { withCredentials: true }
      );
  
      dispatch(setBooking(bookingRes.data.bookings));
    };
  
    verifyPayment();
  }, []);
