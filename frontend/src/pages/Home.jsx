import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="font-poppins min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 
      dark:from-gray-800 dark:via-gray-900 dark:to-black p-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-lg bg-white/10 dark:bg-white/5 
        border border-white/20 shadow-xl p-10 rounded-2xl 
        flex flex-col items-center max-w-lg text-center"
      >
        <h1 className="text-5xl font-extrabold text-white drop-shadow-xl mb-4">
          Trackify
        </h1>

        <p className="text-white/80 dark:text-gray-300 text-lg mb-8 leading-relaxed">
          Stay organized. Increase productivity.
          Plan your day the smart way with Trackify.
        </p>

        <div className="flex gap-5 mt-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow 
            hover:bg-gray-200 transition transform hover:scale-105"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow 
            hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Signup
          </button>
        </div>
      </motion.div>
    </div>
  );
}
