import { useContext, useState } from "react";
import axios from "../utils/axiosinstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import InputField from "../components/InputField";
import AuthButton from "../components/AuthButton";
import AuthFormLayout from "../components/AuthForm";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", form);
      login(res.data.token);

      setTimeout(() => navigate("/dashboard"), 100);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthFormLayout title="Login">
      <form onSubmit={handleSubmit} className="space-y-4">

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

        <AuthButton label="Login" />
      </form>

      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </p>
    </AuthFormLayout>
  );
}
