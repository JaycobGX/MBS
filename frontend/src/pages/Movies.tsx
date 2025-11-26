// frontend/src/pages/Movies.tsx
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

type Movie = {
  id: number;
  title: string;
  synopsis: string;
  genre: string;
  duration_minutes: number;
  cast: string[];
  rating: number;
  image_url: string;
  status: string; // "current" or "upcoming"
};

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("type") === "upcoming" ? "upcoming" : "now";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/movies");
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const nowShowing = movies.filter((m) => m.status === "current");
  const upcoming = movies.filter((m) => m.status === "upcoming");
  const visibleMovies = tab === "upcoming" ? upcoming : nowShowing;

  function handleTabClick(next: "now" | "upcoming") {
    setSearchParams(next === "now" ? {} : { type: "upcoming" });
  }

  return (
    <main>
      {/* TOP HEADING + TABS */}
      <section
        style={{
          borderBottom: "1px solid #eeeeee",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ paddingTop: 24, paddingBottom: 12 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#333333",
              marginBottom: 8,
            }}
          >
            Browse Movies
          </h1>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 24, fontSize: 15, fontWeight: 500 }}>
            <button
              type="button"
              onClick={() => handleTabClick("now")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: tab === "now" ? "#D50032" : "#666666",
                borderBottom: tab === "now" ? "2px solid #D50032" : "2px solid transparent",
                paddingBottom: 4,
              }}
            >
              Now Playing
            </button>

            <button
              type="button"
              onClick={() => handleTabClick("upcoming")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: tab === "upcoming" ? "#D50032" : "#666666",
                borderBottom:
                  tab === "upcoming" ? "2px solid #D50032" : "2px solid transparent",
                paddingBottom: 4,
              }}
            >
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* GRID OF MOVIES */}
      <section>
        <div style={{ paddingTop: 24, paddingBottom: 40 }}>
          {loading ? (
            <p style={{ fontSize: 14, color: "#777777" }}>Loading movies...</p>
          ) : error ? (
            <p style={{ fontSize: 14, color: "#b91c1c" }}>Error: {error}</p>
          ) : visibleMovies.length === 0 ? (
            <p style={{ fontSize: 14, color: "#777777" }}>No movies to display.</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
              {visibleMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
