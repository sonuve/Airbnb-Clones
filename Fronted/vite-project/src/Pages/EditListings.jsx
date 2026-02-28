import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { updateListing } from "../../Redux/Listing";
import { LazyLoadImage } from "react-lazy-load-image-component";

function EditListings() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageRef = useRef(null);

  const userListings =
    useSelector((state) => state.listing.userListing) || [];
  const listing = userListings.find((l) => l._id === id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pricePerNight: "",
    city: "",
    state: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Prefill Data
  useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title || "",
        description: listing.description || "",
        pricePerNight: listing.pricePerNight || "",
        city: listing.location?.city || "",
        state: listing.location?.state || "",
      });

      setExistingImages(listing.images || []);
    }
  }, [listing]);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Listing not found
      </div>
    );
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (img) => {
    setExistingImages((prev) => prev.filter((i) => i !== img));
  };

  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("pricePerNight", formData.pricePerNight);
      data.append("city", formData.city);
      data.append("state", formData.state);

      existingImages.forEach((img) => {
        data.append("existingImages", img);
      });

      newImages.forEach((file) => {
        data.append("images", file);
      });

      const res = await axios.put(
        `http://localhost:3000/api/listing/update/listing/${id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(updateListing(res.data.listing));
        toast.success("Listing updated successfully");
        navigate(`/room/${id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Edit Listing
        </h1>
        <p className="text-gray-500 mb-8">
          Update your property details and manage images easily.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Luxury Mountain View Apartment"
              className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your property..."
              className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
            />
          </div>

          {/* Price + Location */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price per Night (₹)
              </label>
              <input
                type="number"
                name="pricePerNight"
                value={formData.pricePerNight}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Property Images
            </h3>

            <input
              type="file"
              multiple
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

              {existingImages.map((img, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden shadow-md">
                  <LazyLoadImage
                    src={img}
                    className="w-full h-40 object-cover transition group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img)}
                    className="absolute top-2 right-2 bg-black/70 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {newImages.map((file, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden shadow-md">
                  <LazyLoadImage
                    src={URL.createObjectURL(file)}
                   
                    className="w-full h-40 object-cover transition group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewImage(idx)}
                    className="absolute top-2 right-2 bg-black/70 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <div
                onClick={() => imageRef.current.click()}
                className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition"
              >
                <span className="text-3xl text-gray-400">＋</span>
                <span className="text-sm text-gray-500 mt-2">
                  Add Images
                </span>
              </div>

            </div>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold text-white text-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-rose-500 hover:bg-rose-600 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? "Updating..." : "Update Listing"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditListings;
