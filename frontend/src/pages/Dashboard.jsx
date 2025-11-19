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
useContext(ThemeContext);


  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium"
  });
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const loadTasks = async () => {
    const res = await axios.get("/tasks");
    const updated = res.data.map((t) => ({
      ...t,
      priority: t.priority || "medium"
    }));
    setTasks(updated);
  };

  useEffect(() => {
    loadTasks();
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
   
  const [profile, setProfile] = useState(null);

const loadProfile = async () => {
  const res = await axios.get("/user/me");
  setProfile(res.data);
};

useEffect(() => {
  loadProfile();
}, []);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Trackify</h1>

        <div className="flex gap-3">
          <ThemeToggle />

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    {profile && (
  <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded shadow">
    <h2 className="text-xl font-semibold dark:text-white">Welcome, {profile.name}</h2>
    <p className="dark:text-gray-300">{profile.email}</p>
  </div>
)}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar search={search} setSearch={setSearch} />
        <FilterDropdown filter={filter} setFilter={setFilter} />
      </div>

      <TaskForm
        form={form}
        setForm={setForm}
        editingId={editingId}
        handleSubmit={handleSubmit}
      />

      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

    </div>
  );
}
