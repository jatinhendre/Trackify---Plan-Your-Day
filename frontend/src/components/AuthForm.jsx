export default function AuthFormLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
}
