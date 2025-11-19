import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold dark:text-white mb-4">Welcome to Trackify</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-center max-w-md">
        A simple and fast task manager to plan your day effectively.
      </p>

      <div className="flex gap-4">
        <button 
          onClick={() => navigate("/login")} 
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
        <button 
          onClick={() => navigate("/signup")} 
          className="px-6 py-2 bg-green-600 text-white rounded"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
