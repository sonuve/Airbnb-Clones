import React, { useEffect, useCallback, useMemo, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setBooking } from "../../Redux/Booking";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
const API_URL = import.meta.env.VITE_API_URL;
const Nav2 = React.lazy(() => import("../Components/Nav2.jsx"));

function Booking() {
  const dispatch = useDispatch();
  const bookedHotel = useSelector((state) => state.Booking.Bookings);
  const safeBookings = useMemo(() => Array.isArray(bookedHotel) ? bookedHotel : [], [bookedHotel]);

  // Dropdown state per booking
  const [openMenuId, setOpenMenuId] = useState(null);

  // ================= FETCH BOOKINGS =================
  const fetchMyBookings = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/booking/my`, { withCredentials: true });
      if (res.data.success) dispatch(setBooking(res.data.bookings));
    } catch (error) {
      toast.error("Failed to fetch bookings");
    }
  }, [dispatch]);

  // ================= CANCEL BOOKING =================
  const cancelBooking = useCallback(async (bookingId) => {
    try {
      await axios.put(`${API_URL}/api/booking/${bookingId}`, {}, { withCredentials: true });
      toast.success("Booking cancelled successfully");
      fetchMyBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancel failed");
    }
  }, [fetchMyBookings]);

  // ================= DELETE BOOKING =================
  const deleteBooking = useCallback(async (bookingId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) return;
    try {
      const res = await axios.delete(`${API_URL}/api/booking/delete/${bookingId}`, { withCredentials: true });
      if (res.data.success) {
        toast.success("Booking deleted");
        fetchMyBookings();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  }, [fetchMyBookings]);

  useEffect(() => { fetchMyBookings(); }, [fetchMyBookings]);

  if (safeBookings.length === 0) return (
    <>
      <Suspense fallback={<div>Loading...</div>}><Nav2 /></Suspense>
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        No bookings found
      </div>
    </>
  );

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}><Nav2 /></Suspense>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Your Bookings</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeBookings.map((booking) => {
              const showCancel = booking.status === "reserved" || booking.status === "paid";

              return (
                <div key={booking._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col relative">

                  {/* IMAGE */}
                  <Link to={`/room/${booking.listing?._id}`} className="relative group">
                    <div className="w-full aspect-[4/3] overflow-hidden">
                      <LazyLoadImage
                        src={booking.listing?.images?.[0] || "/default-room.jpg"}
                        alt={booking.listing?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => (e.target.src = "/default-room.jpg")}
                      />
                    </div>
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold rounded-full shadow">
                      {booking.status}
                    </div>
                  </Link>

                  {/* THREE DOT MENU */}
                  <div className="absolute top-3 right-3">
                    <button
                      className="text-gray-500 text-xl px-2 py-1 hover:text-gray-800"
                      onClick={() => setOpenMenuId(openMenuId === booking._id ? null : booking._id)}
                    >
                      ⋮
                    </button>

                    {openMenuId === booking._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10 flex flex-col">
                        {showCancel && (
                          <button
                            onClick={() => { cancelBooking(booking._id); setOpenMenuId(null); }}
                            className="text-left px-4 py-2 text-sm hover:bg-red-100"
                          >
                            Cancel Booking
                          </button>
                        )}
                        <button
                          onClick={() => { deleteBooking(booking._id); setOpenMenuId(null); }}
                          className="text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                        >
                          Delete Booking
                        </button>
                      </div>
                    )}
                  </div>

                  {/* DETAILS */}
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="font-semibold text-lg mb-1">{booking.listing?.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">📍 {booking.listing?.location?.city}</p>

                    <div className="text-sm text-gray-600 mb-3">
                      <p>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                      <p>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                    </div>

                    <p className="text-lg font-bold text-rose-500 mb-3">₹{booking.totalPrice}</p>
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

export default React.memo(Booking);
