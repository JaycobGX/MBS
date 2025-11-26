// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import IntroOverlay from "./components/IntroOverlay";

// Direct imports (no lazy/Suspense)
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

import type { ReactNode } from "react";

type GuardProps = {
  children: ReactNode;
};

// Only logged-in users can see children
const ProtectedRoute = ({ children }: GuardProps) => {
  const raw = localStorage.getItem("mbs_user");
  const user = raw ? JSON.parse(raw) : null;

  if (!user) {
    // Not logged in → show login page instead
    return <Login />;
  }

  return <>{children}</>;
};

// Only admin users can see children
const AdminRoute = ({ children }: GuardProps) => {
  const raw = localStorage.getItem("mbs_user");
  const user = raw ? JSON.parse(raw) : null;

  if (!user || user.role !== "admin") {
    // Not admin → show NotFound (or you could redirect)
    return <NotFound />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <>
      <IntroOverlay />
      <Navbar />

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
    </>
  );
}
