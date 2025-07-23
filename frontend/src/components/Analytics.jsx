import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Analytics() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .post(`${backendURL}/api/user/analytics`, {}, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.data); // Set users from backend
        } else {
          toast.error("Failed to load users.");
        }
      })
      .catch(() => {
        toast.error("Error fetching analytics.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">User Analytics</h1>

      {/* Center the button */}
      <div className="flex justify-center mb-6">
        <Link
          to="/"
          className="bg-slate-400 hover:bg-slate-500 text-black px-6 py-2 rounded-md"
        >
          Home
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-gray-300">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-400">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden text-sm md:text-base">
            <thead className="bg-blue-950 text-gray-100 uppercase text-sm tracking-wider">
              <tr>
                <th className="p-3 text-left">Sl.No</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="odd:bg-gray-700 even:bg-gray-800 hover:bg-gray-600 transition duration-200"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.contact}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
