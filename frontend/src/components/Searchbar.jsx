export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      className="p-2 border rounded w-full md:w-1/2 
                 bg-white text-black 
                 dark:bg-gray-700 dark:border-gray-600 
                 dark:text-white placeholder-gray-400"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
