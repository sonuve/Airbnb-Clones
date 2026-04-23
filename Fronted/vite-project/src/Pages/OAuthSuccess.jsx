import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Redux/authoSlice";

const API_URL = import.meta.env.VITE_API_URL;

function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // ❌ DO NOT store token in localStorage (we use cookies)
    // localStorage.setItem("token", token);

    fetch(`${API_URL}/api/users/profile`, {
      method: "GET",
      credentials: "include", // ✅ IMPORTANT for cookies
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Authentication failed");
        }
        return res.json();
      })
      .then((data) => {
        if (!data.user) {
          throw new Error("User not found");
        }

        dispatch(loginSuccess(data.user));
        navigate("/");
      })
      .catch((err) => {
        console.error("OAuth error:", err);
        navigate("/login");
      });
  }, [dispatch, navigate, params]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Logging you in...</h2>
    </div>
  );
}

export default OAuthSuccess;