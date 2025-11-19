import { useContext, useEffect, useState } from "react";
import axios from "../utils/axiosinstance";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

import TaskCard from "../components/Taskcard";
import TaskForm from "../components/Taskform";
import SearchBar from "../components/Searchbar";
import FilterDropdown from "../components/FilterDropdown";
import ThemeToggle from "../components/ThemeToggle";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  useContext(ThemeContext); // keep to ensure theme context is used

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium"
  });
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [profile, setProfile] = useState(null);

  const loadTasks = async () => {
    const res = await axios.get("/tasks");
    const updated = res.data.map((t) => ({
      ...t,
      priority: t.priority || "medium"
    }));
    setTasks(updated);
  };

  const loadProfile = async () => {
    const res = await axios.get("/user/me");
    setProfile(res.data);
  };

  useEffect(() => {
    loadTasks();
    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      ...form,
      description: `${form.description} | Priority: ${form.priority.toUpperCase()}`
    };

    if (editingId) {
      await axios.put(`/tasks/${editingId}`, taskData);
      setEditingId(null);
    } else {
      await axios.post("/tasks", taskData);
    }

    setForm({ title: "", description: "", priority: "medium" });
    loadTasks();
  };

  const handleEdit = (task) => {
    const extractedPriority =
      task.description.includes("Priority: HIGH")
        ? "high"
        : task.description.includes("Priority: LOW")
        ? "low"
        : "medium";

    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description.split("| Priority")[0].trim(),
      priority: extractedPriority
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/tasks/${id}`);
    loadTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "all" || task.description.toLowerCase().includes(filter);

    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">Trackify</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Plan your day, track tasks, and stay focused.
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <ThemeToggle />
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Card */}
        {profile && (
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold dark:text-white">
                Welcome, {profile.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {profile.email}
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              Logged in
            </span>
          </div>
        )}

        {/* Search + Filter */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-2/3">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <div className="w-full md:w-1/3">
            <FilterDropdown filter={filter} setFilter={setFilter} />
          </div>
        </div>

        {/* Task Form */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3 dark:text-white">
            {editingId ? "Edit Task" : "Add New Task"}
          </h3>
          <TaskForm
            form={form}
            setForm={setForm}
            editingId={editingId}
            handleSubmit={handleSubmit}
          />
        </div>

        {/* Task List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold dark:text-white">
            Your Tasks ({filteredTasks.length})
          </h3>
          {filteredTasks.length === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No tasks found. Start by adding one above.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
