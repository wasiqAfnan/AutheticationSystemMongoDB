import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const user = sessionStorage.getItem("name");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const backendURL = import.meta.env.VITE_BACKEND_URL_LOCAL;

    axios
      .post(
        `${backendURL}/api/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true, // allow cookie to be set
        }
      )
      .then((response) => {
        sessionStorage.setItem("name", response.data.data.name);
        sessionStorage.setItem("email", response.data.data.email);
        toast.success("Login successful ✅"); 
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        const msg = err.response?.data?.message || "Login failed ❌";
        toast.error(msg);
      })
      .then(() => {
        // This `.then()` will execute after both success or error
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

        <div className="mb-4">
          <label className="block text-md font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-md font-medium mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 rounded-md transition duration-200`}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Login"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-300">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
