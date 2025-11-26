// src/pages/MovieDetails.tsx
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
  showtimes?: string[]; // Optional, if backend includes showtimes
};

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/movies/${id}`);
        if (!res.ok) throw new Error("Movie not found");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading...</p>;
  if (error || !movie)
    return (
      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 16px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Movie not found</h1>
        <Link to="/movies" style={{ color: "#D50032", textDecoration: "underline", fontSize: "14px" }}>
          ← Back to Movies
        </Link>
      </div>
    );

  const isUpcoming = movie.status === "upcoming";

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px", display: "grid", gap: "32px", gridTemplateColumns: "260px 1fr" }}>
      {/* Poster */}
      <div>
        <img
          src={movie.image_url}
          alt={movie.title}
          style={{ width: "100%", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", objectFit: "cover" }}
        />
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          {!isUpcoming ? (
            <Link
              to={`/booking/${movie.id}`}
              style={{ display: "inline-block", padding: "8px 16px", backgroundColor: "#D50032", color: "#fff", borderRadius: "8px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}
            >
              Book Tickets
            </Link>
          ) : (
            <div style={{ display: "inline-block", padding: "8px 16px", backgroundColor: "#e5e7eb", color: "#4b5563", borderRadius: "8px", fontWeight: 600, fontSize: "14px", textTransform: "uppercase" }}>
              Advance Tickets
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#111827" }}>{movie.title}</h1>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
            {movie.genre} • {movie.duration_minutes} mins • {isUpcoming ? "Upcoming" : "Current"}
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "4px", color: "#111827" }}>Synopsis</h2>
          <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#374151" }}>{movie.synopsis}</p>
        </div>

        <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px", color: "#111827" }}>Cast</h3>
            <ul style={{ fontSize: "14px", color: "#374151", listStyle: "disc inside" }}>
              {movie.cast.map((actor) => (
                <li key={actor}>{actor}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px", color: "#111827" }}>Rating</h3>
            <p style={{ fontSize: "14px", color: "#374151" }}>{movie.rating}/10</p>
          </div>
        </div>

        {!isUpcoming && movie.showtimes && movie.showtimes.length > 0 && (
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px", color: "#111827" }}>Showtimes</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {movie.showtimes.map((time) => (
                <span
                  key={time}
                  style={{ padding: "4px 8px", borderRadius: "999px", border: "1px solid #d1d5db", fontSize: "12px", color: "#374151" }}
                >
                  {new Date(time).toLocaleString()}
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ paddingTop: "8px" }}>
          <Link to="/movies" style={{ color: "#D50032", textDecoration: "underline", fontSize: "14px" }}>
            ← Back to Movies
          </Link>
        </div>
      </div>
    </div>
  );
}