import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import Nav2 from './Nav2';
import { setSavedPosts } from "../../Redux/withList.js";


function SearchPages() {
  const dispatch = useDispatch();

  const searchData =
    useSelector((state) => state.listing.searchListings) || [];

  const savedPosts =
    useSelector((state) => state.withList.savedPosts) || [];

  const loading =
    useSelector((state) => state.listing.loading); // 👈 add loading in redux if possible

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
    } catch (error) {
      toast.error("Please login first");
    }
  };

  return (
    <>
      <Nav2 />

      <div className="bg-white min-h-screen py-10 px-4 mt-20">

        {/* ✅ LOADING STATE */}
        {loading && (
          <div className="text-center text-lg text-gray-500">
            Loading hotels...
          </div>
        )}

        {/* ✅ NO DATA FOUND */}
        {!loading && searchData.length === 0 && (
          <div className="text-center text-gray-500 text-lg">
            No hotels found
          </div>
        )}

        {/* ✅ RESULTS */}
        {!loading && searchData.length > 0 && (
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {searchData.map((item) => (
              <div key={item?._id} className="relative">
                <Link to={`/room/${item?._id}`}>
                  <img
                    src={item?.images?.[0]}
                    alt={item?.title}
                    className="rounded-xl aspect-[7/6] object-cover"
                  />
                </Link>

                {/* ❤️ Like Button */}
                <button
                  onClick={() => handleSave(item?._id)}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                >
                  {savedPosts.includes(item?._id) ? (
                    <FaHeart className="text-red-500" size={22} />
                  ) : (
                    <CiHeart size={22} />
                  )}
                </button>

                <div className="pt-2">
                  <p className="text-sm font-medium truncate">
                    {item?.title}
                  </p>
                  <p className="text-gray-500 text-sm">
                    ₹{item?.pricePerNight} / night
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}


export default SearchPages