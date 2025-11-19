export default function AuthButton({ label }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    >
      {label}
    </button>
  );
}
