export default function FilterDropdown({ filter, setFilter }) {
  return (
    <select
      className="p-2 border rounded w-full md:w-1/4
                 bg-white text-black
                 dark:bg-gray-700 dark:border-gray-600 
                 dark:text-white"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="all">All Priorities</option>
      <option value="high">High Priority</option>
      <option value="medium">Medium Priority</option>
      <option value="low">Low Priority</option>
    </select>
  );
}
