import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setBooking } from "../../Redux/Booking";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Nav2 from "../Components/Nav2";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Booking() {
  const dispatch = useDispatch();
  const bookedHoteal = useSelector((state) => state.Booking.Bookings);
  const safeBookings = Array.isArray(bookedHoteal) ? bookedHoteal : [];

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/booking/my",
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setBooking(res.data.bookings));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch bookings");
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/booking/${bookingId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Booking cancelled successfully");
      fetchMyBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancel failed");
    }
  };

  if (safeBookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        No bookings found
      </div>
    );
  }

  return (
    <>
      <Nav2 />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Your Bookings
          </h1>

          {/* RESPONSIVE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeBookings.map((booking) => {
              const showCancel =
                booking.status === "reserved" ||
                booking.status === "paid";

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
                >
                  {/* IMAGE */}
                  <Link
                    to={`/room/${booking.listing?._id}`}
                    className="relative group"
                  >
                    <div className="w-full aspect-[4/3] overflow-hidden">
                      <LazyLoadImage
                        src={
                          booking.listing?.images?.[0] ||
                          "/default-room.jpg"
                        }
                        alt={booking.listing?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) =>
                          (e.target.src = "/default-room.jpg")
                        }
                      />
                    </div>

                    {/* STATUS BADGE */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold rounded-full shadow">
                      {booking.status}
                    </div>
                  </Link>

                  {/* DETAILS */}
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-semibold text-lg mb-1">
                      {booking.listing?.title}
                    </h2>

                    <p className="text-sm text-gray-500 mb-2">
                      📍 {booking.listing?.location?.city}
                    </p>

                    <div className="text-sm text-gray-600 mb-3">
                      <p>
                        Check-in:{" "}
                        {new Date(
                          booking.checkIn
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        Check-out:{" "}
                        {new Date(
                          booking.checkOut
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <p className="text-lg font-bold text-rose-500 mb-3">
                      ₹{booking.totalPrice}
                    </p>

                    {showCancel && (
                      <button
                        onClick={() =>
                          cancelBooking(booking._id)
                        }
                        className="mt-auto py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;
