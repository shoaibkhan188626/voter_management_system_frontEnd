import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userName: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // Fixed typo in function name
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/signup",
        formData
      );
      setSuccess(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
      console.log(response);
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center h-screen bg-gray-100"
    >
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Admin Signup
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full p-2 border rounded"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full p-2 border rounded"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              name="phoneNumber"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="userName"
              placeholder="Username"
              className="w-full p-2 border rounded"
              value={formData.userName}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#2563eb",
                boxShadow: "0px 0px 8px rgba(37, 99, 235, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Signup
            </motion.button>
          </form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
