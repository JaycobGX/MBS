import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { movies } from "../data/movies";

export default function Movies() {
  const [params, setParams] = useSearchParams();
  const initialType = (params.get("type") as "current" | "upcoming" | null) ?? "current";

  const [type, setType] = useState<"current" | "upcoming">(initialType);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return movies
      .filter((m) => m.status === type)
      .filter((m) => m.title.toLowerCase().includes(query.toLowerCase()));
  }, [type, query]);

  const switchType = (t: "current" | "upcoming") => {
    setType(t);
    setParams({ type: t });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
        <h1 className="text-2xl font-bold">Movies</h1>

        <input
          className="border rounded-lg px-3 py-2 w-full md:w-80"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => switchType("current")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            type === "current" ? "bg-gray-900 text-white" : "bg-gray-100"
          }`}
        >
          Current
        </button>
        <button
          onClick={() => switchType("upcoming")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            type === "upcoming" ? "bg-gray-900 text-white" : "bg-gray-100"
          }`}
        >
          Upcoming
        </button>
      </div>

      {filtered.length === 0 && (
        <div className="text-gray-600">No movies match your search.</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((m) => (
          <div key={m.id} className="border rounded-xl overflow-hidden bg-white">
            <Link to={`/movies/${m.id}`}>
              <img src={m.posterUrl} alt={m.title} className="h-56 w-full object-cover" />
            </Link>
            <div className="p-3 space-y-1">
              <Link to={`/movies/${m.id}`} className="font-semibold hover:underline">
                {m.title}
              </Link>
              <div className="text-sm text-gray-600">{m.runtimeMins} mins</div>

              {m.status === "current" ? (
                <Link
                  to={`/booking/${m.id}`}
                  className="inline-block mt-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm"
                >
                  Buy Tickets
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-block mt-2 px-3 py-1.5 bg-gray-300 text-gray-700 rounded-lg text-sm cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
