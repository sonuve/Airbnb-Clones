import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { setSavedPosts } from "../../Redux/withList.js";
import CityListing from "./CityListing.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ListingsComponent() {
  const dispatch = useDispatch();

  const listings = useSelector((state) => state.listing.listings);
  const filterListings = useSelector((state) => state.listing.filterListings);
  const savedPosts = useSelector((state) => state.withList.savedPosts);
  const cityRows = useSelector((state) => state.city.citys);

  const displayListing = filterListings.length > 0 ? filterListings : listings;

  // Save / Unsave
  const handleSave = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/users/save/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setSavedPosts(res.data.savedPosts));
        toast.success(res.data.message);
      }
    } catch {
      toast.error("Please login first");
    }
  };

  return (
    <div className="bg-white py-6">
      {/* ===== HEADING ===== */}
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
          Most Trending Hotels
        </h1>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="scrollBar  overflow-x-auto scrollbar-hide">
        <div
          className="
      max-w-7xl mx-auto px-4
      grid grid-flow-col
      auto-cols-[160px]
      sm:auto-cols-[180px]
      md:auto-cols-[200px]
      lg:auto-cols-[220px]
      xl:auto-cols-[240px]
      gap-4
      scroll-smooth
    "
        >
          {displayListing.map((item) => (
            <div
              key={item?._id}
              className="relative group transition-transform hover:-translate-y-1"
            >
              <Link to={`/room/${item?._id}`}>
                <LazyLoadImage
                  src={item?.images?.[0]}
                  alt={item?.title}
                  className="rounded-xl aspect-[7/6] object-cover"
                />
              </Link>

              {/* ❤️ Like */}
              <button
                onClick={() => handleSave(item?._id)}
                className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow"
              >
                {savedPosts.includes(item?._id) ? (
                  <FaHeart className="text-red-500" size={18} />
                ) : (
                  <CiHeart size={18} />
                )}
              </button>

              <div className="pt-2">
                <p className="text-sm font-medium truncate">{item?.title}</p>
                <p className="text-gray-500 text-sm">
                  ₹{item?.pricePerNight} / night
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CITY WISE ROWS ================= */}
      <div className="mt-10 space-y-12">
        {cityRows.map((row, index) => (
          <section key={index}>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 px-4 max-w-7xl mx-auto">
              {row.title}
            </h2>

            {/*  X-AXIS SCROLL WRAPPER */}
            <div className=" overflow-x-auto scrollbar-hide">
              <div
                className="
            max-w-7xl mx-auto px-4
            grid grid-flow-col
            auto-cols-[160px]
            sm:auto-cols-[180px]
            md:auto-cols-[200px]
            lg:auto-cols-[220px]
            xl:auto-cols-[240px]
            gap-4
            scroll-smooth
          "
              >
                {row.listings.map((listing) => (
                  <CityListing
                    key={listing._id}
                    listing={listing}
                    savedPosts={savedPosts}
                    onSave={handleSave}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default ListingsComponent;
