// frontend/src/pages/Movies.tsx
import { useSearchParams } from "react-router-dom";
import { movies } from "../data/movies";
import MovieCard from "../components/MovieCard";

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("type") === "upcoming" ? "upcoming" : "now";

  const nowShowing = movies.filter((m) => m.status === "current");
  const upcoming = movies.filter((m) => m.status === "upcoming");
  const visibleMovies = tab === "upcoming" ? upcoming : nowShowing;

  function handleTabClick(next: "now" | "upcoming") {
    setSearchParams(next === "now" ? {} : { type: "upcoming" });
  }

  return (
    <main>
      {/* TOP HEADING + TABS (like “Browse Movies / Now Playing / Coming Soon”) */}
      <section
        style={{
          borderBottom: "1px solid #eeeeee",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          className="container"
          style={{ paddingTop: 24, paddingBottom: 12 }}
        >
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
          <div
            style={{
              display: "flex",
              gap: 24,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            <button
              type="button"
              onClick={() => handleTabClick("now")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: tab === "now" ? "#D50032" : "#666666",
                borderBottom:
                  tab === "now" ? "2px solid #D50032" : "2px solid transparent",
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
                  tab === "upcoming"
                    ? "2px solid #D50032"
                    : "2px solid transparent",
                paddingBottom: 4,
              }}
            >
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* GRID OF MOVIES USING MOVIECARD */}
      <section>
        <div
          className="container"
          style={{ paddingTop: 24, paddingBottom: 40 }}
        >
          {visibleMovies.length === 0 ? (
            <p style={{ fontSize: 14, color: "#777777" }}>
              No movies to display.
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 24, // spacing between cards
              }}
            >
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
