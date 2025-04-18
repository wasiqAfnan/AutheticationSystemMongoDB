import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUsername(storedName);
    } else {
      // No user? Redirect to login
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("name"); // clear session
    localStorage.removeItem("email")
    navigate("/");
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
