import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
          Welcome to 
          <span className="text-blue-600 dark:text-blue-400"> Trackify</span>
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
          Plan smarter. Stay organized. Track your tasks with a clean and powerful dashboard.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-all"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 bg-white dark:bg-gray-800 dark:text-white text-gray-800 
            border border-gray-300 dark:border-gray-600 font-medium rounded-lg shadow 
            hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            Signup
          </button>
        </div>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          Track your habits. Improve your workflow. Transform your day.
        </p>
      </div>
    </div>
  );
}
