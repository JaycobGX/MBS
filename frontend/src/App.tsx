import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import type { ReactNode } from "react";

// Pages
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

type Role = "user" | "admin";

type User = {
  email: string;
  name: string;
  role: Role;
};

function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("mbs_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = getCurrentUser();
  return user ? <>{children}</> : <Login />;
};

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const user = getCurrentUser();
  const isAdmin = user && user.role === "admin";
  return isAdmin ? <>{children}</> : <NotFound />;
};

export default function App() {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />

          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
