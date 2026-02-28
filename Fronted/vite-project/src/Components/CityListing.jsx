import React from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";

function CityListing({ listing, savedPosts, onSave }) {
  return (
    <div className="relative">
      <Link to={`/room/${listing._id}`}>
        <LazyLoadImage
          src={listing.images?.[0]}
          alt={listing.title}
          className="rounded-xl aspect-[7/6] object-cover"
        />
      </Link>

      {/* ❤️ Like */}
      <button
        onClick={() => onSave(listing._id)}
        className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow"
      >
        {savedPosts.includes(listing._id) ? (
          <FaHeart className="text-red-500" size={18} />
        ) : (
          <CiHeart size={18} />
        )}
      </button>

      <div className="pt-2">
        <p className="text-sm font-medium truncate">{listing.title}</p>
        <p className="text-gray-500 text-sm">
          ₹{listing.pricePerNight} / night
        </p>
      </div>
    </div>
  );
}

export default React.memo(CityListing);
