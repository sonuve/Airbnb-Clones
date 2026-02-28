import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Redux/authoSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      const data = { email, password }; // ✅ FIXED

      const res = await axios.post(
        "http://localhost:3000/api/users/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {

        dispatch(loginSuccess(res.data.user));
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fe395c]"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#fe395c]"
            />

            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={()=>setShow(!show)}>
                {show ? <IoIosEyeOff size={20} /> : <IoMdEye size={20} />}
              
              
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#fe395c] text-white py-3 rounded-xl font-medium hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-5">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#fe395c] font-medium cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
