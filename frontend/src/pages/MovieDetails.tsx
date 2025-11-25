import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { movies } from "../data/movies";

type Review = {
  id: string;
  user: string;
  text: string;
  stars: number;
};

export default function MovieDetails() {
  const { id } = useParams();
  const movie = useMemo(() => movies.find((m) => m.id === id), [id]);

  // mock reviews
  const [reviews, setReviews] = useState<Review[]>([
    { id: "r1", user: "Alex", text: "Loved it!", stars: 5 },
    { id: "r2", user: "Sam", text: "Really fun watch.", stars: 4 },
  ]);
  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState(5);

  // placeholder: later check ticket-holder status per FR11.1
  const canReview = true;

  if (!movie) return <div>Movie not found.</div>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="rounded-2xl w-full object-cover md:col-span-1"
      />

      <div className="md:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <div className="text-gray-700">{movie.synopsis}</div>

        <div className="text-sm text-gray-600">
          Runtime: {movie.runtimeMins} mins
        </div>

        <div>
          <h3 className="font-semibold">Cast</h3>
          <ul className="list-disc ml-5 text-gray-700">
            {movie.cast.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        {movie.status === "current" ? (
          <Link
            to={`/booking/${movie.id}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold"
          >
            Buy Tickets
          </Link>
        ) : (
          <button
            disabled
            className="inline-block px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold cursor-not-allowed"
          >
            Coming Soon (no advance booking)
          </button>
        )}

        {/* Reviews per FR10/FR11 */}
        <section className="pt-6 border-t space-y-3">
          <h2 className="text-xl font-bold">Reviews</h2>

          <div className="space-y-2">
            {reviews.map((r) => (
              <div key={r.id} className="border rounded-lg p-3 bg-gray-50">
                <div className="font-semibold">{r.user}</div>
                <div className="text-yellow-600 text-sm">{"★".repeat(r.stars)}</div>
                <div>{r.text}</div>
              </div>
            ))}
          </div>

          {canReview && (
            <div className="border rounded-lg p-3 space-y-2">
              <div className="font-semibold">Leave a review</div>

              <select
                value={reviewStars}
                onChange={(e) => setReviewStars(Number(e.target.value))}
                className="border rounded px-2 py-1"
              >
                {[5,4,3,2,1].map(s => (
                  <option key={s} value={s}>{s} stars</option>
                ))}
              </select>

              <textarea
                className="border rounded-lg w-full p-2"
                rows={3}
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />

              <button
                onClick={() => {
                  if (!reviewText.trim()) return;
                  setReviews((prev) => [
                    ...prev,
                    {
                      id: crypto.randomUUID(),
                      user: "You",
                      text: reviewText,
                      stars: reviewStars,
                    },
                  ]);
                  setReviewText("");
                  setReviewStars(5);
                }}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg"
              >
                Submit
              </button>

              <p className="text-xs text-gray-500">
                (Later we’ll enforce “ticket-holders only” per FR11.1)
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
