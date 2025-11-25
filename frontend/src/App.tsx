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


// Simple placeholders for later auth
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = true; // TODO: real auth later
  return isLoggedIn ? <>{children}</> : <Login />;
};

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const isAdmin = false; // TODO: real role check later
  return isAdmin ? <>{children}</> : <NotFound />;
};  

export default function App() {
  return (
    <>
      <Navbar />

      {/* Global page padding + max width */}
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
