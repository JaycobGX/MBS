export default function MovieCard({ movie }: { movie: any }) {
  return (
    <div style={{ width: "260px", fontFamily: "inherit" }}>
      <div style={{ position: "relative" }}>
        <img
          src={movie.poster}
          alt={movie.title}
          style={{ width: "100%", borderRadius: "4px" }}
          loading="lazy"
        />

        {/* RED BANNER */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "#D50032",
            color: "white",
            padding: "6px 0",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "13px",
            textTransform: "uppercase",
          }}
        >
          {movie.status === "current" ? "Now Showing" : "Advance Tickets"}
        </div>
      </div>

      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <h3 style={{ fontSize: "16px", marginBottom: "6px", color: "#333" }}>
          {movie.title}
        </h3>

        <div style={{ color: "#D50032", fontSize: "14px", cursor: "pointer" }}>
          ♥ Add to Watch List
        </div>
      </div>
    </div>
  );
}
