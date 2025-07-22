import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL_LOCAL;

  // Auth check function (outside useEffect)

  useEffect(() => {
    const checkAuth = () => {
      axios
        .post(
          `${backendURL}/api/user/profile`,
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setUsername(res.data.data.name); // Based on your backend response
          setRole(res.data.data.role);
          console.log("Role: ", role);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response?.data?.message || "Login failed ❌");
          navigate("/");
        });
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    sessionStorage.removeItem("name"); // clear session
    sessionStorage.removeItem("email");
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

        <div className="flex items-center gap-4">
          {role === "ADMIN" && (
            <button
              onClick={() => navigate("/analytics")}
              className="bg-slate-700 hover:bg-slate-500 text-white px-4 py-2 rounded-xl"
            >
              Analytics
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-2">Welcome, {username} 👋</h2>
        <p className="text-gray-400">You have successfully logged in.</p>
      </div>
    </div>
  );
}
