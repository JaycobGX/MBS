// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { movies } from "../data/movies";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const nowShowing = movies.filter((m) => m.status === "current");
  const upcoming = movies.filter((m) => m.status === "upcoming");

  const featured = nowShowing[0];

  return (
    <main>
      {/* TOP HEADING LIKE CINEMARK */}
      <section
        style={{
          borderBottom: "1px solid #eeeeee",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          className="container"
          style={{
            paddingTop: "20px",
            paddingBottom: "10px",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#333333",
            }}
          >
            MBS Raiderville Lubbock and XD
          </h1>

          {/* little sub-nav like “Theatre Info | Featured Movies | Advance Tickets” */}
          <div
            style={{
              marginTop: "12px",
              display: "flex",
              gap: "24px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            <span style={{ color: "#666666", cursor: "pointer" }}>
              Theatre Info
            </span>
            <span
              style={{
                color: "#D50032",
                borderBottom: "2px solid #D50032",
                paddingBottom: "4px",
                cursor: "pointer",
              }}
            >
              Featured Movies
            </span>
            <span style={{ color: "#666666", cursor: "pointer" }}>
              Advance Tickets
            </span>
          </div>
        </div>
      </section>

      {/* FEATURED STRIP (hero-ish, but cleaner) */}
      {featured && (
        <section
          style={{
            backgroundColor: "#f8f8f8",
            borderBottom: "1px solid #eeeeee",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              gap: "24px",
              paddingTop: "20px",
              paddingBottom: "20px",
              alignItems: "center",
            }}
          >
            <img
              src={featured.posterUrl}
              alt={featured.title}
              loading="lazy"
              style={{
                width: "180px",
                borderRadius: "4px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            />

            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "#777777",
                }}
              >
                Now Showing
              </p>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  marginTop: "6px",
                  color: "#333333",
                }}
              >
                {featured.title}
              </h2>
              <p
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  color: "#555555",
                  maxWidth: "640px",
                }}
              >
                {featured.synopsis}
              </p>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "13px",
                  color: "#777777",
                }}
              >
                {featured.genre} • {featured.durationMins} mins
              </p>

              <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                <Link
                  to={`/booking/${featured.id}`}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "4px",
                    backgroundColor: "#D50032",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Book Tickets
                </Link>
                <Link
                  to={`/movies/${featured.id}`}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "4px",
                    border: "1px solid #cccccc",
                    color: "#333333",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    backgroundColor: "#ffffff",
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* NOW SHOWING SECTION */}
      <section>
        <div
          className="container"
          style={{ paddingTop: "24px", paddingBottom: "12px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#333333",
              }}
            >
              Now Showing
            </h2>
            <Link
              to="/movies"
              style={{ fontSize: "14px", color: "#D50032", fontWeight: 500 }}
            >
              View all
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "18px",
            }}
          >
            {nowShowing.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING SECTION */}
      <section style={{ paddingBottom: "40px" }}>
        <div
          className="container"
          style={{ paddingTop: "28px", paddingBottom: "12px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#333333",
              }}
            >
              Upcoming
            </h2>
            <Link
              to="/movies?type=upcoming"
              style={{ fontSize: "14px", color: "#D50032", fontWeight: 500 }}
            >
              View all
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "18px",
            }}
          >
            {upcoming.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
