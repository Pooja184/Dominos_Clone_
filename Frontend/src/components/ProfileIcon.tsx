import  { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logoutUser } from "../redux/features/authSlice";
import type { RootState } from "../redux/store/store";
import { useNavigate } from "react-router-dom";
import api from "../axios/axiosInstance";

const ProfileMenu = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
console.log(user,"user",isAuthenticated)
  // fetch user once on FIRST hover
  const fetchUser = async () => {
    if (loaded) return;
    try {
      const res = await api.get("/auth/me", {
        withCredentials: true,
      });
      dispatch(loginSuccess(res.data.user));
    } catch (err) {
      dispatch(logoutUser());
    }
    setLoaded(true);
  };

  const handleLogout = async () => {
    await api.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    );
    dispatch(logoutUser());
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      className="relative group"
      onMouseEnter={fetchUser} /* only fetch data once */
    >
      {/* Profile Icon */}
      <IoPersonCircle className="text-3xl cursor-pointer text-gray-700 hover:text-accent transition" />

      {/* Dropdown */}
      <div
        className="
          absolute right-0 mt-3 w-44 bg-white rounded-md shadow-md 
          py-3 px-4 text-gray-700 z-50
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transition-all duration-300
        "
      >
        {/* If logged in */}
        {isAuthenticated && user ? (
          <>
            <p className="mb-2 font-semibold">Hii, {user.name}</p>

            <p
              onClick={() => navigate("/profile")}
              className="cursor-pointer hover:text-accent mb-2"
            >
              My Profile
            </p>

            <p
              onClick={handleLogout}
              className="cursor-pointer hover:text-accent text-red-500"
            >
              Logout
            </p>
          </>
        ) : (
          // If NOT logged in
          <>
            <p
              onClick={() => navigate("/login")}
              className="cursor-pointer hover:text-accent mb-2"
            >
              Sign In / Sign Up (User)
            </p>
            <p
              onClick={() => navigate("/adminlogin")}
              className="cursor-pointer hover:text-accent"
            >
              Login as Admin
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
