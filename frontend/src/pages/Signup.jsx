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

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(form.password)) {
      alert(
        "Password must be 8+ characters and include uppercase, lowercase, number, and a special character."
      );
      return;
    }

    try {
      await axios.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthFormLayout title="Create your account">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
        Sign up once and access your tasks from anywhere.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1 text-left">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Name
          </label>
          <InputField
            name="name"
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1 text-left">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Email
          </label>
          <InputField
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1 text-left">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Password
          </label>
          <InputField
            name="password"
            type="password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={handleChange}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Must be at least 8 characters and include uppercase, lowercase,
            a number and a special character.
          </p>
        </div>

        <AuthButton label="Signup" />
      </form>

      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <span
          className="text-blue-600 dark:text-blue-400 cursor-pointer font-semibold"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </AuthFormLayout>
  );
}
