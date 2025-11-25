import { useState } from "react";
import { movies } from "../data/movies";

type Show = {
  id: string;
  movieTitle: string;
  time: string;
  price: number;
  theater: string;
};

export default function AdminDashboard() {
  const [tab, setTab] = useState<"status" | "shows">("status");

  // mock stats per FR17.1
  const ticketsSold = 342;
  const totalRevenue = 5421.5;
  const currentMovies = movies.filter((m) => m.status === "current").map((m) => m.title);

  // mock shows per FR18
  const [shows, setShows] = useState<Show[]>([
    {
      id: "S1",
      movieTitle: "Interstellar Re-Release",
      time: "7:10 PM",
      price: 12.5,
      theater: "Lubbock, TX",
    },
  ]);

  const [newShow, setNewShow] = useState<Show>({
    id: "",
    movieTitle: "",
    time: "",
    price: 10,
    theater: "",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold">Administrator</h1>

      <div className="flex gap-2">
        <button
          onClick={() => setTab("status")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            tab === "status" ? "bg-gray-900 text-white" : "bg-gray-100"
          }`}
        >
          Status Report
        </button>
        <button
          onClick={() => setTab("shows")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            tab === "shows" ? "bg-gray-900 text-white" : "bg-gray-100"
          }`}
        >
          Manage Shows
        </button>
      </div>

      {tab === "status" && (
        <div className="border rounded-xl p-4 space-y-3">
          <h2 className="text-lg font-semibold">Status Report</h2>
          <div>Tickets Sold: {ticketsSold}</div>
          <div>Total Revenue: ${totalRevenue.toFixed(2)}</div>
          <div>
            Currently Playing Movies:
            <ul className="list-disc ml-5">
              {currentMovies.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab === "shows" && (
        <div className="space-y-4">
          <div className="border rounded-xl p-4 space-y-2">
            <h2 className="text-lg font-semibold">Add Show</h2>

            <input
              placeholder="Movie Title"
              className="border rounded px-2 py-1 w-full"
              value={newShow.movieTitle}
              onChange={(e) => setNewShow((s) => ({ ...s, movieTitle: e.target.value }))}
            />
            <input
              placeholder="Show Time"
              className="border rounded px-2 py-1 w-full"
              value={newShow.time}
              onChange={(e) => setNewShow((s) => ({ ...s, time: e.target.value }))}
            />
            <input
              placeholder="Theater"
              className="border rounded px-2 py-1 w-full"
              value={newShow.theater}
              onChange={(e) => setNewShow((s) => ({ ...s, theater: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Price"
              className="border rounded px-2 py-1 w-full"
              value={newShow.price}
              onChange={(e) => setNewShow((s) => ({ ...s, price: Number(e.target.value) }))}
            />

            <button
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg"
              onClick={() => {
                if (!newShow.movieTitle || !newShow.time || !newShow.theater) return;
                setShows((prev) => [
                  ...prev,
                  { ...newShow, id: crypto.randomUUID() },
                ]);
                setNewShow({ id: "", movieTitle: "", time: "", price: 10, theater: "" });
              }}
            >
              Add
            </button>
          </div>

          <div className="border rounded-xl p-4 space-y-2">
            <h2 className="text-lg font-semibold">Current Shows</h2>

            {shows.map((s) => (
              <div key={s.id} className="border rounded-lg p-3 bg-gray-50 space-y-1">
                <div className="font-semibold">{s.movieTitle}</div>
                <div className="text-sm">{s.theater} — {s.time}</div>
                <div className="text-sm">Price: ${s.price.toFixed(2)}</div>

                <div className="flex gap-2 pt-2">
                  <button
                    className="text-sm text-blue-600 font-semibold"
                    onClick={() => {
                      const time = prompt("New time?", s.time) ?? s.time;
                      const priceStr = prompt("New price?", String(s.price));
                      const price = priceStr ? Number(priceStr) : s.price;
                      setShows((prev) =>
                        prev.map((x) => (x.id === s.id ? { ...x, time, price } : x))
                      );
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="text-sm text-red-600 font-semibold"
                    onClick={() => setShows((prev) => prev.filter((x) => x.id !== s.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
