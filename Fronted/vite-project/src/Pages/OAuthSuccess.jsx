import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Redux/authoSlice";

function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      // Save token (optional)
      localStorage.setItem("token", token);

      // 🔥 Fetch user profile
      fetch("http://localhost:3000/api/users/profile", {
        credentials: "include",
      })
        .then(res => res.json())
        .then(data => {
          dispatch(loginSuccess(data.user));
          navigate("/");
        });
    } else {
      navigate("/login");
    }
  }, []);

  return <div>Logging in...</div>;
}

export default OAuthSuccess;