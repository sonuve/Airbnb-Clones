import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav2 from "../Components/Nav2";
import { LazyLoadImage } from "react-lazy-load-image-component";

function WithList() {
  const listings = useSelector((state) => state.listing.listings);
  const savedPosts = useSelector((state) => state.withList.savedPosts);

  const withListListings = listings.filter((listing) =>
    savedPosts.includes(listing._id)
  );

  return (
    <>
    <Nav2/>
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">❤️ Your Wishlist</h1>

      {withListListings.length === 0 ? (
        <p className="text-gray-500">No saved listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {withListListings.map((item) => (
            <Link
              key={item._id}
              to={`/room/${item._id}`}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              {/* Images Box */}
              <div className="relative overflow-x-auto flex snap-x snap-mandatory rounded-t-xl">
                {item.images?.map((img, i) => (
                  <LazyLoadImage
                    key={i}
                    
                    src={img}
                    alt="listing"
                    className="w-full h-48 object-cover flex-shrink-0 snap-center"
                  />
                ))}
              </div>

              {/* Content */}
              <div className="p-4 space-y-1">
                <p className="font-medium truncate">{item.title}</p>

                <p className="text-sm text-gray-500">
                  {item.location?.city}, {item.location?.country}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">₹{item.pricePerNight}</span>{" "}
                  <span className="text-gray-500">/ night</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default WithList;
