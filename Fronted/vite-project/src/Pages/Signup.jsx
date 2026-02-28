import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const data = { name, email, password };

      const res = await axios.post(
        "http://localhost:3000/api/users/signup",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Signup successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup Error:", error);

      if (error.response) {
        alert(error.response.data.message || "Signup failed");
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
          Sign up
        </h2>

        <form onSubmit={(e)=>handleSubmit(e)} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fe395c]"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fe395c]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fe395c]"
          />

          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#fe395c] text-white py-3 rounded-xl font-medium hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="text-center text-sm mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#fe395c] font-medium cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
