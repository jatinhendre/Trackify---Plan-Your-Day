export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 dark:text-white 
                    rounded shadow flex justify-between">
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p>{task.description}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-500 text-white px-3 py-1 rounded 
                     dark:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-600 text-white px-3 py-1 rounded
                     dark:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
