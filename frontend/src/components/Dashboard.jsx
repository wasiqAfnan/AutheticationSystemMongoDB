import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Auth check function (outside useEffect)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post(
          `${backendURL}/api/user/profile`,
          {},
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setUsername(res.data.data.name); // Based on your backend response
        } else {
          toast.error("Unauthorized access");
          navigate("/");
        }
      } catch (error) {
        toast.error("Please login first");
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

 const handleLogout = async () => {
    // localStorage.removeItem("name"); // clear session
    // localStorage.removeItem("email");
    try {
      await axios.post(
        `${backendURL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("Logged out ✅");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header with logout */}
      <div className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Welcome Message */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-2">Welcome, {username} 👋</h2>
        <p className="text-gray-400">You have successfully logged in.</p>
      </div>
    </div>
  );
}
