import { Link } from "react-router-dom";
import { movies } from "../data/movies";

export default function Home() {
  const current = movies.filter((m) => m.status === "current");
  const upcoming = movies.filter((m) => m.status === "upcoming");

  return (
    <div className="space-y-10">
      <header className="bg-gray-900 text-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold">Movie Booking System</h1>
        <p className="opacity-90 mt-2">
          Browse movies, buy tickets, and get your e-ticket instantly.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/movies?type=current" className="px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold">
            Current Movies
          </Link>
          <Link to="/movies?type=upcoming" className="px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold">
            Upcoming Movies
          </Link>
          <Link to="/movies" className="px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold">
            Search Movies
          </Link>
          <Link to="/profile" className="px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold">
            Profile
          </Link>
        </div>
      </header>

      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Now Playing</h2>
          <Link to="/movies?type=current" className="text-blue-600">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {current.map((m) => (
            <Link key={m.id} to={`/movies/${m.id}`} className="group">
              <img src={m.posterUrl} alt={m.title} className="rounded-xl h-56 w-full object-cover" />
              <div className="mt-2 font-semibold group-hover:underline">{m.title}</div>
              <div className="text-sm text-gray-600">{m.runtimeMins} mins</div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Coming Soon</h2>
          <Link to="/movies?type=upcoming" className="text-blue-600">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {upcoming.map((m) => (
            <Link key={m.id} to={`/movies/${m.id}`} className="group">
              <img src={m.posterUrl} alt={m.title} className="rounded-xl h-56 w-full object-cover opacity-90" />
              <div className="mt-2 font-semibold group-hover:underline">{m.title}</div>
              <div className="text-sm text-gray-600">Upcoming</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
