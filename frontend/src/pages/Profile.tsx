import { useState } from "react";

type BookingHistoryItem = {
  id: string;
  movie: string;
  date: string;
  theater: string;
  seats: number;
  status: "past" | "upcoming";
};

export default function Profile() {
  // mock user
  const [user, setUser] = useState({
    name: "Your Name",
    email: "you@example.com",
    address: "123 Main St",
    phone: "555-555-5555",
    password: "********",
  });

  const [editing, setEditing] = useState(false);

  const history: BookingHistoryItem[] = [
    {
      id: "TKT-12345",
      movie: "Interstellar Re-Release",
      date: "2025-11-20 7:10 PM",
      theater: "Lubbock, TX",
      seats: 2,
      status: "past",
    },
    {
      id: "TKT-55555",
      movie: "The Last Voyage",
      date: "2025-11-28 6:30 PM",
      theater: "Amarillo, TX",
      seats: 1,
      status: "upcoming",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Account / Profile</h1>

      {/* Personal info per FR9 */}
      <div className="border rounded-xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <button
            onClick={() => setEditing((e) => !e)}
            className="text-blue-600 font-semibold"
          >
            {editing ? "Done" : "Edit"}
          </button>
        </div>

        {(["name", "email", "address", "phone"] as const).map((field) => (
          <div key={field} className="grid grid-cols-3 gap-3 items-center">
            <label className="capitalize text-gray-600">{field}</label>
            {editing ? (
              <input
                className="border rounded px-2 py-1 col-span-2"
                value={user[field]}
                onChange={(e) =>
                  setUser((u) => ({ ...u, [field]: e.target.value }))
                }
              />
            ) : (
              <div className="col-span-2">{user[field]}</div>
            )}
          </div>
        ))}
      </div>

      {/* Ticket/Order history per FR14 */}
      <div className="border rounded-xl p-4 space-y-3">
        <h2 className="text-lg font-semibold">Ticket / Order History</h2>

        <div className="space-y-2">
          {history
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((h) => (
              <div key={h.id} className="border rounded-lg p-3 bg-gray-50">
                <div className="font-semibold">{h.movie}</div>
                <div className="text-sm text-gray-700">{h.date}</div>
                <div className="text-sm text-gray-700">{h.theater}</div>
                <div className="text-sm text-gray-700">Seats: {h.seats}</div>
                <div className="text-xs text-gray-600 capitalize">
                  {h.status}
                </div>

                <button
                  className="mt-2 text-blue-600 text-sm font-semibold"
                  onClick={() => alert(`Ticket ID: ${h.id}`)}
                >
                  View Ticket
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
