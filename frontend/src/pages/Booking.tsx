import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { movies } from "../data/movies";

type PaymentMethod = "credit" | "venmo" | "paypal";

export default function Booking() {
  const { id } = useParams();
  const movie = useMemo(() => movies.find((m) => m.id === id), [id]);

  const [theater, setTheater] = useState("");
  const [showtime, setShowtime] = useState("");
  const [seats, setSeats] = useState(1);

  const [payment, setPayment] = useState<PaymentMethod>("credit");
  const [confirmed, setConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  if (!movie) return <div>Movie not found.</div>;
  if (movie.status !== "current")
    return <div>This movie is upcoming and cannot be booked yet.</div>;

  const canConfirm = theater && showtime && seats >= 1 && seats <= 10;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Book Tickets</h1>
      <div className="text-lg font-semibold">{movie.title}</div>

      {/* Showtime */}
      <div className="space-y-2">
        <label className="font-semibold">Select Showtime</label>
        <div className="flex flex-wrap gap-2">
          {movie.showtimes.map((t) => (
            <button
              key={t}
              onClick={() => setShowtime(t)}
              className={`px-3 py-2 rounded-lg border ${
                showtime === t ? "bg-gray-900 text-white" : "bg-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Theater */}
      <div className="space-y-2">
        <label className="font-semibold">Select Theater</label>
        <select
          className="border rounded-lg px-3 py-2 w-full"
          value={theater}
          onChange={(e) => setTheater(e.target.value)}
        >
          <option value="">Choose location...</option>
          {movie.theaters.map((th) => (
            <option key={th} value={th}>
              {th}
            </option>
          ))}
        </select>
      </div>

      {/* Seats */}
      <div className="space-y-2">
        <label className="font-semibold">Number of Seats (max 10)</label>
        <input
          type="number"
          min={1}
          max={10}
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="border rounded-lg px-3 py-2 w-32"
        />
        {seats > 10 && (
          <p className="text-red-600 text-sm">Maximum 10 seats per user.</p>
        )}
      </div>

      {/* Payment per FR13.1 */}
      <div className="space-y-2">
        <label className="font-semibold">Payment Method</label>
        <div className="flex gap-3">
          {(["credit", "venmo", "paypal"] as PaymentMethod[]).map((p) => (
            <label key={p} className="flex items-center gap-2">
              <input
                type="radio"
                checked={payment === p}
                onChange={() => setPayment(p)}
              />
              <span className="capitalize">{p}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        disabled={!canConfirm}
        onClick={() => {
          setConfirmed(true);
          setTicketId(`TKT-${Math.floor(Math.random() * 1000000)}`);
        }}
        className={`w-full px-4 py-3 rounded-lg font-semibold ${
          canConfirm ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
        }`}
      >
        Confirm Booking
      </button>

      {/* Confirmation popup per FR12.3 */}
      {confirmed && ticketId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-3">
            <h2 className="text-xl font-bold">Booking Confirmed!</h2>
            <div>Movie: {movie.title}</div>
            <div>Showtime: {showtime}</div>
            <div>Theater: {theater}</div>
            <div>Seats: {seats}</div>
            <div className="font-semibold">Ticket ID: {ticketId}</div>

            <button
              onClick={() => setConfirmed(false)}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg"
            >
              View E-Ticket
            </button>
          </div>
        </div>
      )}

      {/* Simple e-ticket preview per FR14.3/FR14.4 */}
      {ticketId && !confirmed && (
        <div className="border rounded-xl p-4 bg-gray-50 space-y-2">
          <h3 className="font-bold">Your E-Ticket</h3>
          <div>Ticket ID: {ticketId}</div>
          <div>{movie.title} — {showtime}</div>
          <div>{theater}</div>
          <div>Seats: {seats}</div>

          <div className="mt-2 p-3 bg-white border rounded text-center">
            {/* Placeholder for QR/Barcode */}
            <div className="text-xs text-gray-600">QR/Barcode placeholder</div>
            <div className="font-mono tracking-widest text-lg">{ticketId}</div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm"
          >
            Print Ticket
          </button>
        </div>
      )}
    </div>
  );
}
