import { useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { motion } from "framer-motion";
const CreateVoter = () => {
  const { token } = useAuth();

  const initialFormData = {
    gharNo: "",
    voterId: "",
    name: "",
    fatherName: "",
    age: "",
    address: "",
    gender: "Male",
    serialNumber: "",
    yadiSerial: "",
    amount: "",
    comment: "",
    updatedBy: "Admin",
    photo: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.gharNo.trim()) newErrors.gharNo = "Ghar No is required";
    if (!formData.voterId.trim()) newErrors.voterId = "Voter ID is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.fatherName.trim())
      newErrors.fatherName = "Father's Name is required";
    if (
      !formData.age ||
      isNaN(Number(formData.age)) ||
      Number(formData.age) <= 0
    )
      newErrors.age = "Valid age is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.serialNumber.trim())
      newErrors.serialNumber = "Serial Number is required";
    if (!formData.yadiSerial.trim())
      newErrors.yadiSerial = "Yadi Serial is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!validateForm()) return;

    try {
      const cleanData = {
        ...formData,
        age: Number(formData.age),
        amount: formData.amount ? Number(formData.amount) : 0,
      };

      const response = await axios.post(
        "https://voter-management-system.onrender.com/api/voters/create",
        cleanData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message);
      setFormData(initialFormData);
    } catch (err) {
      setError(err.response?.data?.message || "Voter creation failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center h-screen"
    >
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create Voter
        </h2>
        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid layout for input fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "gharNo", placeholder: "Ghar No" },
              { name: "voterId", placeholder: "Voter ID" },
              { name: "name", placeholder: "Name" },
              { name: "fatherName", placeholder: "Father's Name" },
              { name: "age", placeholder: "Age", type: "number" },
              { name: "address", placeholder: "Address" },
              { name: "serialNumber", placeholder: "Serial Number" },
              { name: "yadiSerial", placeholder: "Yadi Serial" },
              { name: "amount", placeholder: "Amount" },
              { name: "comment", placeholder: "Comment" },
            ].map(({ name, placeholder, type = "text" }) => (
              <div key={name} className="flex flex-col">
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  className="w-full p-2 border rounded"
                  value={formData[name]}
                  onChange={handleChange}
                  required={[
                    "gharNo",
                    "voterId",
                    "name",
                    "fatherName",
                    "age",
                    "address",
                    "serialNumber",
                    "yadiSerial",
                  ].includes(name)}
                />
                {errors[name] && <p className="text-red-500">{errors[name]}</p>}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="gender"
              className="w-full p-2 border rounded"
              value={formData.gender}
              onChange={handleChange}
            >
              {["Male", "Female", "Other"].map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>

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
            Create Voter
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateVoter;
