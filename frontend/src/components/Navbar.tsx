import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

export default function Navbar() {
  // Temporary mock state — later will come from context/auth API
  const isLoggedIn = false;
  const isAdmin = false;
  const base = "px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150";
  const active = "bg-gray-200";
  const inactive = "hover:bg-gray-100";

  function NavItem({
    to,
    children,
  }: {
    to: string;
    children: ReactNode;
  }) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <header className="border-b bg-white">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <NavLink
          to="/"
          className="text-xl font-bold tracking-tight select-none"
        >
          MBS
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center gap-3">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/movies">Movies</NavItem>

          {!isLoggedIn ? (
            <>
              <NavItem to="/login">Login</NavItem>
              <NavItem to="/register">Register</NavItem>
            </>
          ) : (
            <NavItem to="/profile">My Account</NavItem>
          )}

          {/* Only show admin dashboard if user is admin */}
          {isAdmin && <NavItem to="/admin">Admin</NavItem>}
        </div>
      </nav>
    </header>
  );
}
