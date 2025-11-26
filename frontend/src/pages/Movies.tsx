// frontend/src/pages/Movies.tsx
import { useSearchParams } from "react-router-dom";
import { movies } from "../data/movies";
import MovieCard from "../components/MovieCard";

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type") || "now"; // "now" | "upcoming"

  const nowShowing = movies.filter((m) => m.status === "current");
  const upcoming = movies.filter((m) => m.status === "upcoming");

  const visibleMovies = type === "upcoming" ? upcoming : nowShowing;

  function handleTabClick(next: "now" | "upcoming") {
    setSearchParams(next === "now" ? {} : { type: "upcoming" });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#333333]">Movies</h1>

      {/* Tabs: Now Showing / Upcoming */}
      <div className="inline-flex rounded-full border border-gray-300 bg-white overflow-hidden text-sm">
        <button
          onClick={() => handleTabClick("now")}
          className={`px-4 py-2 font-medium ${
            type !== "upcoming"
              ? "bg-[#D50032] text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Now Showing
        </button>
        <button
          onClick={() => handleTabClick("upcoming")}
          className={`px-4 py-2 font-medium border-l border-gray-300 ${
            type === "upcoming"
              ? "bg-[#D50032] text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Upcoming
        </button>
      </div>

      {/* Movie grid using MovieCard */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {visibleMovies.length === 0 && (
        <p className="text-gray-500 text-sm">No movies to display.</p>
      )}
    </div>
  );
}
