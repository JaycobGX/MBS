// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Suspense, lazy, type ReactNode } from "react";

// Lazy-loaded pages (code splitting)
const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Booking = lazy(() => import("./pages/Booking"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
      <Navbar />

      {/* Suspense is used here so lazy pages show a fallback while loading */}
      <Suspense fallback={<div className="p-4">Loading…</div>}>
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
      </Suspense>
    </>
  );
}
