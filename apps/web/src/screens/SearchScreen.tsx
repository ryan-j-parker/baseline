import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { buildSearchIndex } from "@baseline/core";

const index = buildSearchIndex();

export default function SearchScreen() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return index.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface)" }}>

      {/* Header */}
      <div className="px-5 pt-10 pb-4" style={{ backgroundColor: "var(--color-brand)" }}>
        <button onClick={() => navigate("/")} className="text-blue-200 text-sm mb-2 active:opacity-70">
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">Search</h1>
      </div>

      {/* Search input */}
      <div className="px-4 py-3 sticky top-0 bg-white shadow-sm z-10">
        <input
          type="search"
          placeholder='Try "trash bags", "dentist", "typhoon"...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2"
          style={{ "--tw-ring-color": "var(--color-brand)" } as React.CSSProperties}
        />
      </div>

      {/* Results */}
      <div className="px-4 py-3 flex flex-col gap-2 pb-12">
        {query.trim() === "" && (
          <div className="text-center text-gray-400 text-sm py-12">
            <p className="text-3xl mb-3">🔍</p>
            <p>Search across all BaseLine content</p>
            <p className="mt-1 text-xs">Trash, utilities, medical, emergency and more</p>
          </div>
        )}

        {query.trim() !== "" && results.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-12">
            <p className="text-3xl mb-3">🤷</p>
            <p>No results for "<strong>{query}</strong>"</p>
            <p className="mt-1 text-xs">Try a different word or browse from the home screen</p>
          </div>
        )}

        {results.map((result) => (
          <button
            key={result.id}
            onClick={() => navigate(result.route)}
            className="w-full bg-white rounded-2xl px-4 py-4 shadow-sm text-left active:scale-95 transition-transform"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">{result.title}</p>
                <p className="text-gray-500 text-xs mt-1">{result.summary}</p>
              </div>
              <span
                className="text-xs px-2 py-1 rounded-full whitespace-nowrap shrink-0 mt-0.5"
                style={{ backgroundColor: "#E8F0FB", color: "var(--color-brand)" }}
              >
                {result.category}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}