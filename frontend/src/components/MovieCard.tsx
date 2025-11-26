// src/components/MovieCard.tsx
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

export default function MovieCard({ movie }: { movie: Movie }) {
  const isCurrent = movie.status === "current";

  return (
    <div
      style={{
        width: 220,
        backgroundColor: "#ffffff",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* POSTER */}
      <div style={{ position: "relative" }}>
        <img
          src={movie.image_url}
          alt={movie.title}
          loading="lazy"
          style={{ width: "100%", display: "block" }}
        />

        {/* RED BANNER OVER BOTTOM OF POSTER */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#D50032",
            color: "#ffffff",
            textAlign: "center",
            fontWeight: 700,
            fontSize: 12,
            textTransform: "uppercase",
            padding: "6px 0",
          }}
        >
          {isCurrent ? "Now Showing" : "Coming Soon"}
        </div>
      </div>

      {/* TITLE */}
      <div style={{ padding: "10px 12px 6px 12px", textAlign: "center" }}>
        <h3
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 600,
            color: "#333333",
          }}
        >
          {movie.title}
        </h3>
      </div>

      {/* TICKETS BAR */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "9px 12px",
          textAlign: "center",
          fontSize: 14,
          fontWeight: 600,
          color: "#333333",
        }}
      >
        Tickets
      </div>

      {/* ADD TO WATCH LIST */}
      <button
        type="button"
        style={{
          border: "none",
          backgroundColor: "#ffffff",
          padding: "9px 12px 12px 12px",
          fontSize: 13,
          color: "#D50032",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: 16 }}>♥</span>
        <span>Add to Watch List</span>
      </button>
    </div>
  );
}
