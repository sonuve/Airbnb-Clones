import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav2 from "../Components/Nav2";
import { LazyLoadImage } from "react-lazy-load-image-component";

function HostBookingDetails() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/booking/bookings/${id}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          setBooking(res.data.booking);

          if (res.data.booking.images?.length > 0) {
            setMainImage(res.data.booking.images[0]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooking();
  }, [id]);

  if (!booking)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );

  return (
    <>
    <Nav2/>
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* TITLE */}
      <div>
        <h1 className="text-3xl font-bold">{booking.listingTitle}</h1>
        <p>
          📍 {booking.location?.address}, {booking.location?.city},
          {booking.location?.state}, {booking.location?.country}
        </p>
        <p className="text-sm text-gray-400">Booking ID: {booking._id}</p>
      </div>

      {/* IMAGES */}
    {/* IMAGES */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-3">

{/* MAIN LARGE IMAGE */}
<div className="md:col-span-2">
  {mainImage ? (
    <LazyLoadImage
      src={mainImage}
      alt="Hotel"
      className="w-full h-[450px] object-cover rounded-2xl shadow-md"
    />
  ) : (
    <div className="h-[450px] flex items-center justify-center bg-gray-100 rounded-2xl">
      No Images Available
    </div>
  )}
</div>

{/* SIDE IMAGES */}
<div className="grid grid-cols-2 gap-3 md:col-span-2">
  {booking.images?.slice(1, 5).map((img, index) => (
    <LazyLoadImage
      key={index}
      src={img}
      alt="Hotel"
      onClick={() => setMainImage(img)}
      className="h-[220px] w-full object-cover rounded-2xl cursor-pointer hover:opacity-80 transition"
    />
  ))}
</div>
</div>


      {/* DETAILS */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Guest Info</h2>
          <p>Name: {booking.guestName}</p>
          <p>Email: {booking.guestEmail}</p>
          <p>Phone: {booking.guestPhone}</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Booking Info</h2>
          <p>Check-in: {new Date(booking.checkIn).toDateString()}</p>
          <p>Check-out: {new Date(booking.checkOut).toDateString()}</p>
          <p className="text-green-600 font-bold">₹{booking.totalPrice}</p>
          <p>Status: {booking.paymentStatus}</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default HostBookingDetails;
