import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoNotificationsOutline, IoClose } from "react-icons/io5";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/authoSlice";
import { getSearchListings } from "../../Redux/Listing.js";
import { markAllAsRead } from "../../Redux/SocketSlic.js";

import Category from "./Category";
import NotificationListener from "./NotificationListener.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Nav() {
  const [showPOP, setShowPOP] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const popupRef = useRef();      // Ref for dropdown menu
  const notifyRef = useRef();     // Ref for notification dropdown

  const user = useSelector((state) => state.auth.user);
  const notifications = useSelector(
    (state) => state.socket.BookingDetails
  ) || [];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // ================= CLOSE ON OUTSIDE CLICK =================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPOP(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setShowNotify(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ================= SEARCH SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      toast.error("Please enter a search term");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/listing/search",
        { params: { title: trimmedSearch }, withCredentials: true }
      );

      const { success, listings } = response.data;

      if (!success) {
        toast.error("Search failed");
        return;
      }

      dispatch(getSearchListings(listings || []));
      navigate("/search/hotel");
      setShowMobileSearch(false);
      setSearch("");
      setSuggestions([]);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ================= LIVE SUGGESTIONS =================
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await axios.get(
          "http://localhost:3000/api/listing/search",
          { params: { title: search } }
        );
        if (res.data.success) {
          setSuggestions(res.data.listings.slice(0, 5));
        }
      } catch (err) {
        console.log(err);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  // ================= LOGOUT =================
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(logout());
        toast.success("Logout Successful");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full mb-20">
      {user && <NotificationListener />}

      {/* ================= NAVBAR ================= */}
      <div className="w-full h-20 border-b border-gray-200 px-4 md:px-6 flex items-center justify-between bg-white fixed top-0 left-0 z-50">
        {/* LOGO */}
        <Link to="/">
          <LazyLoadImage
            src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
            alt="Airbnb"
            className="w-24 md:w-32"
          />
        </Link>

        {/* DESKTOP SEARCH */}
        <form onSubmit={handleSubmit} className="hidden md:flex relative flex-col">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hotels..."
            className="w-[420px] h-[48px] border border-gray-300 rounded-full px-6 pr-14 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#fe395c]"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#fe395c] p-3 rounded-full text-white disabled:opacity-50"
          >
            {loading ? "..." : <FaSearch />}
          </button>

          {/* SUGGESTIONS DROPDOWN */}
          {suggestions.length > 0 && (
            <div className="absolute top-[55px] w-full bg-white shadow-lg rounded-xl max-h-60 overflow-y-auto z-50">
              {suggestions.map((item) => (
                <div
                  key={item._id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    navigate(`/room/${item._id}`);
                    setSearch("");
                    setSuggestions([]);
                  }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </form>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 relative">

          {/* MOBILE SEARCH ICON */}
          <button
            onClick={() => setShowMobileSearch(true)}
            className="md:hidden p-2 rounded-full hover:bg-gray-200"
          >
            <FaSearch size={18} />
          </button>

          {/* NOTIFICATION */}
          {user && (
            <div className="relative" ref={notifyRef}>
              <button
                onClick={() => {
                  setShowNotify(!showNotify);
                  setShowPOP(false);
                  if (!showNotify) dispatch(markAllAsRead());
                }}
                className="p-2 rounded-full hover:bg-gray-200"
              >
                <IoNotificationsOutline size={22} />
              </button>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                  {unreadCount}
                </span>
              )}

              {showNotify && (
                <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl z-50">
                  <div className="px-4 py-2 font-semibold border-b">
                    Notifications
                  </div>
                  {notifications.length === 0 ? (
                    <p className="p-4 text-sm text-gray-500 text-center">No notifications</p>
                  ) : (
                    notifications.map((n, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          navigate(`/host/booking/${n.bookingId}`);
                          setShowNotify(false);
                        }}
                        className={`cursor-pointer px-4 py-3 text-sm border-b hover:bg-gray-100 ${
                          !n.isRead ? "bg-gray-50 font-semibold" : ""
                        }`}
                      >
                        <p>{n.guestName} booked {n.listingTitle}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(n.checkIn).toLocaleDateString()} → {new Date(n.checkOut).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* HAMBURGER & POPUP */}
          <div className="relative">
            <div
              onClick={() => {
                setShowPOP(!showPOP);
                setShowNotify(false);
              }}
              className="flex items-center gap-3 border border-gray-300 rounded-full px-4 py-2 cursor-pointer"
            >
              <GiHamburgerMenu />
              {user ? (
                <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                  {user.name?.[0]?.toUpperCase()}
                </span>
              ) : (
                <CgProfile size={22} />
              )}
            </div>

            {showPOP && (
              <div
                ref={popupRef} // ref only on popup menu
                className="absolute top-full right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg z-50"
              >
                <ul className="py-3 text-sm text-center space-y-2">
                  {!user && (
                    <>
                      <Link to="/login"><li>Login</li></Link>
                      <Link to="/signup"><li>Signup</li></Link>
                    </>
                  )}
                  <Link to="/save"><li>Wishlist</li></Link>
                  <Link to="/my/listings"><li>My Listings</li></Link>
                  <Link to="/hotel/booking"><li>Check Booking</li></Link>
                  <li
                    className="cursor-pointer"
                    onClick={() => navigate("/create-listing")}
                  >
                    Add Listing
                  </li>
                  {user && (
                    <li
                      className="text-red-600 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MOBILE SEARCH ================= */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-white z-[60] p-4 md:hidden">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowMobileSearch(false)}>
                <IoClose size={24} />
              </button>
              <form onSubmit={handleSubmit} className="relative w-full flex-1">
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search hotels..."
                  className="w-full border border-gray-300 rounded-full pl-4 pr-12 py-2 focus:outline-none focus:ring-2 focus:ring-[#fe395c]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#fe395c] p-2 rounded-full text-white disabled:opacity-50"
                >
                  {loading ? "..." : <FaSearch size={14} />}
                </button>

                {/* MOBILE SUGGESTIONS */}
                {suggestions.length > 0 && (
                  <div className="absolute top-[45px] w-full bg-white shadow-lg rounded-xl max-h-60 overflow-y-auto z-50">
                    {suggestions.map((item) => (
                      <div
                        key={item._id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => {
                          navigate(`/room/${item._id}`);
                          setSearch("");
                          setSuggestions([]);
                          setShowMobileSearch(false);
                        }}
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY */}
      <div className="mt-20">
        <Category />
      </div>
    </div>
  );
}

export default Nav;
