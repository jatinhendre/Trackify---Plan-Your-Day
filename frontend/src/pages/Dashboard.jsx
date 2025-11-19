import { useContext, useEffect, useState } from "react";
import axios from "../utils/axiosinstance";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          className="p-2 border rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border rounded w-full md:w-1/4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          name="title"
          placeholder="Task title"
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          name="description"
          placeholder="Task description"
          className="w-full p-2 border rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>

        <select
          className="p-2 border rounded w-full"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          {editingId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="p-4 bg-white rounded shadow flex justify-between"
          >
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
