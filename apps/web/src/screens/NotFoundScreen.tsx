import { useNavigate } from "react-router-dom";

export default function NotFoundScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <p className="text-6xl mb-6" aria-hidden="true">🗺️</p>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
      <p className="text-gray-500 text-sm mb-8">
        This page doesn't exist or may have moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 rounded-2xl text-white font-medium active:scale-95 transition-transform"
        style={{ backgroundColor: "var(--color-brand)" }}
      >
        Back to Home
      </button>
    </div>
  );
}