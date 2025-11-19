import { useState } from "react";
import axios from "../utils/axiosinstance";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import AuthButton from "../components/AuthButton";
import AuthFormLayout from "../components/AuthForm";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!passwordRegex.test(form.password)) {
  alert(
    "Password must be 8+ chars and include uppercase, lowercase, number, and special character."
  );
  return;
}

      await axios.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthFormLayout title="Signup">
      <form onSubmit={handleSubmit} className="space-y-4">

        <InputField
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <InputField
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <InputField
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <AuthButton label="Signup" />
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </AuthFormLayout>
  );
}
