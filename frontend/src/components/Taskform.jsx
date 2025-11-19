export default function TaskForm({
  form,
  setForm,
  editingId,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <input
  name="title"
  placeholder="Task title"
  className="w-full p-2 border rounded
             bg-white text-black
             dark:bg-gray-700 dark:border-gray-600 
             dark:text-white placeholder-gray-400"
  value={form.title}
  onChange={(e) => setForm({ ...form, title: e.target.value })}
  required
/>

<textarea
  name="description"
  placeholder="Task description"
  className="w-full p-2 border rounded
             bg-white text-black
             dark:bg-gray-700 dark:border-gray-600 
             dark:text-white placeholder-gray-400"
  value={form.description}
  onChange={(e) => setForm({ ...form, description: e.target.value })}
></textarea>

<select
  className="p-2 border rounded w-full
             bg-white text-black
             dark:bg-gray-700 dark:border-gray-600 
             dark:text-white"
  value={form.priority}
  onChange={(e) => setForm({ ...form, priority: e.target.value })}
>
  <option value="high">High Priority</option>
  <option value="medium">Medium Priority</option>
  <option value="low">Low Priority</option>
</select>

<button className="bg-blue-600 text-white px-6 py-2 rounded
                   dark:bg-blue-500 dark:hover:bg-blue-400">
  {editingId ? "Update Task" : "Add Task"}
</button>

    </form>
  );
}
