// src/pages/Booking.tsx
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { movies } from "../data/movies";

type PaymentMethod = "credit" | "venmo" | "paypal";

export default function Booking() {
  const { id } = useParams<{ id: string }>();
  const movie = useMemo(() => movies.find((m) => m.id === id), [id]);

  const [theater, setTheater] = useState("");
  const [showtime, setShowtime] = useState("");
  const [seats, setSeats] = useState(1);
  const [payment, setPayment] = useState<PaymentMethod>("credit");
  const [confirmed, setConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  if (!movie) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#333333] mb-2">
          Movie not found
        </h1>
      </div>
    );
  }

  if (movie.status !== "current") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#333333] mb-3">
          Booking Unavailable
        </h1>
        <p className="text-sm text-gray-700">
          This title is an upcoming release. Advance ticketing will be available
          closer to the release date.
        </p>
      </div>
    );
  }

  const canConfirm = theater && showtime && seats >= 1 && seats <= 10;

  function handleConfirm() {
    setConfirmed(true);
    setTicketId(`TKT-${Math.floor(Math.random() * 1000000)}`);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-[#333333]">
          Book Tickets – {movie.title}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {movie.genre} • {movie.durationMins} mins
        </p>
      </div>

      {/* Form */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left column */}
        <div className="space-y-4">
          {/* Showtime */}
          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-1">
              Select Showtime
            </label>
            <div className="flex flex-wrap gap-2">
              {movie.showtimes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setShowtime(t)}
                  className={`px-3 py-2 rounded-full border text-sm ${
                    showtime === t
                      ? "bg-[#D50032] text-white border-[#D50032]"
                      : "bg-white text-gray-800 border-gray-300 hover:border-[#D50032]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Theater */}
          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-1">
              Select Theater
            </label>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
              value={theater}
              onChange={(e) => setTheater(e.target.value)}
            >
              <option value="">Choose a hall…</option>
              {movie.theaters.map((th) => (
                <option key={th} value={th}>
                  {th}
                </option>
              ))}
            </select>
          </div>

          {/* Seats */}
          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-1">
              Number of Seats (max 10)
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-32"
            />
            {seats > 10 && (
              <p className="text-xs text-red-600 mt-1">
                Maximum 10 seats per booking.
              </p>
            )}
          </div>
        </div>

        {/* Right column – Payment */}
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-[#333333] mb-2">
              Payment Method
            </h2>
            <div className="space-y-2">
              {(["credit", "venmo", "paypal"] as PaymentMethod[]).map((p) => (
                <label
                  key={p}
                  className="flex items-center gap-2 text-sm text-gray-800"
                >
                  <input
                    type="radio"
                    checked={payment === p}
                    onChange={() => setPayment(p)}
                  />
                  <span className="capitalize">
                    {p === "credit" ? "Credit / Debit Card" : p}
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              For demo purposes, no real payment is processed. This mimics the
              payment selection only.
            </p>
          </div>
        </div>
      </div>

      {/* Confirm button */}
      <div>
        <button
          type="button"
          disabled={!canConfirm}
          onClick={handleConfirm}
          className={`px-6 py-2 rounded-md text-sm font-semibold ${
            canConfirm
              ? "bg-[#D50032] text-white hover:bg-[#b4002a]"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Confirm Booking
        </button>
      </div>

      {/* Confirmation overlay */}
      {confirmed && ticketId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-3 shadow-lg">
            <h2 className="text-xl font-bold text-[#333333]">
              Booking Confirmed
            </h2>
            <p className="text-sm text-gray-700">
              Your tickets have been reserved. Show this e-ticket at the
              theater.
            </p>
            <div className="text-sm text-gray-800 space-y-1">
              <div>
                <span className="font-semibold">Movie:</span> {movie.title}
              </div>
              <div>
                <span className="font-semibold">Showtime:</span> {showtime}
              </div>
              <div>
                <span className="font-semibold">Theater:</span> {theater}
              </div>
              <div>
                <span className="font-semibold">Seats:</span> {seats}
              </div>
              <div>
                <span className="font-semibold">Ticket ID:</span> {ticketId}
              </div>
            </div>

            <div className="mt-3 border rounded-md p-3 text-center">
              <div className="text-xs text-gray-500">QR / Barcode</div>
              <div className="font-mono tracking-widest text-lg">
                {ticketId}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Print
              </button>
              <button
                onClick={() => setConfirmed(false)}
                className="px-4 py-1.5 text-sm bg-[#D50032] text-white rounded hover:bg-[#b4002a]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
