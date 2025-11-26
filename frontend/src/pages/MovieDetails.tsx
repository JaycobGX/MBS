// src/pages/MovieDetails.tsx
import { useParams, Link } from "react-router-dom";
import { movies } from "../data/movies";

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[#333333] mb-2">
          Movie not found
        </h1>
        <Link to="/movies" className="text-[#D50032] text-sm">
          ← Back to Movies
        </Link>
      </div>
    );
  }

  const isUpcoming = movie.status === "upcoming";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid gap-8 md:grid-cols-[260px,1fr]">
      {/* Poster */}
      <div className="w-full">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full rounded-lg shadow-md object-cover"
        />
        <div className="mt-4 text-center">
          {!isUpcoming ? (
            <Link
              to={`/booking/${movie.id}`}
              className="inline-block px-5 py-2 bg-[#D50032] text-white rounded font-semibold text-sm hover:bg-[#b4002a]"
            >
              Book Tickets
            </Link>
          ) : (
            <div className="inline-block px-5 py-2 bg-gray-200 text-gray-700 rounded text-sm font-semibold uppercase">
              Advance Tickets
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">{movie.title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {movie.genre} • {movie.durationMins} mins •{" "}
            {movie.category} •{" "}
            {new Date(movie.releaseDate).toLocaleDateString()}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#333333] mb-1">
            Synopsis
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            {movie.synopsis}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-[#333333] mb-1">
              Cast
            </h3>
            <ul className="text-sm text-gray-700 list-disc list-inside">
              {movie.cast.map((actor) => (
                <li key={actor}>{actor}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#333333] mb-1">
              Director
            </h3>
            <p className="text-sm text-gray-700">{movie.director}</p>
          </div>
        </div>

        {!isUpcoming && (
          <div>
            <h3 className="text-sm font-semibold text-[#333333] mb-1">
              Showtimes
            </h3>
            <div className="flex flex-wrap gap-2">
              {movie.showtimes.map((time) => (
                <span
                  key={time}
                  className="px-3 py-1 rounded-full border border-gray-300 text-xs text-gray-700"
                >
                  {time}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2">
          <Link to="/movies" className="text-[#D50032] text-sm">
            ← Back to Movies
          </Link>
        </div>
      </div>
    </div>
  );
}
