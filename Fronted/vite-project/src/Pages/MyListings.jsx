import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteListing, getUserListings } from "../../Redux/Listing";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Nav2 from "../Components/Nav2";
import { LazyLoadImage } from "react-lazy-load-image-component";

function MyListings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userListings = useSelector((state) => state.listing.userListing) || [];

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/listing/my/listings",
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(getUserListings(res.data.listings));
        }
      } catch (error) {
        console.error("Failed to fetch listings", error);
      }
    };

    fetchListings();
  }, [dispatch]);

  if (userListings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        You have not added any listings yet
      </div>
    );
  }

  const handleDelete = async (listingId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/listing/delete/${listingId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(deleteListing(listingId));
        toast.success("Listing deleted successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Error in Delete function", error);
      toast.error("Failed to delete listing");
    }
  };

  return (
    <>
    <Nav2/>
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">My Listings</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userListings.map((listing) => (
            <div
              key={listing?._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Image */}
              <Link to={`/room/${listing?._id}`}>
                <LazyLoadImage
                  src={listing?.images?.[0]}
                  
                  alt={listing?.title}
                  className="h-52 w-full object-cover"
                />
              </Link>

              {/* Content */}
              <div className="p-4">
                <h2 className="font-semibold text-lg truncate">
                  {listing?.title}
                </h2>

                <p className="text-sm text-gray-500">
                  {listing?.location?.city}, {listing?.location?.state}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-rose-500 font-semibold">
                    ₹{listing?.pricePerNight} / night
                  </span>

                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
                    Active
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4">
                  <Link
                    to={`/edit-listing/${listing?._id}`}
                    className="flex-1 text-center border border-gray-300 text-sm py-2 rounded-lg hover:bg-gray-100"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={()=>handleDelete(listing?._id)}
                    className="flex-1 text-sm py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default MyListings;
