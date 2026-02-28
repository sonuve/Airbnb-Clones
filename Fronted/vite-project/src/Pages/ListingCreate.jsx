import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addListing } from "../../Redux/Listing";
import { useNavigate } from "react-router-dom";
import Nav2 from "../Components/Nav2";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ListingCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
  });
  const [maxGuests, setMaxGuests] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [washrooms, setWashrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [beds, setBeds] = useState("");
  const [images, setImages] = useState([]);
  const imageRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = Array.from(e.target.files);
    setImages((prev) => [...prev, ...file]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("category", category);
      data.append("maxGuests",Number( maxGuests));
      data.append("pricePerNight", Number(pricePerNight));
      data.append("address", location.address);
      data.append("city", location.city);
      data.append("state", location.state);
      data.append("country", location.country);
      data.append("washrooms",Number( washrooms));
      data.append("bedrooms",Number( bedrooms));
      data.append("beds",Number( beds));

      images.forEach((image) => {
        data.append("images", image);
      });

      const res = await axios.post(
        "http://localhost:3000/api/listing/add/listing",
        data,
        {
          headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(addListing(res.data.listing));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Nav2 />

      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Create New Listing</h2>

            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
            >
              ← Back
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* BASIC INFO */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">
                Basic Information
              </h3>

              <input
                placeholder="Listing Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-rose-400 outline-none"
                required
              />

              <textarea
                placeholder="Description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-rose-400 outline-none"
                required
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-rose-400 outline-none"
                required
              >
                <option value="">Select Category</option>
                <option>Villa</option>
                <option>Room</option>
                <option>PG</option>
                <option>Flat</option>
                <option>Farm House</option>
                <option>Cabin</option>
              </select>
            </div>

            {/* LOCATION */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">
                Location
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {["address", "city", "state", "country"].map((field) => (
                  <input
                  required
                    key={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={location[field]}
                    onChange={(e) =>
                      setLocation({ ...location, [field]: e.target.value })
                    }
                    className="border rounded-xl p-3 focus:ring-2 focus:ring-rose-400 outline-none"
                  />
                ))}
              </div>
            </div>

            {/* PROPERTY DETAILS */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">
                Property Details
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Max Guests"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  className="border rounded-xl p-3 focus:ring-2 focus:ring-rose-400 outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="Price Per Night ₹"
                  value={pricePerNight}
                  onChange={(e) => setPricePerNight(e.target.value)}
                  className="border rounded-xl p-3 focus:ring-2 focus:ring-rose-400 outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="Bedrooms"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="border rounded-xl p-3 focus:ring-2 focus:ring-rose-400 outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="Beds"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  className="border rounded-xl p-3 focus:ring-2 focus:ring-rose-400 outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="Washrooms"
                  value={washrooms}
                  onChange={(e) => setWashrooms(e.target.value)}
                  className="border rounded-xl p-3 focus:ring-2 focus:ring-rose-400 outline-none"
                  required
                />
              </div>
            </div>

            {/* IMAGE SECTION */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2">
                Upload Images
              </h3>

              <input
                hidden
                ref={imageRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />

              <div
                onClick={() => imageRef.current.click()}
                className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center cursor-pointer hover:border-rose-400 transition"
              >
                Click to Upload Images
              </div>

              {/* Preview */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {images.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative h-28 rounded-xl overflow-hidden shadow"
                  >
                    <LazyLoadImage
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full px-2 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-2xl font-semibold text-lg transition"
            >
              Publish Listing
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default ListingCreate;
